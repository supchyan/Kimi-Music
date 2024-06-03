<template>
    <div ref="iframe" id="video" />
</template>
<style> @import '../assets/App.css'; </style>
<script setup>
    import { ref } from 'vue'
    import { videoPlayer } from '../scripts/video.js'

    const root = document.documentElement;
    const iframe = ref()
    
    videoPlayer(iframe, root)
</script>