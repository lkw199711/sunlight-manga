import crypto from 'crypto-js'

export default {
    // 数据
    data() {
        return {
            key: 'fd946a640a65eb1d',
            text0: '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',
            text1: '',
            t:'QDgyKVjO8wSpFlZzhxZ6S3NJd+ol++Qm30Sp8Y4H6lGMH70IY4vnQG9WvX'
        }
    },
    // 传参
    proxy: [],
    // 组件
    component: {},
    // 方法
    methods: {
        encrypt(word) {
            var key = crypto.enc.Utf8.parse(this.key);
            var srcs = crypto.enc.Utf8.parse(word);
            var encrypted = crypto.AES.encrypt(srcs, key, {
                mode: crypto.mode.ECB,
                padding: crypto.pad.Pkcs7
            });
            return encrypted.toString();
        },
        decrypt(word) {
            // word = crypto.enc.Utf8.parse(word);
            var key = crypto.enc.Utf8.parse(this.key);
            var decrypt = crypto.AES.decrypt(word, this.key, {
                mode: crypto.mode.ECB,
                padding: crypto.pad.Pkcs7
            });
            // return decrypt;
            return crypto.enc.Utf8.stringify(decrypt).toString();
        },
        en() {
            this.text1 = this.decrypt(this.t);
            console.log(this.text1);
        },
    },
    // 生命周期
    created() {
        //init
    },
}