<template>
    <div class='Header'>
        <div class="box-header container">
            <div class="box-search">
                <input type="text" name="search" placeholder="Search for..." v-model="keyword">
                <button @click="handleSearch()" class="btn-search btn">Search</button>
            </div>
            <div class="box-nav">
                <router-link to="/" class="link">All Data</router-link>
                <router-link to="/liked" class="link">Liked Data</router-link>
                <router-link to="/removed" class="link">Removed Data</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Header',
    data(){
        return{
            keyword:''
        }
    },
    methods:{
        handleSearch(){
            this.$router.push(`/search?q=${this.keyword}`)
        }
    }

}
</script>

<style scoped>
.Header{
    background: #091938c9;
}
.box-header{
    display: flex;
    padding: 1rem;
    justify-content: space-between;
}
.btn-search{
    margin-left:0.5rem ;
}
.box-search{
    display: flex;
}
.box-nav{
    display: flex;
    align-items: center;
}
.link{
    text-decoration: none;
    color: white;
    padding:0 0.5rem;
}
.box-nav .router-link-exact-active {
    color: rgb(102 235 141);
}
</style>