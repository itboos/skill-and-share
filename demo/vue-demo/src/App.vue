<template>
  <div id="app">
  <div id="test">
    
  </div>
    <top></top>
    <rank :list="anchors"></rank>
   </div>
</template>

<script>

import Hello from './components/Hello';
import Top from './components/Top';
import Rank from './components/Rank';
import axios from 'axios';
import CGI  from './lib/cgi';

export default {
  name: 'app',
  components: {
    Hello,
    Top,
    Rank
  },
  data(){
    return {
      anchors:[
        {uid:'12288781',name:'主播1',headUrl:'http://oneshow.img.aaaa.net/live/471b9a01-d1d2-4f16-bbde-b2cc34186ee4.png',isFollow:true},
        {uid:'12288781',name:'主播2',headUrl:'http://oneshow.img.aaaa.net/live/471b9a01-d1d2-4f16-bbde-b2cc34186ee4.png',isFollow:false},
        {uid:'12288781',name:'主播3',headUrl:'http://oneshow.img.aaaa.net/live/471b9a01-d1d2-4f16-bbde-b2cc34186ee4.png',isFollow:false},
        {uid:'12288781',name:'主播4',headUrl:'http://oneshow.img.aaaa.net/live/471b9a01-d1d2-4f16-bbde-b2cc34186ee4.png',isFollow:false},
        {uid:'12288781',name:'主播5',headUrl:'http://oneshow.img.aaaa.net/live/471b9a01-d1d2-4f16-bbde-b2cc34186ee4.png',isFollow:false},
        {uid:'12288781',name:'主播6',headUrl:'http://oneshow.img.aaaa.net/live/471b9a01-d1d2-4f16-bbde-b2cc34186ee4.png',isFollow:false},
      ]
    }
  },
  created(){
    CGI.init();
    this.getData4();
  },
  methods:{
    getData4(){
        var params={
          data:{
              //uid:this.UserInfo.uid, 
              uid:13666316,
              tuid: [12288781,19795461,17579438,17511109,18450440,11460051],
            }
        };
        var params2= {campaign:"campaign20170125"};
        var url='http://apih5.aaaa.net/v1/c4/get_gift_conf.json';
        var url2='https://mma.qq.com/mqqactivity/cgi/starmap/get_online';
        var url3='http://api2.live.aaaa.net/v1/c5/get_double_exp.json';  //get 
        var url4='http://api.voss2.aaaa.net:9090/v1/voss/post/double_exp_billboard';
        var url5='http://116.62.28.97:9093/v1/xiaoyou/voss/get_relation';  // post
        var url6='http://api.live.aaaa.net/cgi-bin/get_top_list';  // post
        var url7 = 'http://live.gslb.letv.com/gslb?stream_id=lb_rljxs_1300&tag=live&ext=m3u8&sign=live_photerne&platid=10&playid=1&termid=2&pay=0&tm=1503558153&p1=0&p2=00&p3=001&splatid=1003&ostype=andriod&hwtype=un&platid=10&playid=1&termid=2&pay=0&ostype=andriod&hwtype=un&key=7fbbcff00fc203dffc34fed863e23975&expect=3&format=1';

        //jsonp(url,{callback: 'render'}).then(res=>{console.log(res)})
        //jsonp(url2,{method: 'encode',nextWeek:0},{jsonp: 'callback'}).then(res=>{console.log(res)})
        //jsonp(url3,{nextWeek:0},{jsonp: 'callback'}).then(res=>{console.log(res)});
        // CGI.jsonp(url3).then( (res)=> {
        //   console.log(res);
        // })
        CGI.jsonp(url7,(resp)=>{
          console.log('jsonp....');
          console.log(resp);
        });
        // CGI.post('http://api.live.aaaa.net/cgi-bin/get_top_list',params2,(resp)=>{
        //   //console.log(resp);
        // },'text/plain');
    },
    getData3(){
      axios.get('http://api2.live.aaaa.net/v1/c5/get_double_exp.json',{
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
        .then(function (resp) {
          console.log(resp);
        })
        .catch(function (error) {
          console.log(error);
        })
    },
    getData(){
      console.log(axios.defaults);
      axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
      axios.post('http://api.live.aaaa.net/cgi-bin/get_top_list', {
            'campaign':"campaign20170125"
        },{ //POST 请求必须加上这个配置
           headers:{'Content-Type':'application/x-www-form-urlencoded'}
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      
     
    },
    getData2(){
      var params={
          data:{ 
            begin_time: '2017-02-27 18:30:00',
            end_time:  '2017-03-06 00:00:00' 
          },
          uid:10004
        };

      axios.post('http://api.voss2.aaaa.net:9090/v1/voss/post/double_exp_billboard', params
         ,{ //设置请求头，这个不同的接口可能会不同，可能的参数有  text/plain，application/x-www-form-urlencoded，
           headers:{'Content-Type':'text/plain'}
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  computed:{

  }
}
</script>

<style>
  body,html,p,h3{
    margin:0;
    padding:0;
  }
  body{
    background:#fff;
    max-width: 520px;
    margin:0 auto;
  }
  img {
    width:100%;
    vertical-align: top;
  }
  a{
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
    background-color: transparent;
    display: inline-block;
  }
  .one-line{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
  [v-cloak]{
    display: none;
  }
  .refresh {
      position: fixed;
      width: 2.1rem;
      right: 0;
      top: 15rem;
      z-index: 5;
  }
</style>
<style lang="scss">
   @import './lib/function';

    #test {
      width:100%;
      height:300px;
      color:red;
      font-size: rem(20);
     
      background-size: 100% 100%;
    }
    #test  h3{
      font-size: rem(18px,18.75);
    }
      
</style>
