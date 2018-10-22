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

.nuxt{
  height: 100%
}

</style>
