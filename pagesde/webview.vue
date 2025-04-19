<template>
    <web-view :src="webUrl"></web-view>
</template>
 
<script>
    export default {
        name: "webview",
        data() {
            return {
                webUrl: uni.getStorageSync('url')
            };
        },
    }
</script>
 
<style>
 
</style>