import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { CurrentUserProvider } from './contexts/CurrentUserContext';
import { ProfileDataProvider } from './contexts/ProfileDataContext';
import {createRoot} from 'react-dom/client';

// ReactDOM.render(
//   // <React.StrictMode>
//     <Router>
//       <CurrentUserProvider>
//         <ProfileDataProvider>
//           <App />
//         </ProfileDataProvider>
//       </CurrentUserProvider>
//     </Router>,
//   // </React.StrictMode>,
//   document.getElementById('root')
// );

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <Router>
    <CurrentUserProvider>
      <ProfileDataProvider>
        <App />
      </ProfileDataProvider>
    </CurrentUserProvider>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
