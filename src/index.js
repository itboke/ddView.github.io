/*
 * @coder: hzl
 * @description: 组件构建
 * @params:
 * @return: miniView
*/
import miniTab from './components/tab';
import miniModal from './components/modal';
import miniLoading from './components/loading';
import miniButton from './components/button';
import miniOverlay from './components/overlay';
import miniSwitch from './components/switch';
import miniCarousel from './components/carousel';
import miniCountdown from './components/countdown';
import miniPageScrolling from './components/page-scrolling';
import miniSmsVerification from './components/sms-verification';
import miniAlert from './components/plugins/alert';
import miniLazyload from './components/plugins/lazyload';
import miniCounter from './components/counter';
import miniRadio from './components/radio';
import miniCategory from './components/category';
import miniMenubar from './components/menubar';
import miniScroller from './components/scroller';
import miniDistpicker from './components/distpicker';
const components = {
  miniTab: miniTab,
  miniModal: miniModal,
  miniButton: miniButton,
  miniCounter: miniCounter,
  miniLoading: miniLoading,
  miniOverlay: miniOverlay,
  miniSwitch: miniSwitch,
  miniRadio: miniRadio,
  miniCategory: miniCategory,
  miniCarousel: miniCarousel,
  miniCountdown: miniCountdown,
  miniPagescrolling: miniPageScrolling,
  miniSmsVerification: miniSmsVerification,
  miniMenubar: miniMenubar,
  miniScroller: miniScroller,
  miniDistpicker: miniDistpicker
};
const plugins = {
  miniAlert: miniAlert,
  miniLazyload: miniLazyload
};

const install = function(Vue) {
  if (install.installed) return;

  Object.keys(components).forEach((key) => {
    Vue.component(key, components[key]);
  });

  Object.keys(plugins).forEach((key) => {
    Vue.use(plugins[key]);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

module.exports = {
  install,
  version: '0.0.1',
  miniTab: miniTab,
  miniModal: miniModal,
  miniButton: miniButton,
  miniCounter: miniCounter,
  miniLoading: miniLoading,
  miniOverlay: miniOverlay,
  miniSwitch: miniSwitch,
  miniRadio: miniRadio,
  miniCategory: miniCategory,
  miniCarousel: miniCarousel,
  miniCountdown: miniCountdown,
  miniPagescrolling: miniPageScrolling,
  miniSmsVerification: miniSmsVerification,
  miniMenubar: miniMenubar,
  miniScroller: miniScroller,
  miniDistpicker: miniDistpicker
};
