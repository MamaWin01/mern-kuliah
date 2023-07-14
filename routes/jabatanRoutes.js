import express from 'express'
import JabatanController from '../controllers/JabatanController.js'

const router = express.Router()

router.route('/api/jabatan')
      .get(JabatanController.findAll)
      .post(JabatanController.create)

router.route('/api/jabatan/:id')
      .get(JabatanController.read)
      .put(JabatanController.update)
      .delete(JabatanController.destroy)

export default router;