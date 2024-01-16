const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const userRoutes = require('./routes/userRoutes');
const programRoutes = require('./routes/programRoutes');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

const corsOptions = {
  origin: true
};

// 1) MIDDLEWARES

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same IP address
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again after an hour.'
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json());

// Use CORS options
app.use(cors(corsOptions));

// Data Sanitization against NoSQL query injection
app.use(mongoSanitize());

// // Data Sanitization against XSS (Cross Site Request Forgery)
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'price',
      'domain',
      'name',
      'universityName',
      'duration',
      'criteria',
      'faculty'
    ]
  })
);

// 3) ROUTES
app.use('/api/v1/users', userRoutes);

app.use('/api/v1/programs', programRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on this server!`, 404));
});

// error middleware
app.use(globalErrorHandler);

module.exports = app;
