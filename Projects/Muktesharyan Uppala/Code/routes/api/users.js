const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User');

//@route    GET api/users
//@desc     Registration of users
//@access   Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
    check('phone', 'Enter a 10 digit valid phone number').isMobilePhone(
      'en-IN'
    ),
    check('identity', 'Enter a 12 digit valid aadhar number').isIdentityCard([
      'IN',
    ]),
    check('address', 'Address is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    req.body.identity = req.body.identity.replace(/\s/g, '');
    const { name, password, phone, identity, crops, address } = req.body;
    try {
      //See if user exists already
      let user = await User.findOne({ phone });
      if (user) {
        return res.status(400).json({
          errors: [{ msg: 'User with Phone number already exists' }],
        });
      }
      user = await User.findOne({ identity });
      if (user) {
        return res.status(400).json({
          errors: [{ msg: 'User with Aadhar number already exists' }],
        });
      }

      user = new User({
        name,
        password,
        crops,
        phone,
        identity,
        address,
      });

      //Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      //return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
