const Program = require('../models/programModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const filterObj = obj => {
  const allowedFields = [
    'user',
    'price',
    'domain',
    'placementAssurance',
    'name',
    'programType',
    'registrationOpen',
    'universityName',
    'qualification',
    'duration',
    'criteria',
    'image',
    'description',
    'faculty'
  ];

  const newObj = {};

  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

// controller function to send all programs of logged in user
exports.getMyPrograms = catchAsync(async (req, res) => {
  const programs = await Program.find({ user: req.user._id });

  res.status(200).json({
    status: 'success',
    results: programs.length,
    data: {
      programs
    }
  });
});

// controller function to send a program
exports.getProgram = catchAsync(async (req, res, next) => {
  const program = await Program.findById(req.params.id);

  if (!program) {
    return next(new AppError('No program found with this ID!', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Updated successfully',
    data: program
  });
});

// controller function to send all the programs in DB
exports.getAllPrograms = catchAsync(async (req, res) => {
  // Get all filtered programs
  const features = new APIFeatures(
    Program.find({ user: req.user._id }),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const programs = await features.query;

  res.status(200).json({
    status: 'success',
    results: programs.length,
    data: {
      programs
    }
  });
});

// controller function to create a new program from provided input
exports.createProgram = catchAsync(async (req, res, next) => {
  if (!req.body.user) req.body.user = req.user._id;

  // Filter out unwanted fields that are not allowed
  const filteredBody = filterObj(req.body);

  const newProgram = await Program.create(filteredBody);

  res.status(201).json({
    status: 'success',
    message: 'Program added successfully!',
    data: newProgram
  });
});

// controller function to update fields of a program
exports.updateProgram = catchAsync(async (req, res, next) => {
  // Filter out unwanted fields that are not allowed
  const filteredBody = filterObj(req.body);

  const program = await Program.findByIdAndUpdate(req.params.id, filteredBody, {
    new: true,
    runValidators: true
  });

  if (!program) {
    return next(new AppError('No program found with this ID!', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Program updated successfully',
    data: program
  });
});

// controller function to delete a program
exports.deleteProgram = catchAsync(async (req, res, next) => {
  const program = await Program.findByIdAndDelete(req.params.id);

  if (!program) {
    return next(new AppError('No program found with this ID!', 404));
  }

  res.status(204).json({
    status: 'success',
    message: 'Program deleted successfully.',
    data: null
  });
});
