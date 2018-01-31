<template>
  <div class="mini-tab-panel">
    <div class="tab-nav" :class="{ 'tab-fixed': tabFixed }" id="tab-nav">
      <ul>
        <li class="nav-label" :class="[{ 'label-active': i === index,  }, labelClass[index]]" v-for="name, index in label" @click.stop="slipNavItem($event, index)">{{name}}</li>
      </ul>
      <span class="slip" :style="{ width: slipWidth + 'px', transform: 'translate3d(' + left + 'px, 0, 0)' }"></span>
    </div>
    <div class="tab-content" :style="{ paddingTop: contentTop + 'px' }">
      <div class="inner-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      tabFixed: {
        type: Boolean,
        default: false
      },
      label: {
        type: Array,
        default: () => {
          return [];
        }
      },
      labelClass: {
        type: Array,
        default: () => {
          return [];
        }
      },
      onTabClick: {
        type: Function,
        default: () => {
          console.warn('事件onTabClick没有自定义');
        }
      }
    },
    name: 'mini-tab',
    data() {
      return {
        left: 0,
        conLeft: 0,
        labelWidth: 0,
        slipWidth: 0,
        contentWidth: 0,
        i: 0,
        contentTop: 0
      };
    },
    mounted() {
      this.getLabelName();
    },
    methods: {
      getLabelName() {
        setTimeout(() => {
          const defaultLabel = document.querySelectorAll('.nav-label')[0];
          const tab = document.querySelector('#tab-nav');
          this.slipWidth = defaultLabel.offsetWidth;
          this.left = defaultLabel.offsetLeft;
          if (this.tabFixed) {
            this.contentTop = tab.offsetHeight;
          }
        }, 10);
      },
      // 滑动导航标签
      slipNavItem(e, index) {
        this.labelWidth = e.target.clientWidth;
        this.slipWidth = this.labelWidth;
        this.left = e.target.offsetLeft;
        this.i = index;
        this.onTabClick(index);
      }
    },
  };
</script>
