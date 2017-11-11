<template>
  <router-link :to="{ path: target }">
    <div class="mini-menubar">
        <div class="pre-icon"><slot name=""></slot></div>
        <div class="content">
          <span>{{title}}</span>
          <i class="rear-icon"></i>
        </div>
    </div>
  </router-link>
</template>
<script>
  export default {
    props: {
      title: {
        type: String,
        default: '喜欢你'
      },
      target: {
        type: String,
        default: '/'
      }
    }
  };
</script>
