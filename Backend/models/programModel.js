const mongoose = require('mongoose');
const validator = require('validator');

// Program model schema
const programSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Program must belong to a user.'],
    select: false
  },
  price: {
    type: Number,
    required: [true, 'Please enter the price']
  },
  domain: {
    type: String,
    enum: [
      'Data',
      'Finance',
      'Future Tech',
      'Management',
      'Business',
      'Designing',
      'Editing'
    ],
    required: [true, 'Please specify the domain']
  },
  placementAssurance: {
    type: String,
    enum: ['yes', 'no'],
    default: 'no'
  },
  name: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Please enter the name'],
    minlength: [5, 'Program name must have at least 5 characters'],
    maxlength: [40, 'Program name can have at most 40 characters']
  },
  programType: {
    type: String,
    enum: ['Part Time', 'Full Time'],
    required: [
      true,
      'Please specify the program type, PT (Part Time) or FT (Full Time)'
    ]
  },
  registrationOpen: {
    type: String,
    enum: ['yes', 'no'],
    required: [true, 'Please specify if registrations are open, yes or no']
  },
  universityName: {
    type: String,
    trim: true,
    required: [true, 'Please enter the university or partner name'],
    minlength: [5, 'University name must have at least 5 characters'],
    maxlength: [40, 'University name can have at most 40 characters']
  },
  qualification: {
    type: String,
    enum: ['Certificate', 'Diploma'],
    required: [
      true,
      'Please specify the qualification type, certificate or diploma'
    ]
  },
  duration: {
    type: Number,
    min: [0, 'Learning duration not valid'],
    required: [true, 'Please enter the learning duration (in months)']
  },
  criteria: {
    type: String,
    enum: ['None', 'Under Graduate', 'Post Graduate', 'Graduate'],
    default: 'None'
  },
  image: {
    type: String,
    required: [true, 'Please provide the image URL'],
    validate: [validator.isURL, 'Image URL is not valid']
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'Please give a description.'],
    minLength: [20, 'Description must have at least 20 characters'],
    maxlength: [300, 'Description can have at most 300 characters']
  },
  faculty: [
    {
      facultyName: {
        type: String,
        trim: true,
        required: [true, 'Please enter the faculty name'],
        minlength: [5, 'Faculty name must have at least 3 characters'],
        maxlength: [40, 'Faculty name can have at most 40 characters']
      },
      url: {
        type: String,
        validate: {
          validator: function(val) {
            if (val === '' || validator.isURL(val)) {
              return true;
            }
            return false;
          },
          message: 'Faculty Profile URL not valid'
        }
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now()
  },
  modifiedAt: Date
});

// Document middleware to set modifiedAt property if record is modified before save operation
programSchema.pre('save', function(next) {
  if (this.isModified()) {
    this.modifiedAt = Date.now();
  }
  next();
});

const Program = mongoose.model('Program', programSchema);

module.exports = Program;
