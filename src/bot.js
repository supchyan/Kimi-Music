import tmi from 'tmi.js'
import { channel, token, rewardType, rewardRequired } from "../config.json"
import { reloadAll, currentVideo, showType, nextVideo } from "../commands.json"
import { getId } from './ytp.js'
import { curVideoURL, curVideoTitle } from './video';

const opts = {
    identity: { username: 'zero', password: token },
    channels: [ channel ]
};

const client = new tmi.client(opts);

client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);
client.on('redeem', onRedeemed )

client.connect();

const queue = []; // очередь зрителей
const adminQueue = []; // очередь стримера

let queueMusic = false;
let oldRewardType = '';
let nextTrigger = false;
let forbitQueue = false;

// слушатель сообщений
function onMessageHandler (target, sender, msg, self) {

    // ВНИМАНИЕ КОСТЫЛЬ!!!

    // убирает прикол, когда в один канал можно спамить ботами с разными токенами
    // в следствии чего, эта вся штука работает ТОЛЬКО если токен бота принадлежит тому каналу,
    // на котором бот работает. т.е. если токен мой, то и канал должен быть мой и т.д.
    if(client.username !== channel) return;

    //  проверка доступа к команде
    const modPermission = sender.username === channel || sender.mod;

    if(queueMusic && rewardRequired == 1) {
        if (sender.username === channel) {
            // добавляет музыку в очередь стримера
            if(getId(msg)) adminQueue.push(getId(msg))
    
        } else {
            // добавляет музыку в очередь зрителей
            if(getId(msg)) queue.push(getId(msg))
        }
        queueMusic = false;
    }

    if(rewardRequired == 0) {
        if(msg.startsWith('!queue ')) {
            if (sender.username === channel) {
                // добавляет музыку в очередь стримера
                if(getId(msg)) adminQueue.push(getId(msg))
        
            } else {
                // добавляет музыку в очередь зрителей
                if(getId(msg)) queue.push(getId(msg))
            }
        }
    }

    // дебаг для насти, чтобы чинить на месте
    if(modPermission && msg == reloadAll)
        window.location.reload();

    // команда, показывает трек, который сейчас играет
    if(msg == currentVideo) {
        if(curVideoURL) {
            client.say(channel, `${curVideoTitle} - ${curVideoURL}`)
        }
    }

    // триггер следующего трека
    if(modPermission && msg == nextVideo) {
        nextTrigger = !nextTrigger;
    }

    // команда, показывающая айдишник награды
    // нужен для конфига, чтобы знать, с чего брать ссылки для очереди треков
    if(msg == showType && oldRewardType !== '') {
        client.say(channel, oldRewardType)
    } oldRewardType = '';

}
// заглушка с доков, чтобы увидеть, что ботик работает
function onConnectedHandler (addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}
// слушает награды, в частности, нужна разве что для того,
// чтобы отправиьт в чат идентификатор награды, который
// используется в rewardType в config.json
function onRedeemed(target, username, type, sender) {   

    // про костыль выше читай
    if(client.username !== channel) return;

    //  проверка доступа к событию
    const modPermission = username === channel || sender.mod;

    // запускает триггер постановки трека в очередь,
    // если id награды соответствует тому, что в конфиге.
    queueMusic = type === rewardType;

    // сохраняет id награды на время отправки этой награды
    // используется в onMessageHandler командой showType
    if(modPermission) oldRewardType = type;
}

export default { }
export { queue, adminQueue, nextTrigger }