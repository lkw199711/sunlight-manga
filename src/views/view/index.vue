<template>
    <div class="view">

        <!--目录列表-->
        <van-popup v-model="popup.menu" position="left">
            <van-sidebar v-model="index" :style="{width:'46vw'}" @change="change_chater">
                <van-sidebar-item v-for="(k,i) in menu" :title="k" :key="i"/>
            </van-sidebar>
        </van-popup>
        <!--列表下拉刷新-->
        <van-pull-refresh
                v-model="refreshing"
                @refresh="refresh_page"
        >
            <!--列表            -->
            <van-list
                    v-model="loading"
                    :finished="finished"
                    :immediate-check="false"
                    @load="load_img"
            >
                <img v-for="(k, i) in imgFileList" :src="k" :key="i" alt="接收图片"/>
            </van-list>
        </van-pull-refresh>
        <!--目录按钮-->
        <van-button class="show-menu" type="danger" @click="open_popup('menu')"><i class="iconfont icon-mulu"></i>
        </van-button>
        <!--翻页按钮-->
        <div class="btns">
            <van-button class="" type="warning" @click="before">上一章</van-button>
            <van-button class="" type="info" @click="next">下一章</van-button>
        </div>

    </div>
</template>

<script src="./js/index.js"></script>

<style scoped type="text/less" lang="less" src="./style/index.less"></style>
