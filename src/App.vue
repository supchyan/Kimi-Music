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
@import url('https://fonts.googleapis.com/css2?family=Monomaniac+One&display=swap');
:root {
    --opacity: 0;
}
#displayName {
    margin: 0;
    padding: 0;
    top: 0;
    left: 0;
    position: absolute;
    color: black;
    font-size: 48px;
    font-family: "Monomaniac One", sans-serif;
    justify-content: center;
    align-items: center;
    display: flex;
    width: 100%;
    height: 100%;
}
</style>
<script setup>
    import { ref } from 'vue'
    import { videoPlayer } from './video.js'

    let username = `i'm here!`

    const root = document.documentElement;

    const iframe = ref()
    videoPlayer(iframe, root)

</script>