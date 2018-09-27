<template>
  <div>
    <Header/>
    <section class="nuxt">
      <nuxt/>
    </section>
    <Footer/>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
export default {
  components:{
    Header,
    Footer
  }
}
</script>

<style scoped>

.nuxt{
  height: 100%
}

</style>
