import React, { Component } from 'react';
import './App.css';
import ACAluminumStand from './components/designs/ACAluminumStand/ACAluminumStand'

export default class App extends Component {
  
  state = {
    appKey: 0
  }

  onRefreshClick = () => {
    this.setState({appKey: this.state.appKey+1})
  }

  render() {
    const { appKey } = this.state
    return (
        <ACAluminumStand key={appKey} onRefreshClick={this.onRefreshClick} />
    )
  }
}
