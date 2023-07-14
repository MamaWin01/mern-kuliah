import express from 'express'
import UserController from '../controllers/UserController.js'

const router = express.Router()

router.route('/api/login')
      .post(UserController.login)

router.route('/api/register')
      .post(UserController.register)

router.route('/api/logout')
      .get(UserController.logout)

export default router
