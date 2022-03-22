<template>
    <div class='Detail'>
        <div class="box-detail container flex">
            <div class="left">
                <div v-for="(item,index) in link" :key="index" >
                    <div v-if="item.rel==='preview'" :style="'background-image:url('+'\''+item.href+'\''+')'" class="image">
                    </div>
                </div>
            </div>
            <div class="right" v-show="!isEdit">
                <h3 class="title txt-left">
                    {{title}}
                </h3>
                <p class="txt-left">
                    {{description}}
                </p>
                <p class="txt-left">
                    <b>Date Created: </b>{{date}}
                </p>
                <p class="txt-left">
                    <b>Center: </b>{{center}}
                </p>
                <p class="txt-left" v-if="keywords">
                    <b>Keywords: </b>
                    <router-link v-for="(item,index) in keywords" :key="index" :to="'/search?q='+item" class="keywords">   {{item}}    </router-link>
                </p>
                <div class="edit flex">
                    <button class="btn" @click="handleEdit()">Edit</button>
                </div>
            </div>
            <div class="right" v-show="isEdit">
                <form @submit="handeUpdate">
                    <h3 class="title txt-left">Title:</h3>
                    <input type="text" v-model="title">
                    <h3 class="title txt-left">Description:</h3>
                    <textarea v-model="description" cols="100" rows="4"></textarea>
                    <h3 class="title txt-left">Date Created:</h3>
                    Year: <input type="number"  max="2022" v-model="year">
                    Month: <input type="number" min="1" max="12" v-model="month">
                    Date: <input type="number" min="1" max="31" v-model="dateDetail">
                    <p class="txt-left">
                        <b>Center: </b>{{center}}
                    </p>
                    <!-- <p class="txt-left" v-if="keywords">
                        <b>Keywords: </b>
                        <input v-for="(item,index) in keywords" :key="index" class="keywords" :value="item">
                    </p> -->
                    <div class="edit flex">
                        <button class="btn-update btn" type="submit">Update</button>
                        <button type="button" class="btn-cancel btn" @click="handleCancel()">Cancel</button>  
                    </div>
                </form>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: 'Detail',
    data(){
        return{
            detail:null,
            data:[],
            link:[],
            title:"",
            description:"",
            date:null,
            center:"",
            keywords:[],
            isEdit:false,
            dateDetail:0,
            month:0,
            year:0
        }
    },
    mounted(){
        this.data=JSON.parse(localStorage.getItem('data'));
        if(this.data){
            this.detail=this.data.find((item)=>{
                return item.data[0].nasa_id===this.getParams
            })
        }
        this.fetchData
    },
    watch:{
        fullDate(newVal){
            this.date=newVal
        }
    },
    computed:{
        getParams(){
            return this.$route.params.nasaid;
        },
        fetchData(){
            this.link=this.detail.links;
            this.title=this.detail.data[0].title;
            this.description=this.detail.data[0].description;
            this.date=this.detail.data[0].date_created.split('T')[0];
            this.center=this.detail.data[0].center;
            this.keywords=this.detail.data[0].keywords
            this.dateDetail=this.date.split('-')[2]
            this.month=this.date.split('-')[1]
            this.year=this.date.split('-')[0]
        },
        fullDate(){
            return this.year+'-'+this.month+'-'+this.dateDetail
        }
    },
    methods:{
        handeUpdate(e){
            e.preventDefault()
            this.data.map((item) => {
                if(item.data[0].nasa_id===this.getParams){
                    item.data[0].title=this.title
                    item.data[0].description=this.description,
                    item.data[0].date_created=this.year+'-'+this.month+'-'+this.dateDetail+'T'+this.detail.data[0].date_created.split('T')[1];
                }
            })
            localStorage.setItem("data",JSON.stringify(this.data))
            alert("Thay đổi đã được lưu")
            this.isEdit=false
        },
        handleEdit(){
            this.isEdit=true
        },
        handleCancel(){
            this.isEdit=false
        }
    },
    
}
</script>

<style scoped>
.image{
    width: 600px;
    height: 400px;
    background-size: cover;
    background-position: top;
}
.keywords{
    margin-right:1rem;
}
.right{
    margin-left:1rem;
    text-align: left;
}
.box-detail{
    margin-top:2rem ;
}
.edit{
    width: 100%;
}
.btn-cancel{
    background: rgb(182, 23, 23);
    margin-left: 1rem;
    border-color: #8b1717;
}
</style>