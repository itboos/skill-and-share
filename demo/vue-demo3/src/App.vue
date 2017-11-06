<template>
  <div id="app">
   <!--  <img src="./assets/logo.png"> -->
    <hello></hello>
    <h3>这是测试啊</h3>
  </div>
</template>

<script>
 /* eslint-disable  */
import MD5 from 'md5';
import axios from 'axios';
import Hello from './components/Hello';
import CGI from './lib/cgi';

export default {
  name: 'app',
  components: {
    Hello,
  },
  data() {
    return {
      CGI: 'http://api.live.nagezan.net',
      CGI2: 'http://api2.zg.xiaoyoureliao.net',
      remainTime: {
        time: 0,
        h: '0',
        m: '0',
        s: '0',
      },
    };
  },
  created() {
    CGI.init();
    this.getData();
  },
  methods: {
    getData() {
     var timeStmp = parseInt(new Date().getTime()/1000)+300;
     let key = MD5(`lb_rljxs_1300,${timeStmp},a2915e518ba60169f77`);
     let stream_id = 'lb_rljxs_1300';
     console.log('字符串:',`lb_rljxs_1300,${timeStmp},a2915e518ba60169f77`);
     console.log(MD5(`lb_rljxs_1300,${timeStmp}',a2915e518ba60169f77`));
     const url = `http://live.gslb.letv.com/gslb?stream_id=${stream_id}&tag=live&ext=m3u8&sign=live_photerne&p1=0&p2=00&p3=001&splatid=1004&ostype=andriod&hwtype=un&platid=10&playid=1&termid=2&pay=0&expect=3&format=1&tm=${timeStmp}&key=${key}&jsonp=?`
     console.log(url);
      axios.get('http://api2.live.nagezan.net/v1/c5/get_double_exp.json', {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
        .then((resp) => {
          /*eslint-disabled no-console*/
          console.log(resp);
        })
        .catch((error) => {
          // console.log(error);
        });
    },
  },
};
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
  color: #2c3e50;
  margin-top: 60px;
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
#loading {
    position: fixed;
    top: 10rem;
    left: 50%;
    margin-left: -35px;
    width: 70px;
    z-index: 9999;
}
#loading img:nth-child(2){
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    animation: loading 1s linear infinite;
}

@keyframes loading {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

</style>
<style lang="scss">
   @import './lib/function';
   h3{
      font-size: rem(40);
    }
</style>

