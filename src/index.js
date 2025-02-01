import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import List from './page/List'
import Detail from './page/Detail'
import { Helmet, HelmetProvider } from 'react-helmet-async'

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <BrowserRouter future={{v7_startTransition: true, v7_relativeSplatPath: true}}>
        <QueryClientProvider client={queryClient}>
          <HelmetProvider>
            <Helmet>
              <title>React Title</title>
              <meta name="description" content="리엑트 앱스토어를 웹으로" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
              <meta property="og:image" content="" />
              <meta property="og:url" content="" />
            </Helmet>
            <Routes>
              <Route path="/" element={<App />}></Route>
              <Route path="/list" element={<List />}></Route>
              <Route path="/detail" element={<Detail />}></Route>
            </Routes>
          </HelmetProvider>
        </QueryClientProvider>
    </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
