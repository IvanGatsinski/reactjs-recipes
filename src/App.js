import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import MainContainer from './components/MainContainer';
import Navigation from './components/common/Navigation';
import Footer from './components/common/Footer';
import Home from './components/common/Home';
import Login from './components/auth/login/Index';
import Register from './components/auth/register/Index';
import CreateRecipe from './components/recipes/Create';
import AuthProvider from './contexts/Auth';
import UserProvider from './contexts/User';
import RecipeProvider from './contexts/Recipe';
import PrivateRoute from './components/helpers/PrivateRoute';

function App() {

  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <Navigation/>
            <RecipeProvider>
              <MainContainer>
                <PrivateRoute path="/" exact component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/logout" render={props =>
                  <Redirect to="/login"/>
                }/>
                <Route path="/register" component={Register}/>
                <PrivateRoute path="/recipe/create" component={CreateRecipe}/>
              </MainContainer>
            </RecipeProvider>
          <Footer/>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
