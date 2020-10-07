<template>
    <div class="menu">
        <p v-for="(k, i) in arr" :key="i" @click.stop="go_view(k,i)">{{ k }}</p>
    </div>
</template>

<script src="./js/index.js"/>

<style scoped type="text/less" lang="less" src="./style/index.less"/>
