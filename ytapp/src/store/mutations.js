/* eslint-disable no-console */
/*global Vue:true*/
import Vue from 'vue';

const mutations = {
  setTimeId(state, params) {
    Vue.set(state, params.key, params.value);
  },
};
export default mutations;
