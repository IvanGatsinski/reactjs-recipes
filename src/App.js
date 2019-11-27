import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainContainer from './components/MainContainer';
import Navigation from './components/common/Navigation';
import Footer from './components/common/Footer';
import Home from './components/Home';
import Login from './components/auth/login/Index';
import Register from './components/auth/register/Index';
import CreateRecipe from './components/recipes/Create';
import AuthProvider from './contexts/Auth';

function App() {

  return (
    <Router>
      <AuthProvider>
        <Navigation/>
          <MainContainer>
            <Route path="/" exact component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/recipe/create" component={CreateRecipe}/>
          </MainContainer>
        <Footer/>
      </AuthProvider>
    </Router>
  );
}

export default App;
