<template>
    <div id="splashBox">
        <div id="splashContent">
            <img src="../assets/logo.svg" alt="appLogo" />
            <div>
                <div id="plainBar"></div>
                <div id="fillBar"></div>
            </div>
        </div>
    </div>
</template>
<style> @import '../assets/App.css'; </style>
<script setup>
    import { splashTranslate } from '../scripts/splashTranslate.js';

    const root = document.documentElement;
    splashTranslate(root)
</script>