<template>
  <div class="container is-fluid">
          
        <NavBar></NavBar>
        <router-view></router-view>
        <Footer></Footer>
  </div>
</template>

<script>

import NavBar from "./../NavBar.vue";
import Footer from "./../Footer.vue";

export default {
  components: {
    NavBar,
    Footer,
  },
  mounted() {
    console.log("Component mounted.");
  },
};
</script>
