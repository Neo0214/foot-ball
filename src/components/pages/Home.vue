<template>
<div>
  <subHeader :prop-active-index="1"/>
  <div class="main">
    <div class="home">
      {{ message }}
    </div>
  </div>
</div>

</template>

<script>
import subHeader from '@/components/sub-components/Header.vue'
export default {
  name: 'PageHome',
  components: {
    subHeader
  },
  data() {
    return {
      message: 'Hello Vue!'
    }
  }
}
</script>


<style scoped>
.main{
  width:100%;
  height:100vh;
  display:flex;
  justify-content:center;
  margin-top:2%;
}
</style>