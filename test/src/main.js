import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import webSee from '../../packages/core/src';
// import performance from '../../packages/performance/src';
// import recordscreen from '../../packages/recordscreen/src';

// import webSee from '@websee/core';
// import performance from '@websee/performance';
// import recordscreen from '@websee/recordscreen';

Vue.use(webSee, {
  dsn: 'http://localhost:8080/reportData',
  apikey: 'abcd',
  userId: '123',
  disabled: false,
  recordScreenTypeList: [],
  maxBreadcrumbs: 20,
  throttleDelayTime: 10,
  silentXhr: false,
  silentFetch: false,
  skeletonProject: false,
  silentWhiteScreen: false,
  silentRecordScreen: false,
  silentHistory: false,
  silentError: false,
  silentUnhandledrejection: false,
  silentHashchange: false,
  silentPerformance: true,
  repeatCodeError: true,

  handleHttpStatus(data) {
    console.log('data', data);
    let { url, response } = data;
    // code为200，接口正常，反之亦然
    let { code } = typeof response === 'string' ? JSON.parse(response) : response;
    if (url.includes('/getErrorList')) {
      return code === 200 ? true : false;
    } else {
      return true;
    }
  },
});
// webSee.use(performance);
// webSee.use(recordscreen, { recordScreentime: 15 });

Vue.use(ElementUI, { size: 'mini' });
Vue.config.productionTip = false;

setTimeout(() => {
  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app');
}, 2000);
