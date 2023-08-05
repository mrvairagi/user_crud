import { validationResult } from 'express-validator'
import users_m from '../models/users_m.js'

class users_c {
    static getAll = async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        let result = await users_m.getAll()
        res.json(result)
    }

    static create = async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        let params = req.body
        let result = await users_m.create(params)
        res.json(result)
    }

    static update = async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        let params = req.body
        let result = await users_m.update(params)
        res.json(result)
    }

    static delete = async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        let params = req.body
        let result = await users_m.delete(params)
        res.json(result)
    }
}

export default users_c