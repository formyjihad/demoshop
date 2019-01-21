//import mapMutations from 'vuex'
export default function ({ store, redirect }) {
    
    // 사용자가 인증을 하지 않은 경우.
    console.log(store.state)
    //if (!store.state.authenticated) {
    //    return redirect('/login')
    //}

    return redirect('/')

    
}
