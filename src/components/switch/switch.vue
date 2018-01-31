<template>
  <span class="mini-switch" :class="{ 'mini-switch-active': isActive }" @click.stop="change"></span>
</template>
<script>
  export default {
    props: {
      onChange: {
        type: Function,
        default: () => {
          console.warn('onChange函数没有定义');
        }
      },
      defaultValue: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isActive: this.defaultValue
      };
    },
    watch: {
      defaultValue(val) {
        this.isActive = val;
      }
    },
    methods: {
      change() {
        if (this.disabled) {
          return;
        }
        this.isActive = !this.isActive;
        this.onChange(this.isActive);
      }
    }
  };
</script>
