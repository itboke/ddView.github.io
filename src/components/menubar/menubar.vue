<template>
  <div class="mini-menubar" @click.stop="toPage">
      <div class="pre-icon"><slot name=""></slot></div>
      <div class="content">
        <span>{{title}}</span>
        <i class="rear-icon"></i>
      </div>
  </div>
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
        default: ''
      },
      onHandle: {
        type: [Function, Number],
        default: 0
      }
    },
    methods: {
      toPage() {
        if (this.target) {
          this.$router.push({ path: this.target });
        } else {
          if ( typeof this.onHandle === 'function') {
            this.onHandle();
          }
        }
      }
    }
  };
</script>
