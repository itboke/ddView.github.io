<template>
  <div class="mini-page-scrolling" :style="{ paminiingBottom: pdBottom + 'px' }">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    props: {
      pdBottom: {
        type: Number
      }
    }
  };
</script>