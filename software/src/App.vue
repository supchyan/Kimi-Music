<template>
    <div ref="iframe" style="
        border-radius: 50px;
        margin: 0;
        padding: 0;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: rgba(0,0,0,0);
        opacity: var(--opacity);
        pointer-events: none;
        z-index: -1;
    "/>
</template>
<style>
    :root { --opacity: 0; }
</style>
<script setup>
    
    import { ref } from 'vue'
    import { videoPlayer } from './video.js'
    
    const iframe = ref()
    videoPlayer(iframe, document.documentElement)

</script>