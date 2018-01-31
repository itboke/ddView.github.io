<template>
  <div class="mini-carousel" id="mini-carousel">
    <div class="inner-content"
        :class="{ 'full-slider': isFullscreen }"
        :style="{ top: mgTop + 'px' }"
    >
      <div
        class="slider-box"
        @touchstart="touchStart($event)"
        @touchmove="touchMove($event)"
        @touchend="touchEnd($event)"
        :style="{ transform: 'translate3d(' + sliderLeft + 'px,0,0)', width: eleWidth * sliderLength + 'px', height: targetHeight }"
      >
        <div class="slider-item" v-for="(item, index) in images" v-bind:key="index" :style="{ height: targetHeight }"
          @click.stop="imageTap($event)"
        >
          <img :src="item" :width="eleWidth" height="100%" />
        </div>
      </div>
      <div class="slider-circle" v-if="images.length > 1">
        <span v-for="(item, index) in images" v-bind:key="index" :class="{ 'active': index == current }"></span>
      </div>
      <div class="large-image" v-if="magnifier" v-show="largeShow" @click.stop="himinienLargeImage">
        <img :src="largeImgSrc" :style="bigImage" @touchstart="readyToStart($event)"
              @touchmove="runningToMove($event)" @touchend="cacheEnd($event)">
      </div>
    </div>
    <div class="full-screen" v-show="isFullscreen" @click.stop="closeFullscreen"></div>
    <slot name="fixed"></slot>
  </div>
