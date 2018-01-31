<template>
  <div class="mini-overlay" v-show="visible">
    <div class="mini-overlay-mask" :style="{ bottom: bottom + 'px' }" @click.stop="closeOverlay"></div>
    <div class="mini-overlay-content" :style="{ bottom: bottom + 'px' }" :class="{ 'mini-overlay-upslide': upslide }">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      value: {
        type: Boolean,
        default: false
      },
      overlay: {
        type: Boolean,
        default: true
      },
      bottom: {
        type: [Number, String],
        default: 0
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        onEmit: false,
        visible: this.value,
        upslide: this.value
      };
    },
    watch: {
      value(val) {
        this.onEmit = val;
      },
      onEmit(val) {
        if (val) {
          this.upslideShow();
        } else {
          this.upslideClose();
        }
      }
    },
    methods: {
      upslideShow() {
        this.visible = this.onEmit;
        setTimeout(() => {
          this.upslide = this.value;
        }, 100);
      },
      upslideClose() {
        this.upslide = false;
        setTimeout(() => {
          this.visible = this.onEmit;
        }, 500);
      },
      closeOverlay() {
        if (this.disabled) return;
        if (!this.overlay) return;
        if (!this.upslide) return;
        this.$emit('input', false);
      }
    }
  };
</script>
