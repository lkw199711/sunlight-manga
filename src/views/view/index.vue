<template>
    <div class="view">
        <van-list
                v-model="loading"
                :finished="finished"
                @load="load_img"
                :immediate-check="false"
        >
            <img v-for="(k, i) in imgFileList" :src="k" :key="i" alt="接收图片"/>
        </van-list>

        <div class="btns">
            <button class="before" @click="before">上一章</button>
            <button class="next" @click="next">下一章</button>
        </div>
    </div>
</template>

<script>
    import { get_img, ajax } from "@/serve";

    export default {
        name: "index",
        data() {
            return {
                // 漫画名
                manga: '',
                // 章节名
                chater: '',
                // 章节列表
                menu: [],
                // 章节的坐标索引
                index: 0,

                // 图片文件列表
                imgFileList: [],
                // 图片路径列表
                imgPathList: [],
                // 当前图片页码
                page: -1,
                // 初始加载页码数量
                initPage: 3,
                // 是否正在加载图片
                loading: false,
                // 是否加载完全部图片
                finished: false,
            };
        },
        methods: {
            /**
             * 加载图片
             */
            load_img() {
                const manga = this.manga;
                const chater = this.chater;
                const list = this.imgPathList;
                const initPage = this.initPage - 1;

                // 页码递增
                const page = ++this.page;

                // 使用axios请求上传接口
                get_img({
                    params: {file: `${manga}/${chater}/${list[page]}`}
                }).then(res => {
                    // 获取图片数据,转变为blob链接
                    const blob = URL.createObjectURL(res.data);
                    // 加入数组
                    this.imgFileList.push(blob);
                    // 加载结束,更新状态
                    this.loading = false;
                    // 是否加载完全部
                    this.finished = this.page === this.imgPathList.length - 1;
                    // 是否完成页面初始化加载,未完成则再次加载图片
                    page < initPage && this.load_img();
                });
            },

            /**
             * 重载页面
             */
            reload_page() {
                // 重置图片数据
                this.imgFileList.length = 0;

                // 获取漫画名与章节
                const manga = this.manga;
                const chater = this.chater;

                ajax.post("php/manga.php", {manga: manga + "/" + chater})
                    .then(r => {
                        const data = r.data;
                        this.length = data.length;

                        arr = data.sort((a, b) => {
                            const valueA = a.split('.')[0];
                            const valueB = b.split('.')[0];
                            return valueA - valueB;
                        });

                        this.imgPathList = arr;

                        this.load_img();
                    });
            },
            /**
             * 上一页
             * */
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
            /**
             * 下一页
             * */
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
