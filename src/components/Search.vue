<template>
    <div class='Search'>
        <div class="container">
            <h3 class="title-search">Showing results for "{{getQuery}}":</h3>
        </div>
        <ListView :data="data" :nextLink="nextLink" :prevLink="prevLink"/>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ListView from '@/components/ListView'
export default {
    name: 'Search',
    data(){
        return{
            data:[],
            pagiLinks:[],
            nextLink:"",
            prevLink:""
        }
    },
    components:{
        ListView
    },
    watch:{
        async getUrl(){
            await this.fetchData()
        },
    },
    async mounted(){
       await this.fetchData()
    },
    updated(){
        this.data=this.data
    },
    computed:{
        getQuery(){
            return this.$route.query.q
        },
        getUrl(){
            return this.$route.fullPath
        },
        ...mapGetters(["dataSearch","paginationLinks"])
    },
    methods:{
        async fetchData(){
            this.nextLink=''
            this.prevLink=''
            await this.searchDatas()
            this.data=this.dataSearch
            this.pagiLinks=this.paginationLinks
            if(this.pagiLinks){
                this.pagiLinks.map((item)=>{
                    if(item.rel==="next"){
                        this.nextLink=item.href
                    }
                    if(item.rel==="prev"){
                        this.prevLink=item.href
                    }
                })

            }
        },
        async searchDatas(){
            const keyword=this.getQuery
            if(keyword){
                await this.searchData(this.getUrl.split('?q=')[1]);
            } 
        },
        ...mapActions(["searchData"])
    }
}
</script>

<style scoped>
.title-search{
    text-align: left;
}
</style>