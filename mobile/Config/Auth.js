import io from 'socket.io-client';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import {AsyncStorage} from 'react-native'
const auth = require('@feathersjs/authentication-client');

const socket = io('https://api.tomas-seniors.media');

const app = feathers();

app.configure(socketio(socket, {
    transports: ['websocket'],
    forceNew: true,
}));

app.configure(auth({ storage: AsyncStorage }));

export default app;