</template>
<script>
  export default {
    props: {
      images: { // 图片的地址 数组
        type: Array,
        default: () => {
          return [];
        }
      },
      magnifier: { // 是否允许图片使用放大镜效果，图片如果有跳转，不要开启该效果, 默认关闭
        type: Boolean,
        default: false
      },
      targetLink: Array, // 图片的相对跳转地址，目标type: reflesh为页面刷新, vueRoute为采用vueRouter路由系统
      autoPlay: {
        type: Boolean,
        default: false
      },
      fullscreen: { // 是否开启全屏显示效果
        type: Boolean,
        default: false
      },
      targetHeight: String // 滚动图片的高度
    },
    data() {
      return {
        startX: 0, // 触摸点开始位置 X,Y
        startY: 0,
        position: {
          x: '',
          y: ''
        },
        marginLeft: 0, // 滚动容器距离左边的距离
        marginTop: 0, // 滚动容器距离顶边的距离
        initLeft: 0,
        sliderLeft: 0,
        sliderLength: 0,
        radio: 0.2,
        current: 0,
        eleWidth: 0,
        eleHeight: 0,
        originWidth: 0,
        originHeight: 0,
        bigImage: {
          left: '0px',
          top: '0px',
        },
        largeImgSrc: '',
        largeShow: false,
        weldWidth: 0,
        weldHeight: 0,
        floatStartX: 0,
        floatStartY: 0,
        rx: 0,
        ry: 0,
        autoTimer: null,
        isFullscreen: false,
        mgTop: 0,
        touchDistance: '',
        touchVector: null
      };
    },
    watch: {
      images(images) {
        this.update()
      }
    },
    mounted() {
      const self = this
      self.update()
      window.onresize = self.throttle(() => {
        that.eleWidth = (document.documentElement.clientWidth || document.body.clientWidth) - self.$el.offsetLeft * 2;
      }, 500);
    },
    methods: {
      throttle(fn, interval) {
        var _self = fn,            // 保存需要被延迟执行的函数引用
            timer,                // 计时器
            firstTime = true;    // 是否第一次调用
        return function() {
            var args = arguments,
              _this = this;
            if(firstTime) {        // 如果是第一次调用, 不需要延迟执行
              _self.apply(_this, args);
              return firstTime = false;
            }
            if(timer) {            // 如果定时器还在, 说明前一次延迟执行还未完成
              return false;
            }
            timer = setTimeout(function() {
              clearTimeout(timer);
              timer = null;
              _self.apply(_this, args);
            }, interval || 500);
        };
      },
      update() {
        this.eleWidth = this.$el.clientWidth
        this.eleHeight = this.$el.offsetHeight
        this.sliderLength = this.images.length
        this.marginLeft = this.$el.offsetLeft
        this.marginTop = this.$el.offsetTop
        if (this.autoPlay) {
          this.autoSwiping() // 自动滑动
        }
      },
      closeFullscreen() {
        this.isFullscreen = false;
        this.mgTop = 0;
      },
      handleMiddle() {
        if (this.isFullscreen) {
          this.closeFullscreen();
          return false;
        }
        const pageH = document.querySelector('body').clientHeight;
        this.mgTop = Math.floor(pageH/2) - (this.$el.clientHeight && Math.floor(this.$el.clientHeight / 2));
        this.isFullscreen = true;
      },
      autoSwiping() {
        this.autoTimer = setInterval(() => {
          if (this.current >= this.sliderLength - 1) {
            this.current = -1;
          }
          this.current++;
          this.sliderLeft = -(this.current * this.eleWidth);
        }, 2500);
      },
      _getDistance(xLen,yLen) {
        return Math.sqrt(xLen * xLen + yLen * yLen);
      },
      touchPosition(e) {
        const touches = e.changedTouches;
        this.position.x = touches[0].clientX;
        this.position.y = touches[0].clientY;
      },
      touchStart(e) {
        if (this.autoTimer && this.autoPlay) clearInterval(this.autoTimer);
        this.touchPosition(e);
        this.startX = this.position.x;
        this.startY = this.position.y;
        this.initLeft = this.sliderLeft;
        // 两点触摸
        if (e.touches.length > 1) {
          let point2 = e.touches[1];
          let xLen = Math.abs(point2.clientX - this.startX);
          let yLen = Math.abs(point2.clientY - this.startY);
          this.touchDistance = this._getDistance(xLen, yLen);
          this.touchVector = {
            x: point2.pageX - this.startX,
            y: point2.pageY - this.startY
          };
        }
      },
      touchMove(e) {
        if (e.touches.length > 1) {
          let xLen = Math.abs(e.touches[0].pageX - e.touches[1].pageX);
          let yLen = Math.abs(e.touches[1].pageY - e.touches[1].pageY);
          let touchDistance = this._getDistance(xLen,yLen);
          if(this.touchDistance) {
            let pinchScale = touchDistance / this.touchDistance;
              // this._emitEvent('onPinch',{scale:pinchScale - this.previousPinchScale});
              // this.previousPinchScale = pinchScale;
          }
          if(this.touchVector) {
            let vector = {
              x: e.touches[1].pageX - e.touches[0].pageX,
              y: e.touches[1].pageY - e.touches[0].pageY
            };
            this.touchVector.x = vector.x;
            this.touchVector.y = vector.y;
          }
        } else {
          this.touchPosition(e);
          const moveX = this.position.x - this.startX;
          const moveY = this.position.y - this.startY;
          if (Math.abs(moveY) < Math.abs(moveX)) {
            e.preventDefault();
            this.sliderLeft = this.initLeft + moveX;
          }
        }
      },
      touchEnd(e) {
        this.touchPosition(e);
        const moveX = this.position.x - this.startX;
        const moveY = this.position.y - this.startY;
        if (Math.abs(moveY) < Math.abs(moveX)) {
          const radio = Math.abs(moveX) / this.eleWidth;
          if (radio >= this.radio) {
            if (moveX < 0) { // 往左
              this.current++;
              if (this.current < this.sliderLength && this.current >= 0) {
                this.sliderLeft = -(this.current * this.eleWidth);
              } else {
                this.current = this.sliderLength - 1;
                this.sliderLeft = -(this.current * this.eleWidth);
              }
            } else { // 往右
              this.current--;
              if (this.current < 0) {
                this.current = 0;
                this.sliderLeft = -(this.current * this.eleWidth);
              } else {
                this.sliderLeft = -(this.current * this.eleWidth);
              }
            }
          } else {
            this.sliderLeft = -(this.current * this.eleWidth);
          }
          // 自动滑动回调
          if (this.autoPlay) this.autoSwiping();
        }
      },
      getImageCoordinate(e) {
        const mx = e.pageX - this.marginLeft;
        const my = e.pageY - this.marginTop;

        let rx = Math.round(mx / this.eleWidth * this.originWidth - this.eleWidth / 2) * -1;
        let ry = Math.round(my / this.eleHeight * this.originHeight - this.eleHeight / 2) * -1;

        if (rx > 0) {
          rx = 0;
        }
        if (ry > 0) {
          ry = 0;
        }

        if (ry < 0 && Math.abs(ry) - this.weldHeight > 0) {
          ry = this.weldHeight * -1;
        }
        if (rx < 0 && Math.abs(rx) - this.weldWidth > 0) {
          rx = this.weldWidth * -1;
        }

        this.bigImage.left = rx + 'px';
        this.bigImage.top = ry + 'px';

        this.rx = rx;
        this.ry = ry;
      },
      imageTap(e) {
        if (!this.magnifier) this.jmpHref();
        if (this.fullscreen) {
          this.handleMiddle();
          return false;
        }
        const imageObject = new Image();
        imageObject.src = this.images[this.current];
        imageObject.onload = () => {
          this.largeImgSrc = imageObject.src;
          this.originWidth = imageObject.width;
          this.originHeight = imageObject.height;
          this.largeShow = true;
          this.weldWidth = this.originWidth - this.eleWidth;
          this.weldHeight = this.originHeight - this.eleHeight;
          this.getImageCoordinate(e);
        };
      },
      jmpHref() {
        const targetLink = this.targetLink;
        if (targetLink && targetLink.length) {
          this.$router.push({ path: targetLink[this.current] });
        }
      },
      himinienLargeImage() {
        this.largeShow = false;
        this.weldWidth = 0;
        this.weldHeight = 0;
        this.cacheX = 0;
        this.cacheY = 0;
      },
      readyToStart(e) {
        this.touchPosition(e);
        this.floatStartX = this.position.x;
        this.floatStartY = this.position.y;
      },
      runningToMove(e) {
        e.preventDefault();
        this.touchPosition(e);
        const moveX = this.position.x - this.floatStartX;
        const moveY = this.position.y - this.floatStartY;

        let left = this.rx + moveX;
        let top = this.ry + moveY;

        // 区间范围控制
        if (top >= 0) top = 0;
        if (top < 0 && Math.abs(top) >= this.weldHeight) top = this.weldHeight * -1;
        if (left >= 0) left = 0;
        if (left < 0 && Math.abs(left) >= this.weldWidth) left = this.weldWidth * -1;

        this.bigImage.left = left + 'px';
        this.bigImage.top = top + 'px';
      },
      cacheEnd() {
        this.rx = Number(this.bigImage.left.replace('px', ''));
        this.ry = Number(this.bigImage.top.replace('px', ''));
      },

    }
  };
</script>
