<template>
    <div class="profile" v-if="user">
        <div class="item">
            <span class="label">user:</span>
            <span class="value">{{ user.Username }}{{ user.Role ? ' (' + user.Role + ')' : '' }}</span>
        </div>
        <div class="item">
            <span class="label">token:</span>
            <span class="value">{{ user.Token }}</span>
        </div>
        <div class="item">
            <Button type="default" class="logout" @click="logout">登出</Button>
        </div>
    </div>
</template>

<script>
    import api from "../util/api";

    export default {
        data() {
            return {
                user: null
            }
        },

        mounted() {
            this.user = window.user
        },

        methods: {
            logout() {
                api.post("/logout").finally(() => {
                    if (window.logout_callback)
                        window.logout_callback();
                })
            }
        }
    }
</script>

<style scoped>
    .profile {
        font-size: 1.2rem;
        padding: 2rem 1rem;
        width: 95%;
        margin: 0 auto;
    }
    .profile .label {
        width: 3rem;
        display: inline-block;
        margin-right: .5rem;
    }
    .profile .logout {
        margin-top: 1rem;
    }
</style>