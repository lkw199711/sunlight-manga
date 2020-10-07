import { ajax } from "@/serve";

export default {
    // 数据
    data() {
        return {
            text: ''
        }
    },
    // 传参
    proxy: [],
    // 组件
    component: {},
    // 方法
    methods: {},
    // 生命周期
    created() {
        ajax.post('php/check-key-word.php').then(r=>{
            const data=r.data;
            console.log(data);
        })
    },
}