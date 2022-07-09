const { body, param } = require('express-validator');
const express = require('express');
const router = express.Router();
const container = require('../../container');

const FindSecretCommand = require('../../application/find_secret/find-secret-command');
const SaveSecretCommand = require('../../application/save_secret/save-secret-command');
const DeleteSecretCommand = require('../../application/delete_secret/delete-secret-command');

const NotFoundSecretError = require('../../domain/secret/errors/not-found-secret-error');
const AlreadyExistsSecretError = require('../../domain/secret/errors/already-exists-secret-error');
const FailedDecryptError = require('../../domain/errors/failed-decrypt-error');
const InvalidOrganizationError = require('../../domain/secret/errors/invalid-organisation-error');

const isTokenPresent = require('./middleware/token-is-present');
const httpValidator = require('./middleware/http-validator');

const { IS_STRING, IS_NUMBER, INVALID_LENGTH, NOT_EMPTY, INVALID_INT_RANGE } = require('./validation-values');

router.post('/',
  body('payload')
    .notEmpty().withMessage(NOT_EMPTY)
    .isString().withMessage(IS_STRING)
    .isLength({min:1, max:1000}).withMessage(`${INVALID_LENGTH} 1 and 1000`),
  body('expireAt')
    .notEmpty().withMessage(NOT_EMPTY)
    .isNumeric().withMessage(IS_NUMBER)
    .isInt({min:1, max: 43830 }).withMessage(`${INVALID_INT_RANGE} 1 and 43830`),
  httpValidator,
  isTokenPresent,
  async(req,res) => {

  const {payload, expireAt} = req.body;
  const {organisation} = req.token;
  console.log(organisation)

  try{
    const command = new SaveSecretCommand({payload, expireAt, organisation})
    const saveSecret = container.resolve('saveSecret');
    const response = await saveSecret.execute(command);

    res.status(200).json(response);
  } catch (err){
    console.log(err)
    if(err instanceof AlreadyExistsSecretError){
      res.status(404).json({message: err.message})
    }
    res.status(500).json({message: 'Something wrong'});
  }
});

router.get('/:id/:secretKey',
  param('id')
    .notEmpty().withMessage(NOT_EMPTY)
    .isString().withMessage(IS_STRING),
  param('secretKey')
    .notEmpty().withMessage(NOT_EMPTY)
    .isString().withMessage(IS_STRING),
  httpValidator,
  isTokenPresent, async(req,res) => {
  const {id, secretKey} = req.params;
  const {organisation} = req.token;

  try{
    const command = new FindSecretCommand({id, secretKey, organisation});
    const findSecret = container.resolve('findSecret');
    const response = await findSecret.execute(command);

    res.status(200).json(response);
  } catch (err){
    console.log(err)
    if(err instanceof NotFoundSecretError){
      res.status(404).json({message: err.message})
    }
    if(err instanceof FailedDecryptError){
      res.status(400).json({message: err.message})
    }
    if(err instanceof InvalidOrganizationError){
      res.status(401).json({message: err.message})
    }
    res.status(500).json({message: 'Something wrong'});
  }
});

router.delete('/:id', isTokenPresent, async (req,res) => {
  const { id } = req.params;
  const { organisation } = req.token;

  try{
    const command = new DeleteSecretCommand({id, organisation});
    const deleteSecret = container.resolve('deleteSecret');
    await deleteSecret.execute(command)

    res.status(204).json()
  } catch (err) {
    console.log(err);
    if(err instanceof NotFoundSecretError){
      res.status(404).json({message: err.message})
    }
    if(err instanceof InvalidOrganizationError){
      res.status(401).json({message: err.message})
    }
    res.status(500).json({message: 'Something wrong'});
  }
})

module.exports = router;
