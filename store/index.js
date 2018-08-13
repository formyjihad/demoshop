

export const actions = {
    nuxtServerInit ({commit}, {req}) {
      if (req.user) commit('users/login');
      else {console.log("세션 닫음"); commit('users/logout');}
    }
};