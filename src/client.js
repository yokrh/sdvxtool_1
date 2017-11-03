import './style/app.css';
import './image/icon-search.png';
import './image/icon-link.png';
import './image/icon-twitter.png';
import './image/icon-weekly.png';

import Vue from 'Vue'
import appHeader from './component/appHeader.vue'
import appContent from './component/appContent.vue'

var vm = new Vue({
  el: '#app',
  components: {
    'app-header': appHeader,
    'app-content': appContent,
  },
  template: '\
    <div>\
      <app-header @change-app-content-type="changeAppContentType"></app-header>\
      <app-content :app-content-type="appContentType"></app-content>\
    </div>\
  ',
  data: {
    appContentType: 'trackSearch'
  },
  methods: {
    changeAppContentType: function(newAppContentType){
      this.appContentType = newAppContentType;
    }
  }
});
