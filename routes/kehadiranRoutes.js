import express from 'express'
import kehadiranController from '../controllers/KehadiranController.js'

const router = express.Router()

router.route('/api/jabatan')
      .get(kehadiranController.findAll)
      .post(kehadiranController.create)

router.route('/api/jabatan/:id')
      .get(kehadiranController.read)
      .put(kehadiranController.update)
      .delete(kehadiranController.destroy)

export default router;