import React from 'react';
import { FluentProvider, webLightTheme, webDarkTheme, makeStyles, tokens } from '@fluentui/react-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import GeneratorPage from './pages/GeneratorPage';
import TemplatesPage from './pages/TemplatesPage';
import HistoryPage from './pages/HistoryPage';
import SettingsPage from './pages/SettingsPage';

const useStyles = makeStyles({
  root: {
    height: '100vh',
    width: '100vw',
    backgroundColor: tokens.colorNeutralBackground1,
  },
});

function App() {
  const classes = useStyles();
  // TODO: Add theme toggling
  const [theme, setTheme] = React.useState(webDarkTheme);

  return (
    <FluentProvider theme={theme} className={classes.root}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<GeneratorPage />} />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </FluentProvider>
  );
}

export default App;
