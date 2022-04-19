<template>
  <div class="hello">
    <h1>{{msg}}</h1>
    <div class="li" v-for="item in lists" :key="item.id">{{item.name}}</div>
    <p>{{cartNum}}</p>
    <button @click="addFn">add</button>
    <strong @click="fetchData">fetch data</strong>
    <a id="goPage" href="javascript:;" @click="goPage">go about</a>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'HelloWorld',
  props: ['msg'],
  data(){
    return {
      lists: [],
      cartNum: 0,
      storeList: []
    }
  },
  computed: {
    ...mapGetters(['getLoginStatus']),
  },
  mounted(){
    this.$http.get('/api/list').then(res => {
      this.lists = res.data
    })
  },
  methods: {
    ...mapActions(['fetchList']),
    async fetchData(){
      const result = await this.fetchList()
      this.storeList = result.data
    },
    addFn(){
      console.log(this.getLoginStatus)
      if(!this.$store.getters.getLoginStatus()){
        this.$router.push('/login')
      }else{
        this.$http.post('/api/add').then(res => {
          if(res.success){
            this.cartNum += 1
            this.$emit('add',this.cartNum)
          }else{
            console.log('error')
          }
        })
      }
      
    },
    goPage(){
      this.$router.push({
        path: '/about',
        query: {
          num: this.cartNum
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
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
