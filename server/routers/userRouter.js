import jwt from 'jsonwebtoken';
const SECRET_KEY = 'blahblah';

import express from 'express';
const router = express.Router();

import User from '../db/schemas/User.js';

import auth from '../middleware/authMiddleware.js';
// const { auth } = require('../middleware/authMiddleware.js');

router.get('/', auth, (req, res, next) => {
    User.findAll().then((result) => {
        return res.status(200).json({
            code: 200,
            message: '토큰은 정상입니다.',
            data: result,
        });
    });
});

router.get('/:id', (req, res, next) => {
    User.findOne(req.params.id).then((result) => res.send(result));
});

router.post('/signup', async (req, res, next) => {
    const { email, password, name, address1, address2, zipCode } = req.body;
    const user = {
        email: email,
        password: password,
        address: {
            zipCode: zipCode,
            address1: address1,
            address2: address2,
        },
        name: name,
    };

    User.create(user)
        .then((user) => res.send(user))
        .catch((err) => res.status(500).send(err));
});

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;

    User.findOne({ email, password })
        .then((user) => {
            if (!user) return res.status(401).send();

            const token = jwt.sign(
                {
                    type: 'JWT',
                    email: email,
                },
                SECRET_KEY,
                {
                    expiresIn: '12h', // 만료시간 12시간
                    issuer: 'blahblah',
                }
            );

            res.status(200).json({
                code: 200,
                message: '토큰이 발급되었습니다.',
                token: token,
                user: JSON.stringify(user),
            });
        })
        .catch((err) => res.status(500).send(err));
});

export default router;
