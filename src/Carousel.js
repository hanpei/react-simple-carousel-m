import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Carousel.css';

class Carousel extends Component {
  static propsTypes = {
    height: PropTypes.string
  };
  static defaultProps = {
    height: '200px'
  };
  constructor(props) {
    super(props);
    this.lastX = 0;
    this.startX = 0;
    this.x = 0;
    this.index = 1;
  }

  componentDidMount() {
    this.init(this.contentRef);
  }

  init(el) {
    this.initFrames(el);
    this.getEleWidth(el);
    this.bindEvents(el);
    this.scrollToByIndex(1, 0);
  }
  getEleWidth(el) {
    this.frameWitdh = el.getBoundingClientRect().width;
    this.frameLength = el.childNodes.length;
    this.contentWidth = this.frameWitdh * this.frameLength;
  }

  bindEvents = el => {
    el.addEventListener('touchstart', this.onStart);
    el.addEventListener('touchmove', this.onMove);
    el.addEventListener('touchend', this.onFinish);
    el.addEventListener('transitionend', this.onEnd);
  };
  removeEvents = el => {
    el.removeEventListener('touchstart', this.onStart);
    el.removeEventListener('touchmove', this.onMove);
    el.removeEventListener('touchend', this.onFinish);
    el.removeEventListener('transitionend', this.onEnd);
  };
  initFrames(el) {
    const frames = el.childNodes;
    console.log(frames);
    const firstFrame = frames[0].cloneNode(true);
    const lastFrame = frames[frames.length - 1].cloneNode(true);
    el.insertBefore(lastFrame, frames[0]);
    el.appendChild(firstFrame);
  }

  onStart = e => {
    console.log(this.index);
    e.preventDefault();
    this.startX = e.touches[0].clientX;
    this.lastX = this.x;
  };
  onMove = e => {
    e.preventDefault();
    this.deltaX = e.touches[0].clientX - this.startX;
    console.log(this.index);
    if (this.deltaX > 0 && this.index === 1) {
      this.scrollToByIndex(6, 0);
      this.index = 6;
      this.lastX = - this.frameWitdh *6;;
    } else if (this.deltaX < 0 && this.index === 5) {
      this.scrollToByIndex(0, 0);
      this.lastX = 0;
      this.index = 1;
    }
    this.x = this.deltaX + this.lastX;

    this.setTransform(this.contentRef, `translate3d(${this.x}px, 0, 0)`);
    this.setTransition(this.contentRef, `transform 0 ease`);
  };
  onFinish = e => {
    this.index = this.calcIndex(this.x);
    this.scrollToByIndex(this.index, 0.3);
    console.log(this.index, 'end');

  };
  onEnd = () => {
    this.setTransition(this.contentRef, '');
  };

  calcIndex(x) {
    let index = Math.abs(Math.round(x / this.frameWitdh));
    if (this.deltaX < -50) {
      index += 1;
    } else if (this.deltaX > 50) {
      index -= 1;
    }
    return index;
  }

  scrollToByIndex(index, time) {
    let i = index;
    const targetX = -i * this.frameWitdh;
    this.scrollTo(targetX, 0, time);
  }

  scrollTo(x, y, time) {
    if (this.x !== x) {
      this.x = x;
      this.setTransform(this.contentRef, `translate3d(${x}px, 0, 0)`);
      this.setTransition(this.contentRef, `transform ${time}s ease`);
    }
  }

  setTransform(el, value) {
    el.style.transform = value;
    el.style.webkitTransform = value;
  }

  setTransition(el, value) {
    el.style.transition = value;
    el.style.webkitTransition = value;
  }

  render() {
    const { height } = this.props;
    return (
      <div>
        <h2>Carousel</h2>
        <div className={styles.container} style={{ height }}>
          <div
            className={styles.content}
            style={{ height }}
            ref={n => (this.contentRef = n)}
          >
            <div className={styles.item} style={{ background: 'red' }}>
              1
            </div>
            <div className={styles.item} style={{ background: 'yellow' }}>
              2
            </div>
            <div className={styles.item} style={{ background: 'green' }}>
              3
            </div>
            <div className={styles.item} style={{ background: 'blue' }}>
              4
            </div>
            <div className={styles.item} style={{ background: 'orange' }}>
              5
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Carousel;
