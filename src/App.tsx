import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { ChatSessionsProvider, MainPageProvider } from './pages/mainpage/context';
import MainPage, { MobileMainPage } from './pages/mainpage/MainPage';
import { LoggedUserProvider } from './shared/context/LoggedUserContext';
import { UserPage } from './pages/userpage/UserPage';



function App() {
  const isMobile = useMediaQuery('(max-width: 600px')
  return (
    <LoggedUserProvider>
      <ChatSessionsProvider>
        <MainPageProvider>
          <UserPage>
            {isMobile ?
              <MobileMainPage /> :
              <MainPage />
            }
          </UserPage>
        </MainPageProvider>
      </ChatSessionsProvider>
    </LoggedUserProvider>
  );
}

export default App;
