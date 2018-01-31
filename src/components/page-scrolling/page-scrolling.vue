<template>
  <div class="mini-page-scrolling" id="miniScroll" :style="{ paddingBottom: pdBottom + 'px', paddingTop: pdTop + 'px' }" @scroll="scroll">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    props: {
      pdBottom: {
        type: Number
      },
      pdTop: {
        type: Number,
        default: 0
      },
      scrollTop: {
        type: Number,
        default: 0
      }
    },
    methods: {
      scroll(e) {
        const top = e.target.scrollTop || 0;
        this.$emit('input', top);
      }
    }
  };
</script>
