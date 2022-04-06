import axios from "axios";
const state = {
  dataSearch:[],
  paginationLinks:[]
};
const getters = {
  dataSearch: state => state.dataSearch,
  paginationLinks: state => state.paginationLinks
};
const mutations = {
};
const actions = {
  async searchData({ commit },keywork) {
    try {
      const response = await axios.get(process.env.SERVER_HOST + `/search?q=${keywork}`);
      state.dataSearch = response.data.collection.items;
      state.paginationLinks=response.data.collection.links
      if(state.dataSearch){
        state.dataSearch.map((item)=>{
          item['status']={
              liked:false,
              removed:false
          }
        })
      }
      let localData=JSON.parse(localStorage.getItem('data'))
      if(!localData){
        if(state.dataSearch.length>0){
          localStorage.setItem("data",JSON.stringify(state.dataSearch));
        }
      }
      else{
        state.dataSearch.map((item)=>{
          let image=localData.find(dt => dt.data[0].nasa_id===item.data[0].nasa_id);
          if(!image){
            localData.push(item)
          }else{
            item.status=image.status
          }
        });
        localStorage.setItem("data",JSON.stringify(localData));
      }
    } catch (error) {
        console.log(error)
    }
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
