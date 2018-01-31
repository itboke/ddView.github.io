<script>
import lazyImg from '../../image/lazyload.png';
function loadImageAsync(item, resolve, reject) {
  let image = new Image()
  image.src = item.value;
  image.onload = function () {
    resolve({
      src: image.src
    });
  };
  image.onerror = function (e) {
    reject(e);
  }
}
class LazyImage {
  constructor(el, target) {
    this.limit = 10;
    this.loading = false;
    this.error = false;
    this.loaded = false;
    this.target = target;
    this.el = el;
    this.update();
  }
  update() {
    const top = Math.ceil(this.el.getBoundingClientRect().top);
    const docHeight = Math.ceil(document.documentElement.clientHeight);
    if (top + this.limit < docHeight) {
      this.el.src = this.target.value;
      this.loaded = true;
    }
  }
  checkInView() {
    const top = Math.ceil(this.el.getBoundingClientRect().top);
    const docHeight = Math.ceil(document.documentElement.clientHeight);
    if (top + this.limit < docHeight) return true;
    return false;
  }
  load() {
    loadImageAsync(this.target, data => {
      this.loaded = true;
      this.error = false;
      this.el.src = data.src;
    }, err => {
      this.loaded = false;
      this.error = true;
      console.log(err);
    });
  }
}
const miniLazyload = {};
miniLazyload.install = function (Vue, options = {}) {
  function throttle (action, delay) {
    let timeout = null;
    let lastRun = 0;
    return function () {
      if (timeout) {
          return;
      }
      let elapsed = Date.now() - lastRun;
      let context = this;
      let args = arguments;
      let runCallback = function () {
              lastRun = Date.now();
              timeout = false;
              action.apply(context, args);
          }
      if (elapsed >= delay) {
          runCallback();
      }
      else {
          timeout = setTimeout(runCallback, delay);
      }
    }
  }
  var lazy = {
    scrollNode: null,
    ListenerQueue: [],
    scrollParent: function(el) {
      if (!el instanceof HTMLElement) {
        this.scrollNode = window;
      }
      let parent = el;
      if (parent === document.body || parent === document.documentElement) {
          this.scrollNode = window;
      }
      if (!parent.parentNode) {
          this.scrollNode = window;
      }
      this.overflow(parent.parentNode, 'overflow-y');
    },
    overflow: function(parentNode, prop) {
      if (/auto/.test(getComputedStyle(parentNode, null).getPropertyValue(prop))) {
        this.scrollNode = parentNode;
        this.scrollNode.addEventListener('scroll',  this.lazyLoadHandler.bind(this))
      } else {
        if (parentNode.parentNode) {
          this.overflow(parentNode.parentNode, prop);
        } else {
          this.scrollNode = window;
        }
      }
    },
    add: function(el, target, vnode) {
      Vue.nextTick(() => {
        if (!this.scrollNode) {
          this.scrollParent(el);
        }
        el.src = lazyImg;
        const newListener = new LazyImage(el, target);
        this.ListenerQueue.push(newListener);
      })
    },
    lazyLoadHandler: throttle(() => {
      let catIn = false;
      lazy.ListenerQueue.forEach(listener => {
          if (listener.loaded) return;
          catIn = listener.checkInView();
          catIn && listener.load();
      })
    }, 200)
  };
  Vue.directive('lazyload', {
    bind: lazy.add.bind(lazy),
    // componentUpdated: lazy.lazyLoadHandler.bind(lazy)
  });
};
export default miniLazyload;
</script>
