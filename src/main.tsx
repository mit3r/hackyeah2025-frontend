import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import './index.css';
import HomePage from './pages/home';

import { SearchProvider } from '@contexts/SearchContext';
import { TabProvider } from '@contexts/TabContext';
import LoginPage from '@pages/login';
import { GoogleOAuthProvider } from '@react-oauth/google';
import '@utils/translation';
import { DetailsProvider } from '@contexts/DetailsContext';

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
                <DetailsProvider>
                  <SearchProvider>
                    <TabProvider>
                      <HomePage />
                    </TabProvider>
                  </SearchProvider>
                </DetailsProvider>
              }
            />
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
      {/* <ThemePanel /> */}
    </Theme>
    {/* </ThemeProvider> */}
  </StrictMode>,
);
