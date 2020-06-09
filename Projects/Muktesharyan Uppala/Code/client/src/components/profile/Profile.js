import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Profile = ({ isAuthenticated, loading, user }) => {
  if (!isAuthenticated) {
    return <Redirect to='/login' />;
  }
  return (
    !loading && (
      <Fragment>
        <h1 className='large text-primary'>Profile</h1>
        <div className='profile'>
          Welcome, {user.name}
          <br />
          <label>Your crops</label>
          <span className='crops'>
            <ul>
              {user.crops.map((crop) => (
                <li key={crop}>{crop}</li>
              ))}
            </ul>
          </span>
          <label>Phone Number </label>
          {user.phone}
          <br />
          <label>Address </label>
          {user.address}
          <br />
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
      </Fragment>
    )
  );
};

Profile.protoTypes = {
  auth: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  loaded: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loaded: state.auth.loaded,
  user: state.auth.user,
});

export default connect(mapStateToProps)(Profile);
