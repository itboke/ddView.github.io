<template>
  <div class="mini-countdown">
    <div class="inner-content" :class="styleClass">
      <slot name="title"></slot>
      <span>{{days}}天</span>
      <span>{{hours}}时</span>
      <span>{{minutes}}分</span>
      <span>{{seconds}}秒</span>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      startTime: {
        type: [String, Number]
      },
      endTime: {
        type: [String, Number]
      },
      endCallBack: {
        type: Function,
        default: () => {
          console.warn('倒计时结束函数没有定义!');
        }
      },
      readyCallBack: {
        type: Function,
        default: () => {
          console.warn('倒计时未开始函数没有定义!');
        }
      },
      styleClass: String // 自定义类名
    },
    data() {
      return {
        days: '0',
        hours: '0',
        minutes: '0',
        seconds: '0',
        surplus: 0,
        timer: null,
        end: /^[0-9]*$/.test(this.endTime) ? new Date(Number(this.endTime)).getTime() : new Date(this.endTime).getTime(),
        start: /^[0-9]*$/.test(this.startTime) ? new Date(Number(this.startTime)).getTime() : new Date(this.startTime).getTime()
      };
    },
    created() {
      // 倒计时还没有开始
      if ( this.start > new Date().getTime()) {
        this.readyCallBack && this.readyCallBack();
        return false;
      }
      // 倒计时结束
      if ( this.end < new Date().getTime()) {
        this.endCallBack && this.endCallBack();
        return false;
      }
      this.__init();
      this.timer = setInterval(this.__init, 1000);
    },
    methods: {
      __init() {
        this.surplus = this.end - new Date().getTime();
        // is Over
        if (this.surplus < 0) {
          this.timer && clearInterval(this.timer);
          this.endCallBack && this.endCallBack();
          return false;
        }
        this.days = this.getDays();
        this.hours = this.getHours();
        this.minutes = this.getMinutes();
        this.seconds = this.getSeconds();
      },
      getDays() {
        return this.cover(parseInt(this.surplus/1000/60/60/24, 10));
      },
      getHours() {
        return this.cover(parseInt(this.surplus/1000/60/60 % 24, 10));
      },
      getMinutes() {
        return this.cover(parseInt(this.surplus/1000/60 % 60, 10));
      },
      getSeconds() {
        return this.cover(parseInt(this.surplus/1000 % 60, 10));
      },
      cover(value) {
        if (value < 10) {
            return '0' + value;
        }
        return value;
      }
    }
  };
</script>
