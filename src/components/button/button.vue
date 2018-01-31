<template>
  <button type="button" :class="classes" @click.stop="handleClick">
    <slot></slot>
  </button>
</template>
<script>
  const prefixBtn = 'mini-btn';
  const btnType   = 'default';
  export default {
    name: 'miniButton',
    props: {
      type: {
        type: String,
        default: 'default'
      }
    },
    computed: {
      classes() {
        return [
          `${prefixBtn}`,
          {
            [`${prefixBtn}-${this.type}`]: this.type
          }
        ];
      }
    },
    methods: {
      handleClick (event) {
        if (this.type === 'disabled') return;
        this.$emit('click', event);
      }
    }
  };
</script>
