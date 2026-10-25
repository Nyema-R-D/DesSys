<script setup lang="ts">
import '@nyema-r-d/css/base.css';
import '@nyema-r-d/css/components/Hero.css';
import Container from './Container.vue';
import SectionLabel from './SectionLabel.vue';

defineProps<{
  eyebrow?: string;
  aside?: string;
  title: string;
  lead?: string;
  mediaLegend?: string[];
}>();
</script>

<template>
  <!-- Slots : #actions (boutons), #media (ex. <SignalGrid :columns="16" :rows="8" animated />). -->
  <section class="ny-hero">
    <Container>
      <div v-if="eyebrow != null || aside != null" class="ny-hero__top">
        <SectionLabel v-if="eyebrow != null" node>{{ eyebrow }}</SectionLabel
        ><span v-else /><span v-if="aside != null" class="ny-mono-label ny-hero__aside">{{
          aside
        }}</span>
      </div>
      <h1 class="ny-hero__title">{{ title }}</h1>
      <div class="ny-hero__bottom">
        <div class="ny-hero__body">
          <p v-if="lead != null" class="ny-hero__lead">{{ lead }}</p>
          <div v-if="$slots.actions" class="ny-hero__actions"><slot name="actions" /></div>
        </div>
        <div v-if="$slots.media" class="ny-hero__media">
          <slot name="media" />
          <div v-if="mediaLegend?.length" class="ny-mono-label ny-hero__legend">
            <span v-for="(item, i) in mediaLegend" :key="i">{{ item }}</span>
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>
