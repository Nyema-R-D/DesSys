<script setup lang="ts">
import {
  Button,
  ConnectionStatus,
  Container,
  Logo,
  StatusBadge,
  Theme,
  useOnlineStatus,
} from '@nyema-r-d/vue';

const online = useOnlineStatus();
</script>

<template>
  <Theme theme="anthracite" class="app">
    <Container>
      <header class="app__header">
        <Logo />
        <ConnectionStatus :state="online ? 'online' : 'offline'" />
      </header>
      <main class="app__main">
        <StatusBadge status="prototype" />
        <h1 class="app__title">%%TITLE%%</h1>
        <p class="app__lead">
          Outil de l’écosystème NYEMA. Remplacez cet écran par le premier parcours de vos
          utilisateurs.
        </p>
        <Button href="https://github.com/Nyema-R-D/DesSys/wiki/Composants" trailing="↗">
          Catalogue des composants
        </Button>
      </main>
    </Container>
  </Theme>
</template>
