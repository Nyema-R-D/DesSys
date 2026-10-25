<script setup lang="ts">
import '@nyema-r-d/css/base.css';
import '@nyema-r-d/css/components/SiteFooter.css';
import { useId } from 'vue';
import Container from './Container.vue';
import Logo from './Logo.vue';

export interface FooterColumn {
  title: string;
  links: { href: string; label: string }[];
}

withDefaults(
  defineProps<{ columns: FooterColumn[]; legal?: string; tagline?: string; brandHref?: string }>(),
  {
    brandHref: '/',
  },
);
const idPrefix = useId();
</script>

<template>
  <!-- Slots : #brand (défaut : Logo 40 px), #extra (ex. <LanguageSwitch>). -->
  <footer class="ny-site-footer">
    <Container>
      <div class="ny-site-footer__top">
        <a :href="brandHref" class="ny-site-footer__brand ny-focusable"
          ><slot name="brand"><Logo :size="40" /></slot
        ></a>
        <div class="ny-site-footer__columns">
          <nav v-for="(column, i) in columns" :key="i" :aria-labelledby="`${idPrefix}-${i}`">
            <p :id="`${idPrefix}-${i}`" class="ny-mono-label ny-site-footer__heading">
              {{ column.title }}
            </p>
            <ul class="ny-site-footer__column">
              <li v-for="link in column.links" :key="link.href + link.label">
                <a :href="link.href" class="ny-site-footer__link ny-focusable">{{ link.label }}</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div class="ny-mono-label ny-site-footer__bottom">
        <span v-if="legal != null">{{ legal }}</span
        ><slot name="extra" /><span v-if="tagline != null">{{ tagline }}</span>
      </div>
    </Container>
  </footer>
</template>
