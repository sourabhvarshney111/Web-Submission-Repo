import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Checkbox from '../checkbox/Checkbox';
import checkboxes from '../checkbox/checkboxes';
import Radiobox from '../radiobox/Radiobox';
import radioboxes from '../radiobox/radioboxes';
import { connect } from 'react-redux';
import { register } from '../../actions/auth';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    password2: '',
    phone: '',
    address: '',
    identity: '',
    crops: [],
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

  const {
    name,
    phone,
    identity,
    password,
    password2,
    address,
    crops,
    lang,
    labels,
  } = formData;

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

  const handleCheckChange = (e) => {
    const item = e.target.name;
    if (e.target.checked) {
      crops.push(item);
      crops.sort();
    } else {
      crops.splice(
        crops.findIndex((each) => each === item),
        1
      );
    }
    setFormData({ ...formData, crops: crops });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (phone.length !== 10) {
      setAlert('Phone number is invalid', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, phone, identity, password, crops, address });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/profile' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i>Create Your Account
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
            type='text'
            value={name}
            onChange={(e) => onChange(e)}
            name='name'
            placeholder={labels[0]}
            required
          />
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
        <div className='form-group check'>
          <label className='form-text'>{labels[3]}: </label>
          {checkboxes.map((item, index) => (
            <span key={item.key}>
              <label className='form-text'>{labels[index + 4]}</label>
              <Checkbox
                className='m-2'
                name={item.name}
                checked={crops.includes(item.name)}
                onChange={(e) => handleCheckChange(e)}
              />
            </span>
          ))}
        </div>
        <div className='form-group'>
          <textarea
            value={address}
            onChange={(e) => onChange(e)}
            name='address'
            id='address'
            cols='30'
            rows='5'
            placeholder={labels[8]}
            required
          ></textarea>
        </div>
        <div className='form-group'>
          <input
            type='password'
            value={password}
            onChange={(e) => onChange(e)}
            name='password'
            placeholder={labels[9]}
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            value={password2}
            onChange={(e) => onChange(e)}
            name='password2'
            placeholder={labels[10]}
            minLength='6'
          />
        </div>
        <input type='submit' value='Register' className='btn btn-primary' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
