<template>
  <div class="mini-scroller" id="miniScroll"
    @touchstart="touchStart($event)"
    @touchmove="touchMove($event)"
    @touchend="touchEnd($event)"
    @scroll="(onInfinite || infiniteLoading) ? onScroll($event) : undefined">
    <section class="inner" :style="{ paddingBottom: pdBottom + 40 + 'px' }">
      <slot></slot>
      <!-- <div class="loading" v-show="infiniteLoading">
        <i class="icon-loading"></i><span> 加载中...</span>
      </div> -->
    </section>
  </div>
</template>
<script>
export default {
  props: {
    offset: {
      type: Number,
      default: 40
    },
    enableInfinite: {
      type: Boolean,
      default: true
    },
    onInfinite: {
      type: Function,
      default () {
      }
    },
    isOver: {
      type: Boolean,
      default: false
    },
    pdBottom: {
      type: Number,
      default: 0
    },
    getScrollTop: {
      type: Function,
      default: () => { }
    }
  },
  data () {
    return {
      top: 0,
      startY: 0,
      touching: false,
      infiniteLoading: false
    }
  },
  methods: {
    touchStart (e) {
      this.startY = e.targetTouches[0].pageY;
      this.startScroll = this.$el.scrollTop || 0;
      this.touching = true;
    },
    touchMove (e) {
      if (!this.enableRefresh || this.$el.scrollTop > 0 || !this.touching) {
        return false;
      }
    },
    touchEnd (e) {
      if (!this.enableRefresh) return false;
      this.touching = false
    },
    // 私有临界点函数调用
    infinite () {
      if (!this.isOver) {
        this.infiniteLoading = true;
        this.onInfinite(this.infiniteDone); // 外部的触发回调
      }
    },
    // 处理完成
    infiniteDone () {
      this.infiniteLoading = false;
    },
    // 下拉过程
    onScroll (e) {
      if (!this.enableInfinite || this.infiniteLoading) {
        return false;
      }
      let outerHeight = this.$el.clientHeight;
      let innerHeight = this.$el.querySelector('.inner').clientHeight;
      let scrollTop = this.$el.scrollTop;
      let footNavBar = document.querySelector('.foot-fixed-bar');
      let infiniteHeight = this.offset;
      if (footNavBar) {
        infiniteHeight = footNavBar.clientHeight;
      }
      this.getScrollTop(scrollTop);
      const bottom = innerHeight - outerHeight - scrollTop;
      if (bottom < infiniteHeight) this.infinite();
    }
  }
}
</script>
