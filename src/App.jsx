import React from 'react';
import PropTypes from 'prop-types';
import BookWrapper from './wrappers/BookWrapper';

function App({
  path,
}) {
  return (
    <div className="container">
      <BookWrapper path={path} />
    </div>
  );
}

App.propTypes = {
  path: PropTypes.string.isRequired,
};

export default App;
