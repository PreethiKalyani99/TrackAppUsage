import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App"
import { DataProvider } from './hooks/useData';
import { CategoryProvider } from './hooks/useCategory';
import { AppProvider } from './hooks/useApp';
import { LimitProvider } from './hooks/useLimit';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <DataProvider>
      <CategoryProvider>
        <AppProvider>
            <LimitProvider>
                <App />
            </LimitProvider>
        </AppProvider>
      </CategoryProvider>
    </DataProvider>
  </React.StrictMode>
);