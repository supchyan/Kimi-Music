import tmi from 'tmi.js'
import { channel, token, rewardType } from "../config.json"
import { reloadAll, currentVideo, showType } from "../commands.json"
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

// слушатель сообщений
function onMessageHandler (target, context, msg, self) {

    if(queueMusic) {
        if (context.username === `${channel}`) {
            // добавляет музыку в очередь стримера
            if(getId(msg)) adminQueue.push(getId(msg))
    
        } else {
            // добавляет музыку в очередь зрителей
            if(getId(msg)) queue.push(getId(msg))
        }
        queueMusic = false;
    }

    // дебаг для насти, чтобы чинить на месте
    if((context.username === `${channel}` || context.username === `umbrellaissold`) && msg == reloadAll)
        window.location.reload()

    // команда, показывает трек, который сейчас играет
    if(msg == currentVideo) {
        if(!curVideoURL) return;
        client.say(channel, `${curVideoTitle} - ${curVideoURL}`)
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
// чтобы вывалить в чат тип (id-like) награды, который потом
// надо в конфиг вставить в поле rewardType
function onRedeemed(target, username, type) {
    queueMusic = type === rewardType
    if(username == channel || username == 'umbrellaissold')
        oldRewardType = type;
}

export default { }
export { queue, adminQueue }