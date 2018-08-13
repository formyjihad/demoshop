
export const state = () => ({
    isLogin:null
})

export const mutations={
    login(state){
        state.isLogin = true
    },
    logout(state){
        state.isLogin = false
    }
}

export const getters = {
    isLogin(state) { 
        return state.isLogin
    }
}
