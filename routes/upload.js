const router = require('express').Router();

router.post('/', async (req, res) => {
  try {
    console.log(req.body)
    res.json('Upload success 123321')
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server Error')
  }
});

module.exports = router;
