const setAuth = payload => (
    {
        type:"SET_AUTH",
        payload
    }
)

const setCoords = payload => (
    {
        type:"SET_COORDS",
        payload
    }
)

const setUser = payload => (
    {
        type:"SET_USER",
        payload
    }
)

const setMessages = payload => (
    {
        type:"SET_MESSAGES",
        payload
    }
)

const setSender = payload => (
    {
        type:"SET_SENDER",
        payload
    }
)

export default {setAuth, setCoords, setUser, setMessages, setSender}