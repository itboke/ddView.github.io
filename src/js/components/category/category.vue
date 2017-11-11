<template>
  <div class="mini-category">
    <ul>
      <li v-for="item in data">
        <router-link :to="{ path: item.link }">
          <span class="icons"><slot :name="item.name"></slot></span>
          <span class="tags">{{item.title}}</span>
        </router-link>
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
    }
  };
</script>
