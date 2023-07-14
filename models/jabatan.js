import mongoose from 'mongoose'

const jabatanSchema = new mongoose.Schema({
  id: String,
  name: String,
  pokok: String,
  transportasi: String,
  makan: String
})

export default mongoose.model('Jabatan', jabatanSchema, 'Jabatan');