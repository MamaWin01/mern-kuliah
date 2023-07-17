import AccountModel from '../models/account.js'
import jwt from 'jsonwebtoken'
import { expressjwt } from 'express-jwt'
import extend from 'lodash/extend.js'

// setup process.env
import dotenv from 'dotenv'
import account from '../models/account.js'
dotenv.config();

const jwtsecret = process.env.jwtsecret

const login = async (req, res, next) => {
  console.log(req.body)
  let user = await AccountModel.findOne({'name': req.body.name})

  if(!user || !user.authenticate(req.body.password)){
    return res.status(401).json({
      error: 'Email or password not match'
    })
  }

  const token = jwt.sign({
    _id: user._id
  }, jwtsecret, {
    algorithm: "HS256"
  })

  res.cookie("t", token, {
    expire: new Date() + 9999
  })

  return res.json({
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    }
  })
}

const register = async (req, res, next) => {
    const user = new AccountModel(req.body)
    try {
        await user.save()
        return res.status(200).json({
          message: 'Successfully signed up'
        })
      } catch (err){
        return res.status(500).json({
          error: err.message
        })
      }
}

const logout = async (req, res, next) => {
    res.clearCookie("t")
    return res.status(200).json({
      message: "Signed out"
    })
  }

const update = async (req, res) => {
    try {
      var user = await AccountModel.findOne({name: req.body.name})
      if(req.body.new_password.length < 6) {
        return res.status(500).json({
          error: "Password must be over 6 character"
        })
      }
      if(!user.authenticate(req.body.password)) {
        return res.status(500).json({
          error: "Password Wrong"
        })
      }
      req.body.name = req.body.new_name
      req.body.password = req.body.new_password
      user = extend(user, req.body)
      await user.save()
      user.hashed_password = undefined
      user.salt = undefined
      res.json(user)
    } catch (err) {
      return res.status(500).json({
        error: err.messages
      })
    }
  }

const checkSignin = expressjwt({
    secret: jwtsecret,
    algorithms: ["HS256"],
    userProperty: 'auth'
  })

export default {
  login,
  register,
  logout,
  update
}