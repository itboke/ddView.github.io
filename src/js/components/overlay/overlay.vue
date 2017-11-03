<template>
  <div class="mini-overlay" v-show="visible">
    <div class="mini-overlay-mask" @click.stop="closeOverlay"></div>
    <div class="mini-overlay-content" :class="{ 'mini-overlay-upslide': upslide }">
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
      }
    },
    data() {
      return {
        onEmit: false,
        visible: false,
        upslide: false
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
        if (!this.overlay) return;
        if (!this.upslide) return;
        this.$emit('input', false);
      }
    }
  };
</script>
