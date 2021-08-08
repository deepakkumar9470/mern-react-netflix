import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from './context/authContext/AuthContext';
import { MovieContextProvider } from './context/movieContext/MovieContext';



ReactDOM.render(
    <AuthContextProvider>
       <MovieContextProvider>
           <App />
       </MovieContextProvider>
    </AuthContextProvider>,document.getElementById('root'));
