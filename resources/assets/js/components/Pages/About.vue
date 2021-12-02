<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        
        About Me!
        <router-view></router-view>

      </div>
    </div>
  </div>
</template>

<script>

import NavBar from "./../NavBar.vue";
export default {
  components: {
    NavBar,
  },
  mounted() {
    console.log("Component mounted.");
  },
};
</script>
