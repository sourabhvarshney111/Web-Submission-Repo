const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');

//@route    GET api/auth
//@desc     Authentication
//@access   Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
//@route    GET api/auth
//@desc     Authentication of user and get token
//@access   Public
router.post(
  '/',
  [
    check('phone', 'Enter 10 digit valid phone number').isMobilePhone('en-IN'),
    check('identity', 'Enter a 12 digit valid aadhar number').isIdentityCard([
      'IN',
    ]),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { password, phone, identity } = req.body;

    try {
      //See if user exists already
      let user1 = await User.findOne({ phone });
      let user2 = await User.findOne({ identity });

      if (!user1 || !user2 || user1 === user2) {
        return res.status(400).json({
          errors: [{ msg: 'Invalid Credentials' }],
        });
      }

      const isMatch = await bcrypt.compare(password, user1.password);

      if (!isMatch) {
        return res.status(400).json({
          errors: [{ msg: 'Invalid Credentials' }],
        });
      }

      //return jsonwebtoken
      const payload = {
        user: {
          id: user1.id,
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
