/* eslint-disable no-console */
// import base64 from 'base-64';

const actions = {
  get({ state }, params) {
    // path、params、callback
    state.axios.get(
      params.path,
      {
        params: params.params,
      },
    ).then((resp) => {
      if (resp.data.success || resp.success) {
        const dataArr = resp.data.data.split('');
        dataArr.splice(0, 1);
        dataArr.splice(11, 2);
        params.callback(JSON.parse(state.dealData(dataArr.join(''))));
      } else {
        console.log(resp.data.errorMessage);
      }
    });
  },
  jsonp({ state }, params) {
    state.jsonp(
      params.path,
      params.params,
      (err,data) => {
        if (err) {
          console.log(err);
        } else {
          // params.callback(JSON.parse(data));
          params.callback(data);
        }
      },
    );
  },
  loadScript(c, params) {
    // src、callback
    const js = document.createElement('script');
    js.setAttribute('src', params.src);
    const head = document.getElementsByTagName('head')[0] || document.documentElement;
    head.appendChild(js);

    js.onload = params.callback;
  },
};

export default actions;
