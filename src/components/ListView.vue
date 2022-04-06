<template>
  <div class="ListView">
    <div class="container">
      <div class="sort" v-if="imagesLength">
        <select v-model="sortSelected" class="sort-select">
          <option :selected="true" value="choose">Sort by...</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="az">a-z</option>
          <option value="za">z-a</option>
        </select>
      </div>
      <div v-if="imagesLength" class="box-item">
        <div class="item" v-for="(item, index) in listImages" :key="index">
          <div style="padding-right:1rem;">
            <div v-if="item.links">
              <div v-for="(item2, index2) in item.links" :key="index2" >
                <router-link :to="'/detail/'+item.data[0].nasa_id">
                  <div v-if="item2.rel == 'preview'" class="item-image" :style="'background-image:url('+'\''+item2.href+'\''+')'">
                  </div>
                </router-link>
              </div>
            </div>
            <div v-else >
                <router-link :to="'/detail/'+item.data[0].nasa_id">
                  <div class="item-image" style="background:black;">
                  </div>
                </router-link>
            </div>
            <div class="item-detail">
              <router-link :to="'/detail/'+item.data[0].nasa_id" class="link">
                <h4 class="title">{{ item.data[0].title }}</h4>
                <p class="date">{{ item.data[0].date_created.split('T')[0] }}</p>
              </router-link>
              <div class="status">
                <div v-if="item.status.removed===false">
                  <span v-if="item.status.liked===false" class="pointer material-icons-outlined" @click="handleLikeAndUnlike(item,index,true)">favorite_border</span>
                  <span v-else class="pointer liked material-icons-outlined" @click="handleLikeAndUnlike(item,index,false)">favorite</span>
                </div>
                <span v-if="item.status.removed===false" class="pointer material-icons-outlined" @click="handleDeleteAndUndo(item,index,true)">delete</span>
                <span v-else class="pointer material-icons-outlined" @click="handleDeleteAndUndo(item,index,false)">undo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <h3 class="txt-left">Không tìm thấy dữ liệu...</h3>
      </div>
      <div class="pagination" v-if="prevLink || nextLink">
        <button v-if="prevLink" class="btn" @click="handlePrevAndNext(prevLink)">Previous</button>
        <button v-if="nextLink" class="btn" @click="handlePrevAndNext(nextLink)">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListView",
  data() {
    return {
      localData:[],
      listImages:[],
      sortSelected:"choose"
    };
  },
  props: {
    data: Array,
    removeUnlike:Boolean,
    nextLink:String,
    prevLink:String
  },
  watch:{
    data(newVal){
      this.listImages= newVal
    },
    sortSelected(newVal){
      if(newVal==="az"){
        this.listImages=this.sortByName
      }else if(newVal==="za"){
        this.listImages=this.sortByName.reverse()
      }else if(newVal==="newest"){
        this.listImages=this.sortByDate.reverse()
      }else if(newVal==="oldest"){
        this.listImages=this.sortByDate
      }
    }
  },
  async created(){
    this.listImages= this.data
  },
  computed:{
    imagesLength(){
      // return this.listImages.length
      if(this.listImages){
        return Object.keys(this.listImages).length
      }
      return 0
    },
    sortByName(){
      function compare(a,b){
        if (a.data[0].title < b.data[0].title)
          return -1;
        if (a.data[0].title > b.data[0].title)
          return 1;
        return 0;
      }
      return this.listImages.sort(compare);
    },
    sortByDate(){
      return this.listImages.sort((a,b)=>
        new Date(a.data[0].date_created) - new Date(b.data[0].date_created)
      );
    },
  },
  methods:{
    handleLikeAndUnlike(item,idx,value){
      const localData=JSON.parse(localStorage.getItem('data')) //all
      this.listImages=this.listImages.map((image,index)=>{
        if(index===idx)
          return {
            ...image,status:{...image.status,liked:value}
          }
        return image;
      })
      let index=localData.findIndex(i => i.data[0].nasa_id===item.data[0].nasa_id)
      localData[index].status.liked=value
      localStorage.setItem('data',JSON.stringify(localData));
      if(value===false && this.removeUnlike===true){
        this.listImages=this.listImages.filter((image,index)=>{return !(index===idx)});
      }
    },

    handleDeleteAndUndo(item,idx,value){
      const localData=JSON.parse(localStorage.getItem('data')) //all
      this.listImages=this.listImages.map((image,index)=>{
        if(index===idx)
          return {
            ...image,status:{...image.status,removed:value}
          }
        return image;
      })
      let index=localData.findIndex(i => i.data[0].nasa_id===item.data[0].nasa_id)
      localData[index].status.removed=value
      localStorage.setItem('data',JSON.stringify(localData));
      this.listImages=this.listImages.filter((image,index)=>{return !(index===idx)});
    },

    handlePrevAndNext(link){
      window.scrollTo(0,0);
      this.$router.push("/search?q="+link.split('?q=')[1])
    },

  }
};
</script>

<style scoped>
.item {
  width: 20%;
  overflow: hidden;
  margin-bottom:0.5rem ;
}
.box-item {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}
.item-image{
    width: 100%;
    height: 230px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}
.item-detail{
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
.item-detail .status{
  display: flex;
  border-left: 1px solid;
  padding: 0px 0.5rem;
}
.title{
  padding-right:0.5rem;
  justify-content: center;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  position: relative;
  transition: all .3s ease-in-out;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  text-align: left;
}
.date{
  margin: 0px;
  padding: 0px;
  text-align: left;
  position: relative;
  bottom: 18px;
}
.liked{
  color: red;
}
.pagination{
  margin-bottom:1rem;
}
.sort{
  display: flex;
  margin-bottom:1rem;
}
.sort-select{
  width: 150px;
  height: 30px;
}
</style>



