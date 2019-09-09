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

export default {setAuth, setCoords, setUser}