import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import styled from '@emotion/styled';
import Header from './components/Header/Header';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
  typography: {
    fontFamily: "'Arial', sans-serif",
  },
});

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #fdfbf6;
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <Header />
        <MainContent>
          {/* 这里将来放置新闻内容 */}
        </MainContent>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App; 