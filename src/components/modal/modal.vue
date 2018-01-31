<template>
  <div class="mini-modal">
    <div v-show="!hidden" class="modal-mask" @click.stop="cancel"></div>
    <div v-show="arousal" ref="innerContent" class="inner-content fadeIn" :style="{ transform: 'translate3d(-50%, -' + offsetTop + 'px, 0)' }">
      <div class="title" v-show="!isTitle" :style="{ textAlign: titleAlign }">{{textTitle ? textTitle : '标题'}}</div>
      <div class="slot-content"><slot></slot></div>
      <div class="foot-btns">
        <span @click.stop="cancel">取消</span><span @click.stop="confirm">确定</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      confirm: {
        type: Function,
        default: () => {
          console.warn('请定义✅的回调函数');
        }
      },
      cancel: {
        type: Function,
        default: () => {
          console.warn('请定义取消的回调函数');
        }
      },
      titleAlign: {
        type: String,
        default: 'left'
      },
      hidden: {
        type: Boolean,
        default: true
      },
      arousal: {
        type: Boolean,
        default: false
      },
      isTitle: {
        type: Boolean,
        default: false
      },
      textTitle: String
    },
    data() {
      return {
        offsetTop: 0
      };
    },
    updated() {
      this.offsetTop = Math.ceil(this.$refs.innerContent.offsetHeight/2);
    }
  };
</script>
