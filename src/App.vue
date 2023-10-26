

<template>
  
  


   <div 
    v-if="router.options.history.location!=='/login'" 
   >
      <Layout></Layout>
   </div>
   <div v-else>
        
        <router-view></router-view>
   </div>
    
    
</template>
<script lang="ts">
   import { useRouter, RouterView } from 'vue-router';
   import { defineComponent, ref,onMounted} from "vue";
   import Layout from './layout/Layout.vue';
   export default defineComponent ({
      components:{
         Layout,
         RouterView
      },
   setup() {
      const router = useRouter();
      

      onMounted(() => {
         console.log(router.options.history.location)
    });

      // Now you can use the router instance as needed
      

      return {
         router
      };
   },
   });
</script>
<style lang="scss">
   // Main demo style scss
   @import "assets/sass/plugins";
   @import "assets/sass/style";
</style>

