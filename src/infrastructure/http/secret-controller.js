const express = require('express');
const router = express.Router();
const container = require('../../container');

router.post('/', async(req,res) => {
  const {payload, expireAt} = req.body

  try{
    const saveSecret = container.resolve('saveSecret');
    const response = await saveSecret.execute({payload, expireAt});
    res.status(200).json(response);
  } catch (error){
    console.log(error)
    res.status(500).json(error)
  }
});

module.exports = router;
