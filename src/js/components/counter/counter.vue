<template>
  <div class="mini-counter">
    <label>
      <span @click.stop="reduce" :class="{ 'disabled': minus }">-</span>
      <input type="text" v-model="numberValue">
      <span @click.stop="add" :class="{ 'disabled': isMax }">+</span>
    </label>
  </div>
</template>
<script>
  export default {
    props: {
      max: Number,
      value: {
        type: Number,
        default: 1
      }
    },
    data() {
      return {
        numberValue: 1,
        minus: false,
        isMax: false
      };
    },
    watch: {
      numberValue(val) {
        if (!/^[0-9]*$/.test(val) || val > this.max) {
          this.numberValue = 1;
        }
        this.minus = val === 0 ? true : false;
        if (this.max) {
          if (val === this.max) {
            this.isMax = true;
          } else {
            this.isMax = false;
          }
        }
        this.$emit('input', this.numberValue); // 通知
      }
    },
    methods: {
      add() {
        if (this.max && this.numberValue >= this.max) {
          return false;
        }
        this.numberValue++;
      },
      reduce() {
        if (this.numberValue === 0) {
          return false;
        }
        this.numberValue--;
      }
    }
  };
</script>
