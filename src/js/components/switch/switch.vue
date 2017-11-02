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
      }
    },
    data() {
      return {
        isActive: false
      };
    },
    methods: {
      change() {
        this.isActive = !this.isActive;
        this.onChange(this.isActive);
      }
    }
  };
</script>
