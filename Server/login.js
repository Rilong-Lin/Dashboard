const express = require('express')
const bcrypt = require('bcryptjs')
const { getDb } = require('./db/connection')

const userRoutes = express.Router()
const userCollection = 'users'

userRoutes.use(express.urlencoded())

userRoutes.get('/', async (_req, res) => {
    const db = getDb()

    db.collection(userCollection)
        .find({}).limit(50)
        .toArray()
        .then(result => res.json(result))
        .catch(err => res.status(400).send({
            message: "Error fetching users!",
            error: err
        }))
})

userRoutes.post('/register', async (req, res) => {
    const requiredProperties = ['firstname', 'lastname', 'email', 'password', 'is_producteur']

    if (!req.body) {
        res.status(400).send({
            message: "Request body is missing",
            error: `Request body must contain the following properties: ${requiredProperties.toString()}`
        })
    }

    if (!requiredProperties.every(property => Object.keys(req.body).includes(property))) {
        console.log(req.body, requiredProperties)
        return res.status(400).send({
            message: "Request body is missing required property",
            error: `Request body must contain the following properties: ${requiredProperties.toString()}`
        })
    }

    const db = getDb()
    const userData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        fullname: `${req.body.firstname} ${req.body.lastname}`,
        email: req.body.email,
        password_encoded: bcrypt.hashSync(req.body.password),
        is_producteur: req.body.is_producteur,
        creation_date: Date.now(),
    }

    const existingUser = await db.collection(userCollection).findOne({ email: userData.email })
    if (existingUser) {
        return res.status(400).send({
            message: "User already exists",
            error: `A user with this adress email already exists: ${userData.email}`
        })
    }

    db.collection(userCollection)
        .insertOne(userData)
        .then(newUser => {
            console.log(`Added new user with id ${newUser.insertedId}`)
            res.json(newUser)
        })
        .catch(err => res.status(400).send({
            message: "Error inserting new user!",
            error: err
        }))
})

userRoutes.post('/login', async (req, res) => {
    const requiredProperties = ['email', 'password']

    if (!req.body) {
        res.status(400).send({
            message: "Request body is missing",
            error: `Request body must contain the following properties: ${requiredProperties.toString()}`
        })
    }

    if (!requiredProperties.every(property => Object.keys(req.body).includes(property))) {
        console.log(req.body, requiredProperties)
        return res.status(400).send({
            message: "Request body is missing required property",
            error: `Request body must contain the following properties: ${requiredProperties.toString()}`
        })
    }

    const db = getDb()

    db.collection(userCollection)
        .findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(400).send({
                    message: "User not found",
                    error: `This email adress is not associated to any user: ${req.body.email}`
                })
            }

            if (bcrypt.compareSync(req.body.password, user.password_encoded)) {
                res.send({
                    login: 'success',
                    is_producteur: user.is_producteur
                })
            } else {
                res.status(400).send({
                    login: 'denied',
                    message: "Wrong password",
                    error: `The registered password of this user does not match the given password: ${req.body.password}`
                })
            }
        })
        .catch(err => res.status(400).send({
            message: "Error fetching user!",
            error: err
        }))
})

module.exports = userRoutes
