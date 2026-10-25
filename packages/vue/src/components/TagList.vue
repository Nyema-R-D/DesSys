<script setup lang="ts">
import '@nyema-r-d/css/components/Tag.css';
import Tag from './Tag.vue';

defineProps<{ items: string[] }>();
</script>

<template>
  <ul class="ny-tag-list">
    <li v-for="item in items" :key="item">
      <Tag>{{ item }}</Tag>
    </li>
  </ul>
</template>
