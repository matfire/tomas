import io from 'socket.io-client';
import feathers from '@feathersjs/client';
import store from './store/store'
import actions from './store/actions';

// Socket.io is exposed as the `io` global.
const socket = io('https://api.tomas-seniors.media/');
// @feathersjs/client is exposed as the `feathers` global.
const app = feathers();

app.configure(feathers.socketio(socket));
app.configure(feathers.authentication({storage:window.localStorage}));

// feathers.errors is an object with all of the custom error types.

app.service("messages").on("created", async(message) => {
    let state = store.getState()
    const { user } = await app.get('authentication');
    let messages = {...state.messages}
    if (message.to === user._id) {
        messages[message.from] = [message, ...messages[message.from]]
    } else {
        messages[message.to] = [message, ...messages[message.to]]
    }
    store.dispatch(actions.setMessages(messages))
})

app.service("users").on("updated", async(updatedUser, context) => {
    let state = store.getState()
    let {user} = state
    if (user._id === updatedUser._id) {
        store.dispatch(actions.setUser(updatedUser))
    }
})

app.service("images").on("created", image => {
    let state = store.getState()
    let images = state.images
    images.push(image)
    store.dispatch(actions.setImages(images))
})



export default app