<template>
  <div class="mini-tab-panel">
    <div class="tab-nav" id="tab-nav">
      <ul>
        <li class="nav-label" :class="{ 'label-active': i === index }" v-for="name, index in labels" @click.stop="slipNavItem($event, index)">{{name}}</li>
      </ul>
      <span class="slip" :style="{ width: slipWidth + 'px', transform: 'translate3d(' + left + 'px, 0, 0)' }"></span>
    </div>
    <div class="tab-content">
      <div class="inner-content" :style="{ width: contentWidth * labels.length + 'px', transform: 'translate3d(' + conLeft + 'px, 0, 0)'}">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'mini-tab',
    data() {
      return {
        labels: [],
        left: 0,
        conLeft: 0,
        labelWidth: 0,
        slipWidth: 0,
        contentWidth: 0,
        i: 0
      };
    },
    mounted() {
      this.getLabelName();
    },
    methods: {
      getLabelName() {
        this.$children.filter((item) => {
          this.labels.push(item.label);
        });
        setTimeout(() => {
          this.slipWidth = document.querySelectorAll('.nav-label')[0].offsetWidth;
          this.contentWidth = document.querySelector('#tab-nav').offsetWidth;
        }, 10);
      },
      // 滑动导航标签
      slipNavItem(e, index) {
        this.labelWidth = e.target.clientWidth;
        this.slipWidth = this.labelWidth;
        this.left = e.target.offsetLeft;
        this.i = index;
        this.conLeft = this.contentWidth * index * -1;
      }
    }, 
  };
</script>