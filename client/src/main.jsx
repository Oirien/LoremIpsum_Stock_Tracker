import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

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
                        {/* <Route index element={<HomeContainer />}/> */}
                        {/* <Route path="portfolio" element={<PortfolioContainer />} /> */}
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>,
);
