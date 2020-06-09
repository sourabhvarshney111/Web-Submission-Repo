const express = require('express');
const router = express.Router();

//@route    GET api/posts
//@desc     Posts
//@access   Public
router.get('/', (req, res) => {
  res.send('Post Route');
});

module.exports = router;
