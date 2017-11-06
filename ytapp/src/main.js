// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/store';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
/*eslint-disable */
window.onblur = function() {
	
};
window.onfocus = function() {
  
}
// var hidden, state, visibilityChange; 
// if (typeof document.hidden !== "undefined") {
// 	hidden = "hidden";
// 	visibilityChange = "visibilitychange";
// 	state = "visibilityState";
// } else if (typeof document.webkitHidden !== "undefined") {
// 	hidden = "webkitHidden";
// 	visibilityChange = "webkitvisibilitychange";
// 	state = "webkitVisibilityState";
// }

// // 添加监听器，在title里显示状态变化
// document.addEventListener(visibilityChange, function() {
// 	document.title = document[state];
// }, false);

// // 初始化
// document.title = document[state];
