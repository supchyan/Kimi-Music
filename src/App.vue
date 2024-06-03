<template>
    <div id="splashBox">
        <div id="splashContent">
            <img src="./assets/logo.svg" alt="appLogo" />
            <div>
                <div id="plainBar"></div>
                <div id="fillBar"></div>
            </div>
        </div>
    </div>
    
    <div ref="iframe" id="video" />
</template>
<style> @import './assets/App.css'; </style>
<script setup>
    import { ref } from 'vue'
    import { videoPlayer } from './video.js'
    import { splashTranslate } from './splashTranslate.js';

    const root = document.documentElement;
    const iframe = ref()
    
    videoPlayer(iframe, root)
    splashTranslate(root)
</script>