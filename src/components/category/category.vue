<template>
  <div class="mini-category">
    <ul>
      <li v-for="item in data" @click.stop="toPage(item.link)">
        <span class="icons">
          <slot :name="item.name"></slot>
          <span class="tags">{{item.title}}</span>
        </span>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    props: {
      data: {
        type: Array,
        default: () => {
          return [];
        }
      }
    },
    methods: {
      toPage(path) {
        this.$router.push({ path: path });
      }
    }
  };
</script>
