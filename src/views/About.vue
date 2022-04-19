<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>{{count}}</p>
  </div>
</template>

<script>
export default {
  name: 'About',
  data(){
    return {
      count: 0
    }
  },
  mounted(){
    this.count = this.$route.query.num
  }
}
</script>
