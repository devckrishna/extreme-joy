const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: false,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    createSendToken(newUser, 201, res);
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new Error('Please provide email and password!'));
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new Error('Incorrect email or password'));
    }

    createSendToken(user, 200, res);
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err.message,
    });
  }
};

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      console.log(req.headers);
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next(
        new Error('You are not logged in! Please log in to get access.')
      );
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new Error('The user belonging to this token does no longer exist.')
      );
    }

    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new Error('User recently changed password! Please log in again.')
      );
    }

    req.user = currentUser;
    res.locals.user = currentUser;
    return next();
  } catch (err) {
    res.status(404).json({
      status: 'Fil',
      message: err,
    });
    next();
  }
  
};

exports.isLoggedIn = async (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      try {
        const decoded = await promisify(jwt.verify)(
          req.cookies.jwt,
          process.env.JWT_SECRET
        );

        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
          return next();
        }

        if (currentUser.changedPasswordAfter(decoded.iat)) {
          return next();
        }

        res.locals.user = currentUser;
        return next();
      } catch (err) {
        return next();
      }
    }
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err.message,
    });
  }
  next();
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new Error('There is no user with email address.'));
    }

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/resetPassword/${resetToken}`;

    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Your password reset token (valid for 10 min)',
        message,
      });

      res.status(200).json({
        status: 'success',
        message: 'Token sent to email!',
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });

      return next(
        new Error('There was an error sending the email. Try again later!'),
        500
      );
    }
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err.message,
    });
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return next(new Error('Token is invalid or has expired'));
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    createSendToken(user, 200, res);
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err.message,
    });
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('+password');

    if (
      !(await user.correctPassword(req.body.passwordCurrent, user.password))
    ) {
      return next(new Error('Your current password is wrong.'));
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();

    createSendToken(user, 200, res);
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err.message,
    });
  }
};
