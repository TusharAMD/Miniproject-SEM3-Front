import React from 'react';
import './App.css';
import Classifier from './components/Classifier/Classifier';
import Encrypt from './components/Encrypt/Encrypt';
import Decrypt from './components/Decrypt/Decrypt';
import ImageLIst from './components/ImageList/ImageList';
import ImageList1 from './components/ImageList1/ImageList1';
import Navigation from './components/Navigation/Navigation';
import Home from './components/Home/Home';
import Basic from './components/Basic';
import {Route, BrowserRouter, Switch} from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <div className='App'>
        <Switch>
          <Route exact path='/Encrypt' component={Encrypt} />
          <Route exact path='/Decrypt' component={Decrypt} />
          <Route exact path='/Home' component={Home} />
          <Route exact path='/ImageList' component={ImageLIst} />
          <Route exact path='/ImageList1' component={ImageList1} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
