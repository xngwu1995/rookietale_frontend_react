/* eslint-disable import/no-unresolved */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '@containers/Login';
import Register from '@containers/Register';
import App from '@containers/App';
import { CxtProvider } from '@utils/context';
import Tweets from '@containers/Tweets';
import Comment from '@containers/Comment';
import CreateTweet from '@containers/CreateTweet';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CxtProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/tweets" element={<Tweets />} />
            <Route path="/createTweet" element={<CreateTweet />} />
            <Route path="/comments/:id" element={<Comment />} />
            <Route path="/search" element={<Tweets />} />
            <Route path="/message" element={<Tweets />} />
            <Route path="/tips" element={<Tweets />} />
            <Route path="/health" element={<Comment />} />

          </Route>

        </Routes>
      </BrowserRouter>
    </CxtProvider>
  </React.StrictMode>,
);
