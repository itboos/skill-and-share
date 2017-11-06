<template>
  <div class="rank">
    
  </div>
</template>

<script>
//处理图片
// import rankBody from '../assets/imgs/rank_body.jpg'

export default {
  name: 'rank',
  props:{
    list:Array
  },
  data () {
    return {
      styleObj:{
        rankBody: {
          // background: 'url("' + rankBody + '") 0 0 repeat-y',
          // backgroundSize: '100% auto',
         
        },
        img:{
          // rankBody: rankBody,
         
        },
       
      },
    }
  },
  created() {
    
  },
  methods:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../lib/function';
  
</style>

