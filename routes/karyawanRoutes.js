import express from 'express'
import KaryawanController from '../controllers/KaryawanController.js'

const router = express.Router()

router.route('/api/karyawan')
      .get(KaryawanController.findAll)
      .post(KaryawanController.create)

router.route('/api/karyawan/:id')
      .get(KaryawanController.read)
      .put(KaryawanController.update)
      .delete(KaryawanController.destroy)

export default router;