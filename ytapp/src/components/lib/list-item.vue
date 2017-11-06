<template>
<div>
  <div class="container">
    <div class="tag-name">
        {{list.tagName}}
    </div>
    <div class="tv-container flex" >
        <span class="tv one-line" 
              v-for="tv in list.tvs"  @click="goWatch(tv.tvId, tv.tvName)">
           {{tv.tvName}}
        </span>
    </div>
  </div>
</div>
</template>
<script>
  export default {
    name: 'list-item',
    props: {
      list: Object,
      hotList: Array,
    },
    data() {
      return {
        countShow: 1,
      };
    },
    watch: {
    },
    computed: {
      num() {
        return this.gift.num;
      },
    },
    created() {},
    mounted() {

    },
    methods: {
      goWatch(tvId,tvName) {
        const homePath = this.$store.getters.homePath;
        //console.log('去播放页面', this.$store.getters.homePath);
        this.$router.push(`${homePath}play?tvId=${tvId}&tvName=${encodeURIComponent(tvName)}`);
      },
    },
    components: {},
  };
</script>

<style scoped lang="scss">
  @import '../../assets/css/base';
  .container {
      padding: 0 0 0 (6rem / $rem);
       > .tv-container:last-child{
          margin-bottom:0;
          padding-bottom: (24rem / $rem);
      }
  }
  .tag-name {
      font-size: (16rem / $rem);
      color: $maincolor;
      line-height: (19rem / $rem);
      text-align: left;
      margin: (12rem / $rem) 0 (12rem / $rem) (16rem / $rem);
  }
  .tv-container {
      flex-wrap: wrap;
      -webkit-flex-wrap: wrap;
      margin-bottom: (42rem / $rem);
      .bigger-tv{
          width:auto;
          max-width: (140rem / $rem);
      }
       > span:active{
         background: $maincolor;
         color: #fff;
      }
  }
  .tv {
      width: (88rem / $rem);
      height: (40rem / $rem);
      line-height: (18rem / $rem);
      padding: (11rem / $rem) 0;
      background: #fff;
      margin: 0 (4rem / $rem) (5rem / $rem)  0;
      border-radius: 2px;
  }
</style>
