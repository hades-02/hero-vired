const mongoose = require('mongoose');
const crypto = require('crypto');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please tell us your name!']
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, 'Please provide your email address!'],
      validate: [validator.isEmail, 'Please enter a valid email address!']
    },
    password: {
      type: String,
      minlength: 8,
      required: [true, 'Please provide a password!'],
      select: false
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please provide confirmed password!'],
      // This only works on CREATE and SAVE
      validate: {
        validator: function(el) {
          return el === this.password;
        },
        message: 'Confirmed password does not match with password!'
      }
    },
    passwordChangedAt: Date,
    loginOTP: String,
    loginOTPExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function(next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.methods.createloginOTP = function() {
  const loginOTP = '123456';

  this.loginOTP = crypto
    .createHash('sha256')
    .update(loginOTP)
    .digest('hex');

  console.log({ loginOTP }, this.loginOTP);

  this.loginOTPExpires = Date.now() + 5 * 60 * 1000;

  return loginOTP;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
