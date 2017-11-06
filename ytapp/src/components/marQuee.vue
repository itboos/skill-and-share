<template>
  <div class="mar-quee">
   <p ref='tetxNode' class="marquee">★★★★★收藏网址 • 精彩不错过。点击浏览器的收藏按钮，收藏天天电视！！！</p>
  </div>
</template>
<script>
  // /* eslint-disable */
  export default {
    name: 'marQuee',
    data() {
      return {
        message: '★★★★★收藏网址 • 精彩不错过。点击浏览器的收藏按钮，收藏天天电视！！！',
      };
    },
    watch: {},
    computed: {},
    mounted() {
      // const textP = this.$refs.tetxNode;
    },
    methods: {
    },
    components: {
    },
  };
</script>

<style  lang="scss">
  @import "../assets/css/base";
  .mar-quee {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    width:100%;
    background:#feddd2; /* 不支持背景渐变的浏览器 */
    background: -webkit-linear-gradient(150deg, #fff9f0, #feddd2); /* Safari 5.1 - 6.0 */ 
    background: -o-linear-gradient(150deg, #fff9f0, #feddd2); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(150deg, #fff9f0, #feddd2); /* Firefox 3.6 - 15 */
    background: -prefix-linear-zgradient(150deg, #fff9f0, #feddd2); 
    background: linear-gradient(150deg, #fff9f0, #feddd2);/* 标准的语法 */
    box-shadow: 0px -1px 10px  rgba(0,0,0,0.2);
    > p {
        position: relative;
        white-space: nowrap;
        text-overflow: clip;
        // overflow: hidden;
        text-align: center;
        white-space:pre;
        left: 40%;
        padding: (14rem / $rem) (8rem / $rem); 
    }
  }

@-moz-keyframes animation{
    0% { left: 40%; }
    100% { left: -140%; }
}
 
@-o-keyframes animation{
    0% { left: 40%; }
    100% { left: -140%; }
}
@-webkit-keyframes marquee {
    0% { left: 40%; }
    100% { left: -140%; }
}
@keyframes marquee {
  0% { left: 40%}
  100% { left: -140%}
}
.marquee {
    -moz-animation: marquee 6s linear infinite;
    -o-animation: marquee 6s linear infinite;
    -webkit-animation: marquee 6s linear infinite;
    animation: marquee 6s linear infinite;
}

</style>
