<template>
  <span class="mini-counter">
    <label>
      <span @click.stop="reduce" :class="{ 'disabled': minus }">-</span>
      <div>{{value}}</div>
      <span @click.stop="add" :class="{ 'disabled': isMax }">+</span>
    </label>
  </span>
</template>
<script>
  export default {
    props: {
      max: Number,
      value: {
        type: Number,
        default: 1
      },
      index: Number, // 索引值
      onChange: {
        type: Function,
        default: () => {}
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        numberValue: this.value,
        minus: false,
        isMax: false
      };
    },
    watch: {
      numberValue(val) {
        if (!/^[0-9]*$/.test(val)) {
          this.numberValue = 1;
        }
        this.minus = val === 1 ? true : false;
        if (this.max) {
          if (val === this.max) {
            this.isMax = true;
          } else {
            this.isMax = false;
          }
        }
        this.onChange(this.numberValue, this.index);
      }
    },
    methods: {
      add() {
        if (this.disabled) return;
        if (this.max && this.numberValue >= this.max) {
          return false;
        }
        this.numberValue++;
      },
      reduce() {
        if (this.disabled) return;
        if (this.numberValue <= 1) {
          return false;
        }
        this.numberValue--;
      }
    }
  };
</script>
