import Karyawan from '../models/karyawan.js'
import Jabatan from '../models/jabatan.js'
import generator from '../helpers/generator.js'
import extend from 'lodash/extend.js'

const KaryawanProjections = {
  '_id': false,
  '__v': false
}

const findAll = async (req, res) => {
  try {
    let result = await Karyawan.find({}, KaryawanProjections)
    return res.status(200).json({result})
  } catch (err) {
    return res.status(500).json({
      error: err.messages
    })
  }
}

const create = async (req, res) => {
  req.body.id = generator.generateId(6)

  const jabatanid = await Jabatan.findOne({id:req.body.jabatan})
  req.body.jabatan = jabatanid

  const karyawan = new Karyawan(req.body)
  try {
    let result = await karyawan.save()
    return res.status(200).json({
      messages: 'Karyawan successfully added',
      result
    })
  } catch (err) {
    return res.status(500).json({
      error: 'Karyawan failed to be added',
    })
  }
}

const read = async (req, res) => {
  try {
    const karyawan = await Karyawan.findOne({id: req.params.id}, KaryawanProjections)
    return res.status(200).json(karyawan)
  } catch (err) {
    return res.status(500).json({
      error: err.messages
    })
  }

}

const update = async (req, res) => {
  try {
    var karyawan = await Karyawan.findOne({id: req.params.id})
    karyawan = extend(karyawan, req.body)
    karyawan.updated = Date.now()
    await karyawan.save()
    karyawan.hashed_password = undefined
    karyawan.salt = undefined
    res.json(karyawan)
  } catch (err) {
    return res.status(500).json({
      error: err.messages
    })
  }
}

const destroy = async (req, res) => {
  try {
    await Karyawan.deleteOne({id: req.params.id})
    return res.status(200).json({
      messages: 'Successfully deleted karyawan'
    })
  } catch (err) {
    return res.status(500).json({
      error: err.messages
    })
  }
}

const karyawanById = async (req, res, next, id) => {
  try {
    const karyawan = await Karyawan.findOne({id})
    req.karyawan = karyawan
    next()
  } catch (err) {
    return res.status(500).json({
      error: err.messages
    })
  }
}

export default {
  findAll,
  create,
  read,
  update,
  destroy,
  karyawanById
}