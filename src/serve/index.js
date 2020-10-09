import Axios from "axios";
import Qs from "qs";
import md5 from "js-md5";

// 网络路径
const network = 'http://manga.ll2.ink';
// 本地路径
const localhost = 'http://localhost/';
// 最后决定使用的路径
const proxyUrl = network;
// 接口路径的设置
const url = process.env.NODE_ENV === 'development' ? '/cms' + "/" : '/';

/**
 * 创建默认接口请求设置
 * 传参接收使用json
 * 默认传参 userid 时间戳 密钥
 * @type {AxiosInstance}
 */
const ajax = Axios.create({
    baseURL: url,
    timeout: 5 * 1000,
    method: "post",
    params: {},
    headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    transformRequest: [
        data => {
            // 获取时间戳
            const timestamp = new Date().getTime();
            // 初始化传参
            data = data || {};
            // 加入时间戳与密钥
            data = Object.assign(data, {timestamp, keyword: get_key_word(timestamp)});
            // 返回json
            return Qs.stringify(data);
        },
    ]
});

/**
 * 文件 图片请求
 * @type {AxiosInstance}
 */
const get_img = Axios.create({
    baseURL: url + "php/get-img-file.php",
    timeout: 5 * 1000,
    method: "post",
    responseType: "blob", // 设置接收格式为blob格式
    params: {},
    headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    transformRequest: [
        data => {
            // 获取时间戳
            const timestamp = new Date().getTime();
            // 初始化传参
            data = data || {};
            // 加入时间戳与密钥
            data = Object.assign(data, {timestamp, keyword: get_key_word(timestamp)});
            // 返回json
            return Qs.stringify(data);
        },
    ]
});

/**
 * 生成密钥
 * 时间戳 + 密文,经过md5加密后形成
 * @param time 时间戳 以毫秒为单位
 * @returns {*}
 */
export default function get_key_word(time) {
    // 密钥文本使用数组拆分
    const keyArr = ['s', 'u', 'n', 'l', 'i', 'g', 'h', 't'];
    const tailArr = ['-', 'm', 'a', 'n', 'g', 'a'];

    // 合并密钥文本与时间戳,使用md5加密
    const keyWord = md5(time + keyArr.join('') + tailArr.join(''));

    // 返回密钥
    return keyWord;
}

export { ajax, get_img, proxyUrl };
