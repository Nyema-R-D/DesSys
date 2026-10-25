<script setup lang="ts">
import '@nyema-r-d/css/base.css';
import '@nyema-r-d/css/components/SiteHeader.css';
import { onBeforeUnmount, ref, useId, watch } from 'vue';
import Container from './Container.vue';
import Logo from './Logo.vue';

export interface NavLink {
  href: string;
  label: string;
  current?: boolean;
}

withDefaults(
  defineProps<{
    links: NavLink[];
    brandHref?: string;
    navLabel?: string;
    menuLabels?: { open: string; close: string };
  }>(),
  {
    brandHref: '/',
    navLabel: 'Navigation principale',
    menuLabels: () => ({ open: 'Menu', close: 'Fermer' }),
  },
);
const open = ref(false);
const panelId = useId();
const onKey = (event: KeyboardEvent) => event.key === 'Escape' && (open.value = false);
watch(open, (value) =>
  value ? window.addEventListener('keydown', onKey) : window.removeEventListener('keydown', onKey),
);
onBeforeUnmount(() => window.removeEventListener('keydown', onKey));
</script>

<template>
  <!-- Slots : #brand (défaut : Logo 26 px), #actions (rendu dans la barre et, sous 600 px, dans le menu). -->
  <header class="ny-site-header">
    <Container>
      <div class="ny-site-header__bar">
        <a :href="brandHref" class="ny-site-header__brand ny-focusable"
          ><slot name="brand"><Logo :size="26" /></slot
        ></a>
        <nav :aria-label="navLabel" class="ny-site-header__nav">
          <a
            v-for="link in links"
            :key="link.href"
            :href="link.href"
            class="ny-site-header__link ny-focusable"
            :aria-current="link.current ? 'page' : undefined"
            >{{ link.label }}</a
          >
        </nav>
        <div class="ny-site-header__end">
          <div v-if="$slots.actions" class="ny-site-header__actions"><slot name="actions" /></div>
          <button
            type="button"
            class="ny-site-header__toggle ny-mono-label ny-focusable"
            :aria-expanded="open"
            :aria-controls="panelId"
            @click="open = !open"
          >
            {{ open ? menuLabels.close : menuLabels.open }}
          </button>
        </div>
      </div>
      <nav :id="panelId" :aria-label="navLabel" class="ny-site-header__panel" :hidden="!open">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="ny-site-header__link ny-focusable"
          :aria-current="link.current ? 'page' : undefined"
          @click="open = false"
          >{{ link.label }}</a
        >
        <div v-if="$slots.actions" class="ny-site-header__panel-actions">
          <slot name="actions" />
        </div>
      </nav>
    </Container>
  </header>
</template>
