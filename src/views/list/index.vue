<template>
    <div class="list">
        <p v-for="(k, i) in arr" :key="i" @click.stop="go_menu(k)">{{ k }}</p>
    </div>
</template>

<script>
    import ajax from "@/api/serve/ajax";

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

<style scoped type="text/less" lang="less">
    .list {
        display: flex;
        flex-wrap: wrap;

        p {
            margin: 10px 10px;
            padding: 10px;
            width: 300px;
            border: 1px solid #2c3e50;
        }
    }
</style>
