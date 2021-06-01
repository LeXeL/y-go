export default {
    state: {
        user: '',
        isVerified: '',
        token: localStorage.getItem('user-token') || '',
        uid: localStorage.getItem('uid') || '',
        cart: [],
    },
    mutations: {
        SET_USER: (state, payload) => {
            state.user = payload
        },
        SET_UID: (state, payload) => {
            state.uid = payload
        },
        SET_TOEKN: (state, payload) => {
            state.token = payload
        },
        SET_CART: (state, payload) => {
            state.cart = payload
        },
        SET_VERIFIED: (state, payload) => {
            state.isVerified = payload
        },
    },
    actions: {
        setCurrentUser: async ({commit, dispatch}, user) => {
            try {
                let token = await user.getIdToken()
                commit('SET_UID', user.uid)
                commit('SET_VERIFIED', user.emailVerified)
                commit('SET_TOEKN', token)
                localStorage.setItem('user-token', token)
                localStorage.setItem('uid', user.uid)
            } catch (error) {
                console.log(`Error in store: ${error}`)
                return error
            }
        },
        UserLogout: async ({commit, dispatch}) => {
            commit('SET_USER', '')
            commit('SET_UID', '')
            commit('SET_TOEKN', '')
            localStorage.removeItem('user-token')
            localStorage.removeItem('uid')
        },
    },
    getters: {
        user: state => state.user,
        uid: state => state.uid,
        isVerified: state => state.isVerified,
        isAuthenticated: state => !!state.token,
        role: state => state.user.role,
        cart: state => state.cart,
    },
}
