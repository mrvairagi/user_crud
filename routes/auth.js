import express from 'express'
import validation from './validation_rules/rules.js'
import auth_c from '../app/controllers/auth_c.js'

const router = express.Router()

router.post('/register', validation.signUp, auth_c.register)
router.post('/login', validation.signIn, auth_c.login)

export default router