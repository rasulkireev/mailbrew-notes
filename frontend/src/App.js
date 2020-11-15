import React, { Component } from 'react';
import Main from './components/Main'

class App extends Component {
  render() {
    return (
      <div className="h-screen flex overflow-hidden bg-white">
          <Main />
      </div>
    );
  }
}
export default App;