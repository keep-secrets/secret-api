const express = require('express');
const router = express.Router();
const container = require('../../container');

const isTokenPresent = require('./middleware/token-is-present');

router.post('/', async(req,res) => {
  const {payload, expireAt} = req.body

  try{
    const saveSecret = container.resolve('saveSecret');
    const response = await saveSecret.execute({payload, expireAt});
    res.status(200).json(response);
  } catch (error){
    res.status(500).json(error)
  }
});

router.get('/:id/:secretKey', isTokenPresent, async(req,res) => {
  const {id, secretKey} = req.params;
  const { token } = req;

  try{
    const findSecret = container.resolve('findSecret');
    const response = await findSecret.execute({id, secretKey, token});
    res.status(200).json(response);
  } catch (error){
    res.status(500).json(error)
  }
});

module.exports = router;
