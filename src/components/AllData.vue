<template>
  <div class="alldata">
    <div class="container">
      <h3 v-theme="theme" class="txt-left">All</h3>
    </div>
    <button @click="handleChangeTheme()">{{theme=="light" ? "dark" : "light"}}</button>
    <ListView :data="data" />
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
      theme:'dark'
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
    handleChangeTheme(){
      this.theme = this.theme=="light" ? "dark" : "light"
      console.log(this.theme)
    },
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
