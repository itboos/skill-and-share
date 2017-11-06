import axios from 'axios';
import jsonp from 'jsonp';

const state = {
  axios,
  jsonp,
  timeId: '',
  homePath: '/',
  dealData(str) {
    return decodeURIComponent(atob(str).split('').map((c) => {
      const j = `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`;
      return j;
    }).join(''));
  },
};

export default state;
