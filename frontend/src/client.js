import io from 'socket.io-client';
import feathers from '@feathersjs/client';

// Socket.io is exposed as the `io` global.
const socket = io('http://localhost:3030');
// @feathersjs/client is exposed as the `feathers` global.
const app = feathers();

app.configure(feathers.socketio(socket));
app.configure(feathers.authentication({storage:window.localStorage}));

// feathers.errors is an object with all of the custom error types.

export default app