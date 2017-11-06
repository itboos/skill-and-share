<template>
  <div class="list">
    <div class="title">
      <span>天天电视</span><span>频道列表</span>
    </div>
    <p class="collect-info">★★★ 快快收藏本网站，精彩内容不再错过 ★★★</p>
    <ListItem v-for="(row,index) in tvArr" :list="row"
     :key="row.tagName" >
    </ListItem>
  </div>
</template>
<script>
  import ListItem from '@/components/lib/list-item';

  export default {
    name: 'list',
    data() {
      return {
        listArr: [
          { tagName: '卫视直播', tvs: [{ tvname: '浙江卫视', id: 123 }, { tvname: '湖南卫视', id: '123' }, { tvname: '广东卫视', url: 'abc3' }, { tvname: '北京卫视', url: 'abc4' }, { tvname: '湖南卫视', url: 'abc2' }, { tvname: '广东卫视3', url: 'abc3' }, { tvname: '北京卫视4', url: 'abc4' }] },
          { tagName: '央视频道', tvs: [{ tvname: '浙江卫视2', url: 'abc' }, { tvname: '湖南卫视2', url: 'abc2' }, { tvname: '广东卫视', url: 'abc3' }, { tvname: '北京卫视', url: 'abc4' }] },
          { tagName: '体育频道', tvs: [{ tvname: '浙江卫视', url: 'abc' }, { tvname: '湖南卫视', url: 'abc2' }, { tvname: '广东卫视', url: 'abc3' }, { tvname: '北京卫视', url: 'abc4' }] },
          { tagName: '当前热播', tvs: [{ tvname: '浙江卫视', url: 'abc' }, { tvname: '湖南卫视', url: 'abc2' }, { tvname: '广东卫视', url: 'abc3' }, { tvname: '北京卫视', url: 'abc4' }] },
        ],
        tvArr: [],
      };
    },
    watch: {},
    computed: {},
    mounted() {
      this.getData();
    },
    methods: {
      getData() {
        const self = this;
        this.$store.dispatch('get', {
          //path: 'http://121.40.176.178:3553/v3/h5/get_home_page_data.php',
          path: 'http://43.246.209.135:9090/epg_tvnow_h5/get_tvs_of_all_tag',
          params: {},
          callback(data) {
            //console.log(data);
            self.tvArr = data;
          },
        });
      },
    },
    components: {
      ListItem,
    },
  };
</script>

<style scoped lang="scss">
  @import "../assets/css/base";
  .list {
    background: #f3f2f1;
  }
  .collect-info {
    background: #fff;
    font-size: (11rem / $rem);
    padding: 4px 0 7px;
  }
  .title {
    font-size: (18rem / $rem );
    text-align: center;
    line-height: (18rem / $rem);
    padding: (14rem / $rem) 0;
    padding-left: (16rem / $rem);
    background: $maincolor;
    color: #fff;
    span {
       &:nth-child(1) {
        position: relative;
        padding-right: (12rem / $rem);
        margin-right: (12rem /$rem);
        &::after {
          display: inline-block;
          content: "";
          width:4px;
          height:4px;
          background: #fff;
          border-radius: 999rem;
          position: absolute;
          right: 0;
          top: (7rem / $rem);
        }
      }
    }
   
  }
</style>
