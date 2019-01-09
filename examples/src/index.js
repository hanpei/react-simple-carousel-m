import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';

import Carousel from '../../src';

const colors = ['green', 'yellow', 'red', 'blue', 'orange'];

class App extends Component {
  render() {
    return (
      <Fragment>
        <h1>demo</h1>
        <Carousel>
          {colors.map((color, i) => (
            <Carousel.Item key={color}>
              <div
                style={{ backgroundColor: color, width: '100%', height: '100%' }}
              >
                {i}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
        <br />
        <br />
        <Carousel>
          <Carousel.Item >
            1
          </Carousel.Item>
        </Carousel>
      </Fragment>
    );
  }
}

render(<App />, document.getElementById('root'));
