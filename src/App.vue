<template>
    <!-- <h1>{{ text }}</h1> -->
    <iframe class="video" frameborder="0" .src=link></iframe> 
</template>

<style scoped>
.video {
    
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50px;
    background-color: rgba(0, 0, 0, 0);
    
}
</style>
<script setup>
    import { queue } from './bot.js'
    import { getId } from './ytp.js'

    let source = 'https://www.youtube.com/watch?v=8Kx9Y2ot2d8';
    let link = `https://www.youtube.com/embed/${getId(source)}?autoplay=1&controls=0`
    
</script>