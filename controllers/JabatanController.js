import Jabatan from '../models/jabatan.js'
import generator from '../helpers/generator.js'
import extend from 'lodash/extend.js'

const JabatanProjections = {
  '_id': false,
  '__v': false
}

const findAll = async (req, res) => {
  try {
    let result = await Jabatan.find({}, JabatanProjections)
    return res.status(200).json({result})
  } catch (err) {
    return res.status(500).json({
      error: err.messages
    })
  }
}

const create = async (req, res) => {
  req.body.id = generator.generateId(6)
  
  const jabatan = new Jabatan(req.body)
  try {
    let result = await jabatan.save()
    return res.status(200).json({
      messages: 'Jabatan successfully added',
      result
    })
  } catch (err) {
    return res.status(500).json({
      error: err.messages
    })
  }
}

const read = async (req, res) => {
  try {
    const jabatan = await Jabatan.findOne({id: req.params.id}, JabatanProjections)
    return res.status(200).json(jabatan)
  } catch (err) {
    return res.status(500).json({
      error: err.messages
    })
  }

}

const update = async (req, res) => {
  try {
    var jabatan = await Jabatan.findOne({id: req.params.id})
    jabatan = extend(jabatan, req.body)
    jabatan.updated = Date.now()
    await jabatan.save()
    jabatan.hashed_password = undefined
    jabatan.salt = undefined
    res.json(jabatan)
  } catch (err) {
    return res.status(500).json({
      error: err.messages
    })
  }
}

const destroy = async (req, res) => {
  try {
    await Jabatan.deleteOne({id: req.params.id})
    return res.status(200).json({
      messages: 'Successfully deleted jabatan'
    })
  } catch (err) {
    return res.status(500).json({
      error: err.messages
    })
  }
}

const jabatanById = async (req, res, next, id) => {
  try {
    const jabatan = await Jabatan.findOne({id})
    req.jabatan = jabatan
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
  jabatanById
}