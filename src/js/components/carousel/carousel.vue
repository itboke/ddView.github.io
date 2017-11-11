<template>
  <div class="mini-carousel" id="mini-carousel">
    <div class="inner-content"
        :class="{ 'full-slider': isFullscreen }"
        :style="{ marginTop: mgTop + 'px' }"
    >
      <div
        class="slider-box"
        @touchstart="touchStart($event)"
        @touchmove="touchMove($event)"
        @touchend="touchEnd($event)"
        :style="{ transform: 'translate3d(' + sliderLeft + 'px,0,0)', width: totalWidth + 'px' }"
      >
        <div class="slider-item" v-for="item in images"
          @click.stop="imageTap($event)"
        >
          <img :src="item" :style="{ width: eleWidth + 'px', height:  '100%' }" />
        </div>
      </div>
      <div class="slider-circle" v-if="images.length > 1">
        <span v-for="(item, index) in images" :class="{ 'active': index == current }"></span>
      </div>
      <div class="large-image" v-if="magnifier" v-show="largeShow" @click.stop="himinienLargeImage">
        <img :src="largeImgSrc" :style="bigImage" @touchstart="readyToStart($event)"
              @touchmove="runningToMove($event)" @touchend="cacheEnd($event)">
      </div>
    </div>
    <div class="full-screen" v-show="isFullscreen" @click.stop="closeFullscreen"></div>
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
      }
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
        totalWidth: 0,
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
        mgTop: 0
      };
    },
    watch: {
      images(images) {
        this.update();
      }
    },
    methods: {
      update() {
        const carousel = document.querySelector('#mini-carousel');
        this.eleWidth = (document.documentElement.clientWidth || document.body.clientWidth) - carousel.offsetLeft * 2;
        this.eleHeight = carousel.offsetHeight;
        this.sliderLength = this.images.length;
        this.marginLeft = carousel.offsetLeft;
        this.marginTop = carousel.offsetTop;
        this.totalWidth = this.eleWidth * this.sliderLength;
        if (this.autoPlay) {
          this.autoSwiping(); // 自动滑动
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
      touchStart(e) {
        if (this.autoTimer && this.autoPlay) clearInterval(this.autoTimer);
        this.touchPosition(e);
        this.startX = this.position.x;
        this.startY = this.position.y;
        this.initLeft = this.sliderLeft;
      },
      touchMove(e) {
        this.touchPosition(e);
        const moveX = this.position.x - this.startX;
        const moveY = this.position.y - this.startY;
        if (Math.abs(moveY) < Math.abs(moveX)) {
          e.preventDefault();
          this.sliderLeft = this.initLeft + moveX;
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
      touchPosition(e) {
        const touches = e.changedTouches;
        this.position.x = touches[0].clientX;
        this.position.y = touches[0].clientY;
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
          const type = targetLink[this.current] && targetLink[this.current].type;
          switch (type) {
            case 'reflesh':
              window.location.href = targetLink[this.current].url;
            break;
            case 'vueRouter':
              this.$router.push({ path: targetLink[this.current].url });
            break;
            default:
              window.location.href = '/';
            break;
          }
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
      }
    }
  };
</script>
