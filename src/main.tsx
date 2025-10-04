import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import './index.css';
import SearchPage from './pages/search';
import TermsPage from './pages/terms';

import LoginPage from '@pages/login';
import { GoogleOAuthProvider } from '@react-oauth/google';
import '@utils/translation';
import { TabProvider } from '@contexts/TabContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <ThemeProvider defaultTheme="system" attribute="class"> */}
    <Theme accentColor="orange" grayColor="gray">
      <GoogleOAuthProvider clientId="<your_client_id>">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <TabProvider>
                  <SearchPage />
                </TabProvider>
              }
            />
            <Route path="/terms" element={<TermsPage />} />
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
      {/* <ThemePanel /> */}
    </Theme>
    {/* </ThemeProvider> */}
  </StrictMode>,
);
