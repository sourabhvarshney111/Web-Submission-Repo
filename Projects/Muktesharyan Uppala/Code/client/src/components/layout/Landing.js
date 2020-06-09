import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <section className='landing'>
      <div className='landing-inner'>
        <h1 className='x-large'>Kisan Hetu</h1>
        <p className='lead'>
          Create farmer account, sell your crops directly to end consumer
        </p>
        <div className='buttons'>
          <Link to='/register' className='btn btn-primary'>
            Sign Up
          </Link>
          <Link to='/login' className='btn'>
            Log In
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Landing;
