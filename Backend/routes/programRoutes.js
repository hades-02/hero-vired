const express = require('express');

const authController = require('./../controllers/authController');
const programController = require('./../controllers/programController');

const router = express.Router();

router.use(authController.protect);

// routes to create and get the programs
router
  .route('/')
  .get(programController.getAllPrograms)
  .post(programController.createProgram);

// routes to fetch , update or delete a program
router
  .route('/:id')
  .get(programController.getProgram)
  .patch(programController.updateProgram)
  .delete(programController.deleteProgram);

module.exports = router;
