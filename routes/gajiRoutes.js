import express from 'express'
import GajiController from '../controllers/GajiController.js'
import AuthController from '../controllers/AuthController.js'

const router = express.Router()

router.route('/api/jabatan')
      .get(AuthController.checkSignin, GajiController.findAll)
      .post(AuthController.checkSignin, GajiController.create)

router.route('/api/jabatan/:id')
      .get(AuthController.checkSignin, GajiController.read)
      .put(AuthController.checkSignin, GajiController.update)
      .delete(AuthController.checkSignin, GajiController.destroy)

export default router;