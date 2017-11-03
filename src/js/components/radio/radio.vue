<template>
  <span class="mini-radio" @click.stop="change">
    <span class="border" :class="{ 'check': !isdefault }" @click.stop="change">
      <span class="circle fadeIn" v-if="type == 'default'" v-show="active"></span>
      <img class="mini-icon-check fadeIn" :src="checkIcon" v-else v-show="active"/>
    </span>
  </span>
</template>
<script>
  import check from '@/image/check.png';
  export default {
    props: {
      onChange: {
        type: Function,
        default: () => {
          console.warn('单选点击回调事件没有定义');
        }
      },
      type: {
        type: String,
        default: 'default'
      }
    },
    data() {
      return {
        active: false,
        checkIcon: check,
        isdefault: true
      };
    },
    methods: {
      change() {
        this.active = !this.active;
        if (this.active) {
          if (this.type === 'check') {
            this.isdefault = false;
          } else {
            this.isdefault = true;
          }
        } else {
          this.isdefault = true;
        }
        this.onChange(this.active);
      }
    }
  };
</script>
