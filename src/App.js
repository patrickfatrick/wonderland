import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader/root';
import Reader from './components/Reader';
import './styles/base.css';

function App({
  path,
}) {
  return (
    <div className="container">
      <Reader path={path} />
    </div>
  );
}

App.propTypes = {
  path: PropTypes.string.isRequired,
};

export default hot(App);
