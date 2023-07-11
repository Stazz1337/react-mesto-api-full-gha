const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const {
  validateUserBody,
  validateAuth,
} = require('../middlewares/validations');

const NotFoundError = require('../errors/NotFoundError');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signin', validateUserBody, login);

router.post('/signup', validateAuth, createUser);

router.use(auth);

router.use(userRoutes);

router.use(cardRoutes);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Page not found'));
});

module.exports = router;
