import tmi from 'tmi.js'
import { channel, token, rewardTitle } from "../config.json"
import { getId } from './ytp.js'

const opts = {
    identity: {
        username: 'zero',
        password: token
    },
    channels: [
        channel
    ]
};
const client = new tmi.client(opts);
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);
client.connect();

const queue = []; // очередь зрителей
const adminQueue = []; // очередь стримера

function onMessageHandler (target, context, msg, self) {
    if (context.username === `${channel}`) {
        // добавляет музыку в очередь стримера
        if(getId(msg)) adminQueue.push(getId(msg))

    } else {
        // добавляет музыку в очередь зрителей
        if(getId(msg)) queue.push(getId(msg))
    }

    // дебаг для насти, чтобы чинить на месте
    if(context.username === `umbrellaissold` && msg == `!reload`) window.location.reload()
}
function onConnectedHandler (addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}
export default { }
export { queue, adminQueue }