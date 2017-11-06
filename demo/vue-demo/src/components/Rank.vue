<template>
  <div class="rank">
    
  </div>
</template>

<script>
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
    setTimeout(()=> {
      //console.log(this.list);
    },2000);
  },
  methods:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  $rem: 37.5;   /* 对应iPhone6 750*~~~  设计稿*/
  $rem2: 18.75; /* 对应iPhone6 1rem */
  
  </style>

