<template>
  <div class="mini-loading">
    <div class="inner-content">
      <img class="loading-icon" :src="loadImg">
      <span>{{tips}}</span>
    </div>
  </div>
</template>
<script>
  import meloadImg from '@/image/loading.png';
  import yourloadImg from '@/image/loading@2.png';
  import herloadImg from '@/image/loading@3.png';
  export default {
    props: {
      tips: {
        type: String,
        default: '加载中...'
      },
      type: {
        type: String,
        default: 'meload'
      }
    },
    data() {
      return {
        loadImg: this.type === 'meload' ? meloadImg : this.type === 'yourload' ? yourloadImg : herloadImg
      }
    }
  };
</script>
