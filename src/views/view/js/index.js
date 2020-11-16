import { get_img, ajax } from "@/serve";
import { window_go_top } from "@/utils";

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
            // 是否正在重载页面
            refreshing: false,
            // 是否加载完全部图片
            finished: false,

            // 弹出层
            popup: {
                menu: false,
            }
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

            // 无数据 退出
            if (!list.length) return false;

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
                this.refreshing = false;
                // 是否加载完全部
                this.finished = this.page === this.imgPathList.length - 1;
                // 是否完成页面初始化加载,未完成则再次加载图片
                page < initPage && this.load_img();
            });
        },

        refresh_page() {
            // 重置图片数据
            this.imgFileList.length = 0;
            this.page = -1;

            // 开始加载图片
            this.load_img();
        },

        /**
         * 重载页面
         */
        reload_page() {
            // 重置图片数据
            this.imgFileList.length = 0;
            this.page = -1;

            // 重置滚动条
            window_go_top();

            // 获取漫画名与章节
            const manga = this.manga;
            const chater = this.chater;

            ajax.post("php/manga.php", {manga: manga + "/" + chater})
                .then(r => {

                    // 获取数据
                    const data = r.data;

                    // 排除非图片数据
                    const arr = data.map(i => {
                        if (i.match(/\d+/)) return i;
                    })

                    // 为图片排序
                    this.imgPathList = arr.sort((a, b) => {
                        // 获取开头的数字,进行排序
                        const valueA = a.match(/\d+/)[0];
                        const valueB = b.match(/\d+/)[0];
                        return valueA - valueB;
                    });

                    // 开始加载图片
                    this.load_img();

                });
        },
        /**
         * 上一页
         * */
        before() {

            if (this.index == 0) {
                this.$msg('已经到了第一章');
                return false;
            }

            // 更新缓存
            this.updata_cache(--this.index);

            /**
             * 刷新页面
             * 自定义重载方法没有重置滚动条,导致vant list不断触发触底事件
             * 因此暂时采用刷新页面的方式解决
             */
            this.reload_page();

        },
        /**
         * 下一页
         * */
        next() {
            if (this.index == this.menu.length - 1) {
                this.$msg('已经到了最后一章');
                return false;
            }

            // 更新缓存
            this.updata_cache(++this.index);

            // 刷新页面
            this.reload_page();

        },
        /**
         * 选择章节
         * @param index
         */
        change_chater(index) {
            // 更新缓存数据
            this.updata_cache(index)

            // 重载页面
            this.reload_page();

            this.open_popup('menu', false);
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
                value = localStorage.getItem(name);
                if (name === 'menu') {
                    value = value.split(',')
                }
            }

            return value;
        },

        /**
         * 更新 漫画名 章节 章节坐标
         */
        updata_cache(index) {
            // 章节列表
            const menu = this.menu;
            this.index = index;

            // 设置章节索引
            localStorage.setItem('index', index);

            // 设置章节名称
            const chater = this.chater = menu[index];
            localStorage.setItem('chater', chater);
        },

        /**
         * 弹出层开关操作
         * @param name
         * @param bool
         */
        open_popup(name, bool = true) {
            this.popup[name] = bool;
        },
    },
    created() {

        const manga = this.manga = this.get_manga_value('manga');
        const chater = this.chater = this.get_manga_value('chater');
        const menu = this.menu = this.get_manga_value('menu');
        manga, chater, menu

        const index = this.index = menu.indexOf(chater);
        localStorage.setItem('index', index)

        // 加载页面
        this.reload_page();
    }
};