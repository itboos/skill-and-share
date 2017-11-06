/*
 * @Author: zhongdonglin 
 * @Date: 2017-08-12 16:30:30 
 * @Last Modified by: zhongdonglin
 * @Last Modified time: 2017-09-27 16:44:14
 */
 (function(win){
     init();
     function init(){
         var doc = window.document;
         var docEl = doc.documentElement;
         var tid = null;
         window.addEventListener('resize', function(){
           clearTimeout(tid);
           tid = setTimeout(refreshRem, 300);
         }, false);

         window.addEventListener('pageshow', function(e){
           if (e.persisted) {
             clearTimeout(tid);
             tid = setTimeout(this.refreshRem, 300);
           }
         }, false);

       refreshRem();
     }
     function refreshRem(){
       var docEl= window.document.documentElement;
       var width = docEl.getBoundingClientRect().width;
       // 最大宽度
       if (width > 520) {
         width = 520;
       }
       // 将屏幕宽度分成20份， 1份为1rem
       var rem = width / 20;
       docEl.style.fontSize = rem + 'px';
     }
     document.addEventListener("touchstart", function(){}, true);

 })(window);
 // https://github.com/mzabriskie/axios
 document.addEventListener("touchstart", function(){}, true);
 var vm=new Vue({
   el:'#app',
   data:{
     CGI: 'http://116.62.28.97:9012', //测试接口 
     list: [
       {head: './imgs/user1.png',name: '塞纳河绊1',uid: '17909542'},
       {head: './imgs/user1.png',name: '塞纳河绊2',uid: '17909542'},
       {head: './imgs/user1.png',name: '塞纳河绊3',uid: '17909542'},
       {head: './imgs/user1.png',name: '塞纳河绊4',uid: '17909542'},
       {head: './imgs/user1.png',name: '塞纳河绊5',uid: '17909542'},
       {head: './imgs/user1.png',name: '塞纳河绊6',uid: '17909542'}
     ], 
   },
   created: function(){
     //this.getData();
   },
   methods:{
     getData: function(){
       var _this = this;
       $.getJSON(
         this.CGI+'/v1/c6/get_card_activity.json?callback=?', {
           
         },
         function(res) {
           if (res.error_code === 1) {
               console.log(res);
           }else{

           } 
         }
       );
     },
     
   },
  
 });
