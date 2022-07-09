const express = require('express');
const router = express.Router();
const container = require('../../container');
const NotFoundSecretError = require('../../domain/secret/errors/not-found-secret-error');
const FindSecretCommand = require('../../application/find_secret/find-secret-command');

const isTokenPresent = require('./middleware/token-is-present');

router.post('/', async(req,res) => {
  const {payload, expireAt} = req.body

  try{
    const saveSecret = container.resolve('saveSecret');
    const response = await saveSecret.execute({payload, expireAt});
    res.status(200).json(response);
  } catch (err){
    res.status(500).json(err);
  }
});

router.get('/:id/:secretKey', isTokenPresent, async(req,res) => {
  const {id, secretKey} = req.params;
  const { token } = req;

  try{
    const command = new FindSecretCommand({id, secretKey, token})
    const findSecret = container.resolve('findSecret');
    const response = await findSecret.execute(command);

    res.status(200).json(response);
  } catch (err){
    if(err instanceof NotFoundSecretError){
      res.status(404).json({message: err.message})
    }
    res.status(500).json(err);
  }
});

router.delete('/:id', isTokenPresent, async (req,res) => {
  const { id } = req.params;
  const { token } = req;

  try{
    const deleteSecret = container.resolve('deleteSecret');
    await deleteSecret.execute({id, token})

    res.status(204).json()
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;
