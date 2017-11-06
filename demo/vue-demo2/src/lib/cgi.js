import {ajax,jsonp} from './ajax.js';

export default {
	//host: 'http://api.live.nagezan.net/cgi-bin/',
	host: 'http://116.62.28.97:9092/', //测试地址
	defaultHead:'http://oneshow.img.nagezan.net/live/471b9a01-d1d2-4f16-bbde-b2cc34186ee4.png',
	//defaultHead:'http://static.live.nagezan.net/live/fb284641-a4a6-4a2f-b596-abfb49ba037c.png', 小爱默认头像
	init(){
	  const doc = window.document;
	  let docEl = doc.documentElement;
	  let tid = null;

	  window.addEventListener('resize', () => {
	    clearTimeout(tid);
	    tid = setTimeout(this.refreshRem, 300);
	  }, false);

	  window.addEventListener('pageshow', (e) => {
	    if (e.persisted) {
	      clearTimeout(tid);
	      tid = setTimeout(this.refreshRem, 300);
	    }
	  }, false);

	  this.refreshRem();
	},
	refreshRem(){
	  let docEl= window.document.documentElement;
	  let width = docEl.getBoundingClientRect().width;
	  // 最大宽度
	  if (width > 520) {
	    width = 520;
	  }
	  // 将屏幕宽度分成20份， 1份为1rem
	  const rem = width / 20;
	  docEl.style.fontSize = rem + 'px';
	},
	resetTime (time) {
	  time = parseInt(time) + ''
	  if (time.length < 2) {
	    return '0' + time
	  } else {
	    return time
	  }
	},
	remainInterval(remain) {
	  remain.h = this.resetTime(remain.time / (60 * 60))
	  remain.m = this.resetTime(remain.time % (60 * 60) / 60)
	  remain.s = this.resetTime(remain.time % 60)

	  if (remain.h === '00' && remain.m === '00' && remain.s === '00') {
	    /* global location:true */
	    location.reload()
	  }
	  remain.time--
	},
	addLazy:function(list){
	  var header='';
	  //图片懒加载
	  for(var i = 0 ; i < list.length ; i ++) {
	    header = list[i].avatar;
	    list[i].head = {
	      src: header,
	      error: 'http://oneshow.img.nagezan.net/live/471b9a01-d1d2-4f16-bbde-b2cc34186ee4.png',
	      loading: 'http://oneshow.img.nagezan.net/live/471b9a01-d1d2-4f16-bbde-b2cc34186ee4.png'
	    }
	    
	  }
	  return list;
	},
	get(url,params,callback,header){
		ajax('get',url,params)
			.then( (res)=>{
				callback(res);
			})
			.catch( (error)=> {
				console.log(error);
			});
	},
	/*
	 header 参数为"Content-type", "application/x-www-form-urlencoded" 为可选参数
	 请求头，这个不同的接口可能会不同，可能的参数有  text/plain，application/x-www-form-urlencoded，
	 */
	post(url,params,callback,header){
		ajax('post',url,params,header)
			.then( (res)=>{
				callback(res);
			})
			.catch( (error)=> {
				console.log(error);
			});
	},
	jsonp(url,params,callback){
		jsonp(url,params).then( (res)=> {
		 	callback(res);
		})
	},
	list:[
		   	{nick:'虚位以待',uid:'19541200',exp:'0',data2:'8876',avatar:"http://oneshow.img.nagezan.net/live/471b9a01-d1d2-4f16-bbde-b2cc34186ee4.png"},
		   	{nick:'虚位以待',uid:'19541200',exp:'0',data2:'8876',avatar:"http://oneshow.img.nagezan.net/live/471b9a01-d1d2-4f16-bbde-b2cc34186ee4.png"},
		   	{nick:'虚位以待',uid:'19541200',exp:'0',data2:'8876',avatar:"http://oneshow.img.nagezan.net/live/471b9a01-d1d2-4f16-bbde-b2cc34186ee4.png"},
		   	{nick:'虚位以待',uid:'19541200',exp:'0',data2:'8876',avatar:"http://oneshow.img.nagezan.net/live/471b9a01-d1d2-4f16-bbde-b2cc34186ee4.png"},
		   	{nick:'虚位以待',uid:'19541200',exp:'0',data2:'8876',avatar:"http://oneshow.img.nagezan.net/live/471b9a01-d1d2-4f16-bbde-b2cc34186ee4.png"},
		   	{nick:'虚位以待',uid:'19541200',exp:'0',data2:'8876',avatar:"http://oneshow.img.nagezan.net/live/471b9a01-d1d2-4f16-bbde-b2cc34186ee4.png"},
		   	{nick:'虚位以待',uid:'19541200',exp:'0',data2:'8876',avatar:"http://oneshow.img.nagezan.net/live/471b9a01-d1d2-4f16-bbde-b2cc34186ee4.png"},
		   	{nick:'虚位以待',uid:'19541200',exp:'0',data2:'8876',avatar:"http://oneshow.img.nagezan.net/live/471b9a01-d1d2-4f16-bbde-b2cc34186ee4.png"},
		   	{nick:'虚位以待',uid:'19541200',exp:'0',data2:'8876',avatar:"http://oneshow.img.nagezan.net/live/471b9a01-d1d2-4f16-bbde-b2cc34186ee4.png"},
		   	{nick:'虚位以待',uid:'19541200',exp:'0',data2:'8876',avatar:"http://oneshow.img.nagezan.net/live/471b9a01-d1d2-4f16-bbde-b2cc34186ee4.png"}

	]
}
