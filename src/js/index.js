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
import miniCarousel from './components/carousel';
import miniCountdown from './components/countdown';
import miniPageScrolling from './components/page-scrolling';
import miniSmsVerification from './components/sms-verification';
import miniAlert from './components/plugins/alert';
import '../css/index.scss';
const components = {
  miniTab: miniTab,
  tabItem: tabItem,
  miniModal: miniModal,
  miniButton: miniButtom,
  miniLoading: miniLoading,
  miniOverlay: miniOverlay,
  miniCarousel: miniCarousel,
  miniCountdown: miniCountdown,
  miniPagescrolling: miniPageScrolling,
  miniSmsVerification: miniSmsVerification
};
const plugins = {
  miniAlert: miniAlert
};
const miniView = {
  install: function(Vue) {
    Object.keys(components).forEach((key) => {
      Vue.component(key, components[key]);
    });
    Object.keys(plugins).forEach((key) => {
      Vue.use(plugins[key]);
    });
  }
};
export default miniView;
