<template>
  <div class="mini-page-scrolling" :style="{ paddingBottom: pdBottom + 'px', paddingTop: pdTop + 'px' }">
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
        type: Number
      }
    }
  };
</script>
