const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');

//@route    GET api/profile
//@desc     Get current user's User profile
//@access   Private
router.get('/', auth, async (req, res) => {
  try {
    const profile = await User.findOne({ name: req.user.id });
    if (!profile) {
      return res.status(400).json({ msg: 'No user profile exists' });
    }
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
