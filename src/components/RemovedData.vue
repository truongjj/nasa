<template>
  <div class="RemovedData">
    <div class="container">
      <h3 class="txt-left">Removed Data</h3>
    </div>
    <ListView :data="listRemovedImage" :removeItem="true" />
  </div>
</template>

<script>
import ListView from '@/components/ListView'
export default {
  name: "RemovedData",
  data() {
    return {
        listImages:[],
        listRemovedImage:[]
    };
  },
  components:{
      ListView
  },
  created(){
    this.listImages = JSON.parse(localStorage.getItem('data'));
    if(this.listImages)
    {   
      this.listRemovedImage = this.listImages.filter((item)=>{
        return item.status.removed===true;
      });
    }
  }
};
</script>

<style scoped>
</style>