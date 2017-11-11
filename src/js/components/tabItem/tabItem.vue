<template>
  <div class="mini-tab-item">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'tabItem',
    props: {
      label: String,
    },
  };
</script>