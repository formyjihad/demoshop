<template>
    <div class=''>
    </div>
    
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex';
export default {
    
    async mounted() {
        let confirmed = confirm("로그아웃 하시겠습니까?")
        console.log("확인 결과 "+confirmed)
        if (confirmed == true){
            console.log("try to sign out")
            let url = 'http://localhost:3000/api/users/signout'
            let data = await axios.put(url)
            this.logout();
            this.$nuxt.$router.replace({path:'/'})
        }
    },
    methods:{
        ...mapMutations({
            logout:'users/logout'
        })
    }
}
</script>

    