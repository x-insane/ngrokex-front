<template>
    <div v-if="data">
        <Table stripe :columns="columns" :data="data"></Table>
        <Modal
                v-model="port_modal.show"
                :title="'授权端口给用户 ' + port_modal.user"
                :loading="true"
                @on-ok="submit_port">
            <Form :label-width="80">
                <FormItem label="端口">
                    <InputNumber v-model="port_modal.port" :step="1" placeholder="端口号" clearable style="width: 300px" />
                </FormItem>
            </Form>
        </Modal>
        <Modal
                v-model="sub_domain_modal.show"
                :title="'授权子域名给用户 ' + sub_domain_modal.user"
                :loading="true"
                @on-ok="submit_sub_domain">
            <Form :label-width="80">
                <FormItem label="子域名">
                    <Input v-model="sub_domain_modal.sub_domain" placeholder="子域名" clearable style="width: 300px" />
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
    import api from "../util/api";

    export default {
        data() {
            return {
                port_modal: {
                    show: false,
                    id: 0,
                    user: '',
                    port: 10000
                },
                sub_domain_modal: {
                    show: false,
                    id: 0,
                    user: '',
                    sub_domain: ''
                },
                columns: [
                    {
                        title: "id",
                        key: "UserId"
                    },
                    {
                        title: 'username',
                        key: 'Username'
                    },
                    {
                        title: "role",
                        key: "Role"
                    },
                    {
                        title: '操作',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    on: {
                                        click: () => {
                                            this.sub_domain_modal = {
                                                show: true,
                                                id: params.row.UserId,
                                                user: params.row.Username,
                                                sub_domain: ''
                                            }
                                        }
                                    }
                                }, '授权子域名'),
                                h('Button', {
                                    on: {
                                        click: () => {
                                            this.port_modal = {
                                                show: true,
                                                id: params.row.UserId,
                                                user: params.row.Username,
                                                port: 10000
                                            }
                                        }
                                    }
                                }, '授权端口')
                            ])
                        }
                    }
                ],
                data: null
            }
        },

        created() {
            this.refresh()
        },

        methods: {
            refresh() {
                api.post("/users/list").then(data => {
                    this.data = data.users
                }).catch(e => {
                    // eslint-disable-next-line no-console
                    console.log(e)
                })
            },

            submit_port() {
                api.post("/ports/auth", {
                    user_id: this.port_modal.id,
                    port: Number.parseInt(this.port_modal.port)
                }).then(() => {
                    this.$Notice.success({
                        title: '成功',
                        desc: '授权成功'
                    })
                }).catch(err => {
                    this.$Notice.error({
                        title: '错误',
                        desc: err || '授权失败'
                    })
                }).finally(() => {
                    this.port_modal.show = false
                })
            },

            submit_sub_domain() {
                api.post("/sub_domains/auth", {
                    user_id: this.sub_domain_modal.id,
                    sub_domain: this.sub_domain_modal.sub_domain
                }).then(() => {
                    this.$Notice.success({
                        title: '成功',
                        desc: '授权成功'
                    })
                }).catch(err => {
                    this.$Notice.error({
                        title: '错误',
                        desc: err || '授权失败'
                    })
                }).finally(() => {
                    this.sub_domain_modal = {
                        show: false
                    }
                })
            }
        }
    }
</script>