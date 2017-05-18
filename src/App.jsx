import React from 'react';
import PropTypes from 'prop-types';
import ReaderWrapper from './wrappers/ReaderWrapper';
import './styles/base.css';

function App({
  path,
}) {
  return (
    <div className="container">
      <ReaderWrapper path={path} />
    </div>
  );
}

App.propTypes = {
  path: PropTypes.string.isRequired,
};

export default App;
