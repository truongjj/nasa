<template>
  <div class="alldata">
    <div class="container">
      <h3 class="txt-left">All</h3>
    </div>
    <ListView :data="data"/>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ListView from '@/components/ListView'
export default {
  name: "AllData",
  data() {
    return {
      data:[],
    };
  },
  created(){
    this.data=JSON.parse(localStorage.getItem('data'))
    if(this.data){
      this.data=this.data.filter((item)=>{
        return item.status.removed===false
      })
    }
  },
  components:{
    ListView
  },
  methods: {

    
    ...mapActions(["searchData"]),
  },
};
</script>

<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
