<template>
  <div class="mini-sms-verification">
    <div class="inner-content">
      <label>
        <input type="text" placeholder="验证码" name="verification" class="field" maxlength="4" />
        <span class="btn-text" :class="flag ? 'getting' : ''" @click.stop="selfGetVerifiCode()">
          {{btnText}}
        </span>
      </label>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      handleGetVerifiCode: {
        type: Function,
        default: () => {
          console.warn('外部事件：handleGetVerifiCode 没有定义');
        }
      }
    },
    data() {
      return {
        btnText: '获取验证码',
        count: 60,
        timer: null, // 定时器
        flag: false,
      }; 
    },
    methods: {
      selfGetVerifiCode() {
        if (this.flag) {
          return false;
        }
        this.handleGetVerifiCode(this.eventCallback);
      },
      eventCallback() {
        this.flag = true;
        this.btnText = '(' + this.count + 's)后重新获取';
        this.timer = setInterval(() => {
          this.count--;
          if (this.count === 0) {
            this.timer && clearInterval(this.timer);
            this.count = 60;
            this.btnText = '获取验证码';
            this.flag = false;
          } else {
            this.btnText = '(' + this.count + 's)后重新获取';
          }
        }, 1000);
      }
    }
  };
</script>