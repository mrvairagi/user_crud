import express from 'express'
import validation from './validation_rules/rules.js'
import users from '../app/controllers/users_c.js'

const router = express.Router()

router.get('/get_all', users.getAll)
router.post('/create', validation.signUp, users.create)
router.put('/update', validation.userUpdate, users.update)
router.delete('/delete', validation.userDelete, users.delete)

export default router;