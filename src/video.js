import { queue, adminQueue, nextTrigger } from './bot.js'
import { usePlayer } from '@vue-youtube/core';

let curQueue = 0;
let curAdminQueue = 0;
let isPlaying = false;
let isAdminPlaying = false;
let adminCanPlay = true;
let opacityLerp = 0;
let adminTime = 0;
let curVideoTitle = '';
let curVideoURL = '';
let oldNextTrigger = false;

function videoPlayer(iframe, root) {
    const { instance, onStateChange, onReady } = usePlayer('', iframe, {
        playerVars: { autoplay: 1, controls: 0, cc_load_policy: 0 },
    });
    
    onReady((event) => { root.style.setProperty('--opacity', 0); })

    onStateChange((event) => {

        // data 1 - триггер, который срабатывает, когда плеер 'начинает' проигрывать видео
        if(event.data == '1') {
            curVideoTitle = event.target.videoTitle;
            curVideoURL = event.target.getVideoUrl();
        }

        // data 0 - триггер, который срабатывает, когда плеер 'заканчивает' проигрывать видео
        if(event.data == '0') nextVideo();

    })
    
    setInterval(() => {
        // анимация появления плеера типо (костыль ;;)
        if(isPlaying || isAdminPlaying) {

            if(opacityLerp < 1) opacityLerp += 0.05;

        } else {

            if(opacityLerp > 0) opacityLerp -= 0.05;

        }

        root.style.setProperty('--opacity', opacityLerp);

    }, 1)

    setInterval(() => {

        if(oldNextTrigger != nextTrigger) {
            instance.value?.stopVideo();
            nextVideo();

            oldNextTrigger = nextTrigger;
        }

        // алгоритм проверки очередей треков на наличие этих самых треков
        // загружает треки по очереди, с приоритетом очереди зрителей
        if(!queue[curQueue]) {

            if(!adminQueue[curAdminQueue] || isAdminPlaying || !adminCanPlay) return;

            instance.value?.loadVideoById(adminQueue[curAdminQueue],adminTime,'hd720')
            isAdminPlaying = true;
            adminTime = 0;

        } else {
            
            if(isPlaying) return;
            
            // если админская очередь играла в этот момент,
            // сбрасывает её триггеры и блокирует
            adminCanPlay = false;
            isAdminPlaying = false;

            // сохраняет текущее время песни в админ очереди
            // чтобы после того, как все треки тут проиграются,
            // вернуться к админ очереди в нужный трек, в нужное время
            adminTime = instance.value?.getCurrentTime() 
            // и заменяет на обычную очередь
            instance.value?.loadVideoById(queue[curQueue],0,'hd720')
            isPlaying = true;

        }
        
    }, 1000)

}

// около эксперементальная штука, дергает определенны триггеры,
// чтобы плеер переключил видео на следующее в очереди, если такое есть
function nextVideo() {
    // увиличивает значение стека в очереди и сбрасывает '*playing' триггеры
    if(isPlaying) { curQueue++; adminCanPlay = true; isPlaying = false; }

    if(isAdminPlaying) { curAdminQueue++; isAdminPlaying = false; }
    //
}

export default { }
export { videoPlayer, curVideoTitle, curVideoURL }
