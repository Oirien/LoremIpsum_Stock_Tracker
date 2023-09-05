import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import HomeContainer from './containers/HomeContainer.jsx';
import PortfolioContainer from './containers/PortfolioContainer.jsx';
import SupportContainer from './containers/SupportContainer.jsx';

import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes, Link, Outlet } from 'react-router-dom';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {},
        mutations: {},
    },
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route index element={<HomeContainer />}/>
                        <Route path="portfolio" element={<PortfolioContainer />} />
                        <Route path="support" element={<SupportContainer />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>,
);
