<template>
  <div class="mini-tab-panel">
    <div class="tab-nav" id="tab-nav">
      <ul>
        <li class="nav-label" :class="{ 'label-active': i === index }" v-for="name, index in labels" @click.stop="slipNavItem($event, index)">{{name}}</li>
      </ul>
      <span class="slip" :style="{ width: slipWidth + 'px', transform: 'translate3d(' + left + 'px, 0, 0)' }"></span>
    </div>
    <div class="tab-content">
      <div class="inner-content" v-if="kind == 'display'" :style="{ width: contentWidth * labels.length + 'px'}">
        <slot></slot>
      </div>
      <div class="inner-content" v-else :style="{ width: contentWidth * labels.length + 'px', transform: 'translate3d(' + conLeft + 'px, 0, 0)'}">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      kind: {
        type: String,
        default: ''
      }
    },
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
          const defaultLabel = document.querySelectorAll('.nav-label')[0];
          this.slipWidth = defaultLabel.offsetWidth;
          this.left = defaultLabel.offsetLeft;
          this.contentWidth = document.querySelector('#tab-nav').offsetWidth;
        }, 10);
      },
      // 滑动导航标签
      slipNavItem(e, index) {
        if (this.kind == 'display') {
          let item = document.querySelectorAll('.mini-tab-item');
          item = Array.from(item);
          item.map((items, i) => {
            items.setAttribute('style', "display: none; flex: none; width: " + this.contentWidth + "px");
            if (i == index) {
              items.setAttribute('style', 'display: block');
            };
          })
        };
        this.labelWidth = e.target.clientWidth;
        this.slipWidth = this.labelWidth;
        this.left = e.target.offsetLeft;
        this.i = index;
        this.conLeft = this.contentWidth * index * -1;
      }
    },
  };
</script>
