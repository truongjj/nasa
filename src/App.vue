<template>
  <div id="app">
    <Header/>
    <router-view/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
export default {
  components: { Header },
  name: 'App'
}
</script>

<style>
body{
  margin: 0px !important;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.container{
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
.btn{
    padding: 0.5rem;
    background: #1175cb;
    border: unset;
    border-radius: 5px;
    color: white;
    border: 1px solid #2356b1;
    cursor:pointer;
}
.pointer{
  cursor: pointer;
}
.link{
  text-decoration: none;
  color: black;
}
.flex{
  display: flex;
}
.txt-left{
  text-align: left;
}
@media (min-width: 1750px){
  .container {
      width: 1700px;
      max-width: 1700px;
  }
}
</style>
