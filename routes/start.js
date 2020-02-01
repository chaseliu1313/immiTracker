var express = require('express');
var router = express.Router();

router.get('/', async (req, res) => {
  try {
    res.status(200).json('server is running');
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;
