<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {};
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      const doc = window.document;
      const docEl = doc.documentElement;
      let tid = '';

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

      this.refreshRem(docEl);
      document.addEventListener('touchstart', () => {}, true);
    },
    refreshRem(docEl = window.document.documentElement) {
      const docE = docEl;
      let width = docE.getBoundingClientRect().width;
      if (width > 520) { // 最大宽度
        width = 520;
      }
      const rem = width / 20; // 将屏幕宽度分成20份， 1份为1rem
      docE.style.fontSize = `${rem}px`;
    },
  },
};
</script>

<style lang="scss">
@import 'assets/css/base';
* { 
  box-sizing: border-box;
  /*禁用文字选中*/
  -webkit-touch-callout:none;
  -webkit-user-select:none;
  user-select:none;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}

html,
body,
{
  height: 100%;
  padding: 0;
  margin: 0;
  background: #f3f2f1;
  position: relative;
}
body,html,p,h3{
  margin:0;
  padding:0;
}
body{
  margin:0 auto;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: (14rem / $rem);
  padding-bottom: (40rem / $rem);
}
</style>
