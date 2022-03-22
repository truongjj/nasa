import Vue from "vue";
import Router from "vue-router";
import AllData from "@/components/AllData";
import LikedData from "@/components/LikedData";
import RemovedData from "@/components/RemovedData";
import Search from "@/components/Search";
import Detail from "@/components/Detail"
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "All data",
      component: AllData
    },
    {
      path: "/liked",
      name: "LikedData",
      component: LikedData
    },
    {
      path: "/removed",
      name: "RemovedData",
      component: RemovedData
    },
    {
      path: "/search",
      name: "Search",
      component: Search
    },
    {
      path: "/detail/:nasaid",
      name: "Detail",
      component: Detail
    },
    
  ]
});
