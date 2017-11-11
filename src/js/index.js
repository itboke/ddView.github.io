/*
 * @coder: hzl
 * @description: 组件构建
 * @params:
 * @return: miniView
*/
import miniTab from './components/tab';
import tabItem from './components/tabItem';
import miniModal from './components/modal';
import miniLoading from './components/loading';
import miniButtom from './components/button';
import miniOverlay from './components/overlay';
import miniSwitch from './components/switch';
import miniCarousel from './components/carousel';
import miniCountdown from './components/countdown';
import miniPageScrolling from './components/page-scrolling';
import miniSmsVerification from './components/sms-verification';
import miniAlert from './components/plugins/alert';
import miniCounter from './components/counter';
import miniRadio from './components/radio';
import miniCategory from './components/category';
import miniMenubar from './components/menubar';
import miniScroller from './components/scroller';
import '../css/index.scss';
const components = {
  miniTab: miniTab,
  tabItem: tabItem,
  miniModal: miniModal,
  miniButton: miniButtom,
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
  miniScroller: miniScroller
};
const plugins = {
  miniAlert: miniAlert
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
  tabItem: tabItem,
  miniModal: miniModal,
  miniButton: miniButtom,
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
  miniScroller: miniScroller
};
