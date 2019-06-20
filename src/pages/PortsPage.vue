<template>
    <div v-if="data">
        <Table stripe :columns="columns" :data="data"></Table>
    </div>
</template>

<script>
    import api from "../util/api";

    export default {
        data() {
            return {
                columns: [
                    {
                        title: "port",
                        key: "Port"
                    },
                    {
                        title: 'user_id',
                        key: 'UserId'
                    },
                    {
                        title: 'username',
                        key: 'Username'
                    }
                ],
                data: null
            }
        },

        created() {
            api.post("/ports/list").then(data => {
                this.data = data.ports
            }).catch(err => {
                this.$Notice.error({
                    title: '错误',
                    desc: err || '获取端口信息失败'
                })
            })
        }
    }
</script>