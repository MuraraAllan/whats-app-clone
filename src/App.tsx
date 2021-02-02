import React from 'react';
import MainPage from './pages/mainpage/MainPage';
import { LoggedUserProvider } from './shared/context/UserContext';


function App() {
  return (
    <LoggedUserProvider>
      <MainPage />
    </LoggedUserProvider>
  );
}

export default App;
