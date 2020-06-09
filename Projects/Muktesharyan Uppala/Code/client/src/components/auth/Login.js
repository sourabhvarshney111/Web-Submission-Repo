import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import Radiobox from '../radiobox/Radiobox';
import radioboxes from '../radiobox/radioboxes';

const Login = ({ setAlert, login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    password: '',
    phone: '',
    identity: '',
    lang: 'English ',
    labels: [
      'Name',
      'Phone Number',
      'Aadhar Card Number',
      'Crops',
      ' Fruits ',
      ' Grains ',
      ' Pulses ',
      ' Vegetables ',
      'Address',
      'Password',
      'Confirm Password',
    ],
  });

  const { phone, identity, password, lang, labels } = formData;

  const handleRadioChange = (e) => {
    const item = e.target.name;
    if (e.target.checked) {
      labels.splice(0, labels.length);
      radioboxes
        .filter((r) => r.name === item)[0]
        .labels.map((e) => labels.push(e));
      setFormData({ ...formData, lang: item, lables: labels });
    }
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (phone.length !== 10) {
      setAlert('Phone number is invalid', 'danger');
    } else {
      login(phone, identity, password);
    }
  };

  //if already logged in
  if (isAuthenticated) {
    return <Redirect to='/profile' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user'></i>Sign Into Your Account
      </p>
      <form onSubmit={(e) => onSubmit(e)} className='form'>
        <div className='form-group'>
          <label className='form-text'>Language (भाषा): </label>

          {radioboxes.map((radio) => (
            <span key={radio.key}>
              <label className='form-text'>{radio.name}</label>
              <Radiobox
                className='m-2'
                name={radio.name}
                checked={lang === radio.name}
                onChange={(e) => handleRadioChange(e, lang)}
              />
            </span>
          ))}
        </div>
        <div className='form-group'>
          <input
            type='number'
            value={phone}
            onChange={(e) => onChange(e)}
            name='phone'
            placeholder={labels[1]}
            minLength='10'
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            value={identity}
            onChange={(e) => onChange(e)}
            name='identity'
            placeholder={labels[2]}
            required
          />
        </div>

        <div className='form-group'>
          <input
            type='password'
            value={password}
            onChange={(e) => onChange(e)}
            name='password'
            placeholder={labels[9]}
            required
            minLength='6'
          />
        </div>

        <input type='submit' value='Log In' className='btn btn-primary' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, login })(Login);
