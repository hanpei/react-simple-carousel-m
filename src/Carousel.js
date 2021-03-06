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
  static Item = CarouselItem;
  constructor(props) {
    super(props);
    this.lastX = 0;
    this.startX = 0;
    this.x = 0;
    this.index = 1;
    this.frameWitdh = undefined;
    this.frameLength = undefined;
    this.contentWidth = undefined;
  }

  componentDidMount() {
    this.init(this.contentRef);
  }

  init(el) {
    this.initFrames(el);
    this.getEleWidth(el);
    this.bindEvents(el);
    this.scrollToByIndex(this.index, 0);
  }
  initFrames(el) {
    const frames = el.childNodes;
    const firstFrame = frames[0].cloneNode(true);
    const lastFrame = frames[frames.length - 1].cloneNode(true);
    el.insertBefore(lastFrame, frames[0]);
    el.appendChild(firstFrame);
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

  onStart = e => {
    e.preventDefault();
    this.startX = e.touches[0].clientX;
    this.lastX = this.x;
  };
  onMove = e => {
    e.preventDefault();
    this.deltaX = e.touches[0].clientX - this.startX;
    this.x = this.deltaX + this.lastX;

    this.setTransform(this.contentRef, `translate3d(${this.x}px, 0, 0)`);
    this.setTransition(this.contentRef, `transform 0 ease`);
  };
  onFinish = e => {
    console.log(this.deltaX);
    const direction = this.getDirection(this.deltaX);
    console.log(direction);
    this.scrollToByIndex(this.index, 0.3, direction);
  };
  onEnd = () => {
    this.setTransition(this.contentRef, '');
  };

  getDirection(deltaX) {
    // 1: next,  -1: previous, 0: no move
    if (deltaX > 50) {
      return -1;
    } else if (deltaX < -50) {
      return 1;
    } else {
      return 0;
    }
  }

  scrollToByIndex(index, time, direction) {
    let i = index;
    if (direction === 1) {
      if (i >= this.frameLength - 2) {
        // this.scrollTo(this.deltaX, 0, 0);
        this.setTransform(this.contentRef, `translate3d(${this.deltaX}px, 0, 0)`);
        // console.log(this.x);
        setTimeout(() => {
          this.scrollTo(- this.frameWitdh, 0, 0.3);
        }, 10);
        return
      } else {
        i++;
      }
    } else if (direction === -1) {
      if (i <= 1) {
        i = this.frameLength - 1;
        this.scroll(-i * this.frameWitdh, 0, 0);
      } else {
        i--;
      }
    }
    const targetX = -i * this.frameWitdh;
    this.index = i;
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
    const { height, children } = this.props;
    return (
      <div>
        <h2>Carousel</h2>
        <div className={styles.container} style={{ height }}>
          <div
            className={styles.content}
            style={{ height }}
            ref={n => (this.contentRef = n)}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default Carousel;

function CarouselItem({ children, className, ...props }) {
  return (
    <div className={styles.item} {...props}>
      {children}
    </div>
  );
}
