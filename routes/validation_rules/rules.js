import { check } from 'express-validator'

export default {
    signIn : [
        check('email').exists().withMessage('Email is Required').isEmail().withMessage('Please Enter Valid Email'),
        check('password').exists().withMessage('Password is Required').not().isEmpty().withMessage("Password can not be empty").isLength({ min: 6, max: 16 }).withMessage('Please Enter 6 to 16 Digit Password'),
    ],
    signUp : [
        check('name').exists().withMessage("Name is Required").not().isEmpty().withMessage("Name can not be empty"),
        check('email').exists().withMessage('Email is Required').isEmail().withMessage('Please Enter Valid Email'),
        check('password').exists().withMessage('Password is Required').not().isEmpty().withMessage("Password can not be empty").isLength({ min: 6, max: 16 }).withMessage('Please Enter 6 to 16 Digit Password'),
    ],
    userUpdate : [
        check('name').exists().withMessage("Name is Required").not().isEmpty().withMessage("Name can not be empty"),
        check('email').exists().withMessage('Email is Required').isEmail().withMessage('Please Enter Valid Email')
    ],
    userDelete : [
        check('id').exists().withMessage("Id is Required").not().isEmpty().withMessage("Id can not be empty")
    ]

}