<template>
    <div class="list">
        <p class="item" v-for="(k, i) in arr" :key="i" @click.stop="go_menu(k)">{{ k }}</p>
    </div>
</template>

<script>
    import { ajax } from "@/serve";

    export default {
        name: "index",
        data() {
            return {
                arr: []
            };
        },
        methods: {
            go_menu(name) {
                this.$router.push({
                    path: "/menu",
                    name: "menu",
                    params: {manga: name}
                });
            }
        },
        created() {
            ajax.post("php/manga.php").then(res => {
                const data = res.data;
                this.arr.push(...data);
            });
        }
    };
</script>

<style scoped lang="less">
    @import '~@/style/menu-item';

    .list {
        display: flex;
        flex-wrap: wrap;
    }
</style>
