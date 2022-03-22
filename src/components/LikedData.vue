<template>
  <div class="LikedData">
    <div class="container">
      <h3 class="txt-left">Like</h3>
    </div>
    <ListView :data="listLikedImage" :removeUnlike="true"/>
  </div>
</template>

<script>
import ListView from '@/components/ListView'
export default {
  name: "LikedData",
  data() {
    return {
        listImages:[],
        listLikedImage:[]
    };
  },
  components:{
      ListView
  },
  created(){
    this.listImages = JSON.parse(localStorage.getItem('data'));
    if(this.listImages)
    {   
        this.listLikedImage = this.listImages.filter((item)=>{
            return item.status.liked===true && item.status.removed===false
        });
    }
  },
  computed:{
     
  }
};
</script>

<style scoped>
</style>