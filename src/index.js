import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import List from './page/List'
import Detail from './page/Detail'

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <BrowserRouter future={{v7_startTransition: true, v7_relativeSplatPath: true}}>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<App />}></Route>
            <Route path="/list" element={<List />}></Route>
            <Route path="/detail" element={<Detail />}></Route>
          </Routes>
        </QueryClientProvider>
    </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
