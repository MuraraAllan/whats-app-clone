import React from 'react';
import { ChatSessionsProvider } from './pages/mainpage/context';
import MainPage from './pages/mainpage/MainPage';
import { LoggedUserProvider } from './shared/context/LoggedUserContext';


function App() {
  return (
    <LoggedUserProvider>
      <ChatSessionsProvider>
        <MainPage />
      </ChatSessionsProvider>
    </LoggedUserProvider>
  );
}

export default App;
