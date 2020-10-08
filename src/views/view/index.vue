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

<script src="./js/index.js"></script>

<style scoped type="text/less" lang="less" src="./style/index.less"></style>
