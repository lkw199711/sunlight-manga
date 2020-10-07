<template>
    <div class="view">
        <img v-for="(k, i) in arr" :src="k" :key="i" alt="接收图片"/>
        <div class="btns">
            <button class="before" @click="before">上一章</button>
            <button class="next" @click="next">下一章</button>
        </div>
    </div>
</template>

<script>
    import ajax from "@/api/serve/ajax";
    import { get_img } from "@/api/serve/index";

    export default {
        name: "index",
        data() {
            return {
                manga: '',
                chater: '',
                src: "111",
                fileArr: [],
                arr: [],
                menu: [],
                index: 0,
                length: 0,
                flag: false
            };
        },
        methods: {
            async get_file(manga, chater, index) {
                let blob;
                // 使用axios请求上传接口
                await get_img({
                    params: {file: `${manga}/${chater}/${index}`}
                }).then(res => {
                    blob = res.data;
                    blob = URL.createObjectURL(blob);
                });

                return blob;
            },
            async get_chater_length(manga, chater) {
                let arr
                await ajax
                    .post("php/manga.php", {manga: manga + "/" + chater})
                    .then(r => {
                        const data = r.data;
                        this.length = data.length;

                        arr = data.sort((a, b) => {
                            const valueA = a.split('.')[0];
                            const valueB = b.split('.')[0];
                            return valueA - valueB;
                        });

                        this.fileArr = arr;
                    });
                return arr;
            },
            before() {
                if (this.index == 0) {
                    alert('已经到了第一章');
                    return false;
                }

                const manga = this.manga;
                const menu = this.menu;

                this.index--;
                localStorage.setItem('index', this.index);

                const chater = menu[this.index];

                this.reload_page(manga, chater);

            },

            next() {
                if (this.index == this.menu.length) {
                    alert('已经到了最后一章');
                    return false;
                }

                const manga = this.manga;
                const menu = this.menu;

                this.index++;
                localStorage.setItem('index', this.index);

                const chater = menu[this.index];

                this.reload_page(manga, chater);

            },

            reload_page(manga, chater) {
                this.arr.length = 0;

                this.get_chater_length(manga, chater).then(arr => {
                    for (let i = 0, l = arr.length; i < l; i++) {
                        this.get_file(manga, chater, arr[i]).then(blob => {
                            this.arr[i] = blob;
                        });
                    }
                })
            },
            /**
             * 获取名称与章节
             * 通过缓存的方式记录现在的章节与漫画名称
             * 有传参则使用传参值，没有则调取缓存
             * @param name
             */
            get_manga_value(name) {
                let value = this.$route.params[name];

                //读取写入缓存
                if (value) {
                    localStorage.setItem(name, value)
                } else {
                    value = localStorage.getItem(name)
                }

                return value;
            },
        },
        created() {
            const manga = this.manga = this.get_manga_value('manga');
            const chater = this.chater = this.get_manga_value('chater');
            const menu = this.menu = this.get_manga_value('menu');
            const index = this.index = this.get_manga_value('index');
            menu, index


            this.reload_page(manga, chater);
        }
    };
</script>

<style scoped type="text/less" lang="less">
    .view {
        img {
            display: block;
            margin: 0 auto;
            max-width: 100vw;
        }

        .btns {
            margin: 20px auto;
            display: flex;
            justify-content: space-around;
        }

        button {
            width: 100px;
            line-height: 2;
            color: #ffffff;
            border: 0;
        }

        .before {
            background-color: #ffc53d;
        }

        .next {
            background-color: #bae637;
        }
    }
</style>
