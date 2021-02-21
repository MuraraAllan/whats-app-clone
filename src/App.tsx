import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { ChatSessionsProvider, MainPageProvider } from './pages/mainpage/context';
import MainPage, { MobileMainPage } from './pages/mainpage/MainPage';
import { LoggedUserProvider } from './shared/context/LoggedUserContext';



function App() {
  const isMobile = useMediaQuery('(max-width: 600px')

  return (
    <LoggedUserProvider>
      <ChatSessionsProvider>
        <MainPageProvider>
          {isMobile ?
            <MobileMainPage /> :
            <MainPage />
          }
        </MainPageProvider>
      </ChatSessionsProvider>
    </LoggedUserProvider>
  );
}

export default App;
