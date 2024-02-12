import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import Routes from 'routes/routes';

import Container from 'modules/auth/container';

import { Navbar } from 'components';

import Chat from './components/chat';

import 'assets/styles/tailwind.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <BrowserRouter>
    <Container>
      <Navbar />
      <Routes />
      <Chat />
    </Container>
  </BrowserRouter>
);
