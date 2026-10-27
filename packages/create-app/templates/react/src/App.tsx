import {
  Button,
  ConnectionStatus,
  Container,
  Logo,
  StatusBadge,
  Theme,
  useOnlineStatus,
} from '@nyema-r-d/react';

export function App() {
  const online = useOnlineStatus();
  return (
    <Theme theme="anthracite" className="app">
      <Container>
        <header className="app__header">
          <Logo />
          <ConnectionStatus state={online ? 'online' : 'offline'} />
        </header>
        <main className="app__main">
          <StatusBadge status="prototype" />
          <h1 className="app__title">%%TITLE%%</h1>
          <p className="app__lead">
            Outil de l’écosystème NYEMA. Remplacez cet écran par le premier parcours de vos
            utilisateurs.
          </p>
          <Button href="https://github.com/Nyema-R-D/DesSys/wiki/Composants" trailing="↗">
            Catalogue des composants
          </Button>
        </main>
      </Container>
    </Theme>
  );
}
