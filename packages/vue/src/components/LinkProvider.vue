<script setup lang="ts">
import { provideLinkComponent, type LinkComponent } from '../link';

/**
 * Fait rendre aux composants (SiteHeader, SiteFooter, Breadcrumb, Button, cartes, LanguageSwitch)
 * leurs liens avec le composant du routeur : navigation sans rechargement de la page.
 */
const props = defineProps<{ component: LinkComponent }>();
provideLinkComponent(props.component);
</script>

<template>
  <slot />
</template>
