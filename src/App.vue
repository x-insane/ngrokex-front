<template>
    <div>
        <div v-if="user">
            <Menu mode="horizontal" theme="light" :active-name="$route.path" @on-select="nav_to">
                <MenuItem name="/profile">
                    <Icon type="ios-people" />
                    个人信息
                </MenuItem>
                <MenuItem name="/user" v-if="user.Role === 'admin'">
                    <Icon type="ios-people" />
                    用户管理
                </MenuItem>
                <MenuItem name="/port">
                    <Icon type="ios-paper" />
                    端口管理
                </MenuItem>
                <MenuItem name="/sub_domain">
                    <Icon type="ios-stats" />
                    子域名管理
                </MenuItem>
            </Menu>
            <router-view></router-view>
        </div>
        <Modal
                footer-hide
                :closable="false"
                :mask-closable="false"
                v-model="login_show"
                title="登陆">
            <Form>
                <FormItem prop="user">
                    <Input type="text" v-model="login_form.username" placeholder="Username">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="login_form.password" placeholder="Password">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="login">登陆</Button>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
    import api from "./util/api";
    import sha1 from 'js-sha1';

    export default {
        data() {
            return {
                user: null,
                login_show: false,
                login_form: {
                    username: '',
                    password: ''
                }
            }
        },

        created() {
            window.logout_callback = () => {
                this.user = null;
                window.user = null;
                this.login_show = true;
                this.login_form = {
                    username: '',
                    password: ''
                }
            };
            this.get_user();
        },

        methods: {
            get_user() {
                return api.post("/user/info").then(data => {
                    this.user = data.user;
                    window.user = data.user;
                    this.login_show = false;
                }).catch(() => {
                    this.login_show = true;
                    this.login_form = {
                        username: '',
                        password: ''
                    }
                })
            },
            nav_to(page) {
                this.$router.push(page);
            },
            login() {
                api.post("/login", {
                    username: this.login_form.username,
                    password: sha1(this.login_form.password)
                }).then(() => {
                    this.get_user()
                }).catch(err => {
                    this.$Notice.error({
                        title: '错误',
                        desc: err || '登陆失败'
                    })
                })
            }
        }
    }
</script>

<style>
    .ivu-menu {
        overflow: auto;
    }
</style>