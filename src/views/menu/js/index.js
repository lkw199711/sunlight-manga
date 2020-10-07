import ajax from "../../../api/serve/ajax";

export default {
    // 数据
    data() {
        return {
            arr: []
        };
    },
    // 传参
    proxy: [],
    // 组件
    component: {},
    // 方法
    methods: {
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
        go_view(chater, index) {
            const manga = this.manga;

            this.$router.push({
                path: "/view",
                name: "view",
                params: {manga, chater, menu: this.arr, index}
            });
        }
    },
    // 生命周期
    created() {
        const manga = this.manga = this.get_manga_value('manga');

        ajax.post("php/manga.php", {manga}).then(r => {
            const data = r.data;

            data.sort((a, b) => {
                const valueA = a.match(/\d+(?=\b)/);
                const valueB = b.match(/\d+(?=\b)/);

                return valueA - valueB;
            })

            this.arr.push(...data);
        });
    }
};
