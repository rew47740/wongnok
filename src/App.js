import React, { Component } from 'react';
import './css/App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './HomePageInfo/HomePage';
import BookingPage from './Booking/BookingPage';
import InfoPage from './Booking/InfoPage';
import ConfirmInfo from './Confirm/ConfirmInfo';
import FinishPayMent from './Confirm/FinishPayment'

class App extends React.Component {
  render() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/ShowAvailableRoom' component={BookingPage}/>
        <Route path='/CustomerInfo' component={InfoPage}/>
        <Route path='/ComfirmInfo' component={ConfirmInfo}/>
        <Route path='/FinishPayment' component={FinishPayMent}/>
      </Switch>
    </Router>
  );
  }
}

export default App;
