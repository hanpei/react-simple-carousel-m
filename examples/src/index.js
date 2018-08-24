import React, { Component } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';

import Carousel from '../../src';

class App extends Component {
  render() {
    return (
      <div>
        <h1>demo</h1>
        <Carousel />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
