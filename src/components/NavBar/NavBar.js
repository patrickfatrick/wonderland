import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { debounce } from 'lodash';
import Controls from '../Controls';
import Chapters from '../Chapters';
import { truncate } from '../../lib/utils';
import styles from './NavBar.css';

export default class NavBar extends Component {
  state = {
    metadataNodeWidth: 0,
  }

  componentDidMount() {
    this.resizeObserver.observe(this.metadataNode);
  }

  componentWillUnmount() {
    this.resizeObserver.unobserve(this.metadataNode);
  }

  set metadataNodeWidth(width) {
    this.setState({ metadataNodeWidth: width });
  }

  get title() {
    const { info: { title } } = this.props;
    const { metadataNodeWidth } = this.state;
    return metadataNodeWidth < 250 ? truncate(title, 18) : title;
  }

  resizeObserver = new ResizeObserver(debounce((entries) => {
    const nodeWidth = entries[0].contentRect.width;
    this.metadataNodeWidth = nodeWidth;
  }, 100));

  render() {
    const {
      info,
      darkmode,
    } = this.props;

    return (
      <div
        className={
          classNames({
            [styles.navbar]: true,
            [styles.navbarDarkmodeOn]: darkmode,
          })
        }
      >
        {info && (
          <ul className={styles.navbarItems}>
            <li
              className={styles.metadata}
              ref={(node) => {
                this.metadataNode = node;
              }}
            >
              <span className={styles.title}>
                {this.title}
              </span>
              <br />
              {info.author}
            </li>
            <Controls />
            <Chapters />
          </ul>
        )}
      </div>
    );
  }
}

NavBar.propTypes = {
  info: PropTypes.shape({
    author: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  darkmode: PropTypes.bool.isRequired,
};
