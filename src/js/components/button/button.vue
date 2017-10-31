<template>
  <button type="button" :class="classes" @click.stop="handleClick">
    <slot></slot>
  </button>
</template>
<script>
  const prefixBtn = 'mini-btn';
  const btnType   = 'default';
  export default {
    props: {
      type: {
        type: String,
        default: 'default'
      }
    },
    data() {
      return {
        name: 'miniButtom'
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
        this.$emit('click', event);
      }
    }
  };
</script>