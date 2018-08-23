

export const actions = {
  nuxtServerInit ({commit}, {req}) {
    if (req.user) commit('users/login');
    else {console.log("session closed."); commit('users/logout');}
  }
};

