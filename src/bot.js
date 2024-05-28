import tmi from 'tmi.js'
import { channel, token, rewardTitle } from "../config.json"
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

const queue = [];
function onMessageHandler (target, context, msg, self) {
    // if (self) { return; }
    queue.push(msg)
}
function onConnectedHandler (addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}
export default {}

export {
    queue
}