<template>
  <div>
    <Header/>
    <section class="nuxt">
      <nuxt/>
    </section>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
export default {
  components:{
    Header
  }
}
</script>

<style scoped>
html{
  
  font-family: Arial, Helvetica, sans-serif

}
.nuxt{
  height: 100%
}

</style>
