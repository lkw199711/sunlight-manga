<template>
    <div class="crypto">
        <p>加密与解密</p>
        <textarea v-model="text0" name="" id="t1" cols="30" rows="10"></textarea>
        <textarea v-model="text1" name="" id="t2" cols="30" rows="10"></textarea>
        <button class="btn" @click="en">加密</button>
    </div>
</template>

<script src='./js/index.js'/>

<style scoped type='text/less' lang='less' src='./style/index.less'/>