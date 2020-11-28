<template>
    <div class="index">
        <!--导航栏-->
        <van-nav-bar v-if="!reading" :title="$mark.title" left-text="返回" @click-left="$router.back()" left-arrow
                     fixed :placeholder="placeholder"/>
        <!--主路由-->
        <router-view class="main"/>
    </div>
</template>

<script>
    export default {
        // 头文件
        head() {
            return {
                htmlAttrs: {lang: 'sv'}
            }
        },
        // 数据
        data() {
            return {
                reading: false,
                placeholder: true,
            }
        },
        // 组建名
        name: "index",
        // 方法
        methods: {},
        // 计算
        computed: {
            /**
             * 获取reading状态
             * 判断用户是否在阅读状态
             * 根据状态决定是否显示菜单
             * @returns {boolean}
             */
            get_reading() {
                // 在浏览页时 触发触控事件
                return this.$route.name === 'view' && this.$store.state.reading;
            },
        },
        // 监听
        watch: {
            /**
             * 监听vuex返回的阅读状态值
             */
            get_reading: {
                handler(val) {
                    this.reading = val;
                }
            },
            get_placeholder_state() {
                this.placeholder = this.$route.name !== 'view';
            }
        },
        // 生命周期
        created() {
        }
    }
</script>
<style scoped type="text/less" lang="less">
    /*@import "~@/style/document";*/
</style>