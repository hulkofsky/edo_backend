const express = require('express')
const router = express.Router()
const {Client} = require('pg')
const keys = require('../config/keys')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Bookshelf = require('../config/database')
const _ = require('lodash')
const Validation = require('../utils/validation')
const {validateUrl} = require('youtube-validate')

const validation = new Validation

const Bank = Bookshelf.Model.extend({
    tableName: 'banks',
})
const Banks = Bookshelf.Collection.extend({
    model: Bank
})

const Investor = Bookshelf.Model.extend({
    tableName: 'investors',
})

const Investors = Bookshelf.Collection.extend({
    model: Investor
})

const Enterpreneur = Bookshelf.Model.extend({
    tableName: 'enterpreneurs',
})

const Enterpreneurs = Bookshelf.Collection.extend({
    model: Enterpreneur
})

//INVESTOR SIGNUP
router.post('/signupinvestor', (req,res)=>{
    const userData = req.body;

    //VALIDATION
    if(!validation.validateText(userData.first_name)){
        return res.json({success: false, message: 'First name validation failed'})
    }

    if(!validation.validateText(userData.last_name)){
        return res.json({success: false, message: 'Last name validation failed'})
    }

    if(!validation.validateEmail(userData.email)){
        return res.json({success: false, message: 'Email validation failed'})
    }

    if(!validation.validatePhone(userData.phone)){
        return res.json({success: false, message: 'Phone validation failed'})
    }

    if(!validation.validateAccountNum(userData.account_number)){
        return res.json({success: false, message: 'Account number validation failed'})
    }

    if(!validation.validatePass(userData.password)){
       return res.json({success: false, message: 'Password validation failed'})
    }

    if(!userData.agree){
        return res.json({success: false, message: 'Pls accept terms of service'})
    }

    //bcrypting password
    bcrypt.genSalt(10, (err,salt)=>{
        if (err){
            console.log(err, 'while crypting password(gensalt)')
        }
        bcrypt.hash(userData.password, salt, (err, hash)=>{
            if (err) {
                console.log(err, 'while crypting password')
            }else{
                //serching bank id in table BANKS
                Bank
                .where({name: userData.bank_name})
                .fetch({ columns: ['bank_id'] })
                .then(bank_id=>{
                    //checking email in investors and enterpreneurs tables
                    Investor
                    .where({email: userData.email})
                    .fetch()
                    .then(investorResult=> {
                        if (investorResult) {
                            res.json({success: false, message: 'User with this email exists'})
                        } else {
                            Enterpreneur
                            .where({company_email: userData.email})
                            .fetch()
                            .then(investorResult=> {
                                if (investorResult) {
                                    res.json({success: false, message: 'User with this email exists'})
                                } else {
                                    if (bank_id) {
                                        //adding user to table INVESTORS
                                        Investor.forge({
                                            first_name: userData.first_name,
                                            last_name: userData.last_name,
                                            email: userData.email,
                                            phone: userData.phone,
                                            bank_id: bank_id.get('bank_id'),
                                            password: hash,
                                            account_number: userData.account_number,
                                            email_conf: false,
                                            phone_conf: false
                                        }).save().then(collection => {
                                            res.json({success: true, data: {id: collection.get('id')}})
                                        }).catch(err => {
                                            res.status(500).json({success: false, data: {message: err.message}})
                                        })
                                    } else {
                                        return res.json({success: false, message: 'Bank validation failed'})
                                    }
                                }
                            })
                        }
                    })
                })

            }

        })
    })

})

//ENTERPRENEUR SIGNUP
router.post('/signupenterpreneur', (req,res)=>{
    const userData = req.body;

    //VALIDATION
    if(!validation.validateText(userData.company_name)){
        return res.json({success: false, message: 'Company name validation failed'})
    }

    if(!validation.validateVAT(userData.vat_number)){
        return res.json({success: false, message: 'VAT number validation failed'})
    }

    if(!validation.validateText(userData.ceo_name)){
        return res.json({success: false, message: 'CEO name validation failed'})
    }

    if(_.isEmpty(userData.country_of_registration)){
        return res.json({success: false, message: 'Country of Registration validation failed'})
    }

    if(!validation.validateEmail(userData.company_email)){
        return res.json({success: false, message: 'Company email validation failed'})
    }

    if(!validation.validatePhone(userData.company_phone)){
        return res.json({success: false, message: 'Company phone validation failed'})
    }

    if(!validation.validateMoney(userData.funding_sum)){
        return res.json({success: false, message: 'Funding sum validation failed'})
    }

    if(!validation.validateMoney(userData.last_year_sales)){
        return res.json({success: false, message: 'Company sales validation failed'})
    }

    if(!validation.validatePass(userData.password)){
        return res.json({success: false, message: 'Password validation failed'})
    }

    if(userData.video_url){
        if(!validation.validateVideoUrl(userData.video_url)){
            return res.json({success: false, message: 'Video url validation failed'})
        }
    }

    //bcrypting password
    bcrypt.genSalt(10, (err,salt)=>{
        if (err){
            console.log(err, 'while crypting password(gensalt)')
        }
        bcrypt.hash(userData.password, salt, (err, hash)=>{
            if (err) {
                console.log(err, 'while crypting password')
            }else{
                //checking email in investors and enterpreneurs tables
                Investor
                    .where({email: userData.company_email})
                    .fetch()
                    .then(investorResult=> {
                        if (investorResult) {
                            res.json({success: false, message: 'User with this email exists'})
                        } else {
                            Enterpreneur
                                .where({company_email: userData.company_email})
                                .fetch()
                                .then(investorResult=> {
                                    if (investorResult) {
                                        res.json({success: false, message: 'User with this email exists'})
                                    } else {
                                        //adding user to table INVESTORS
                                        Enterpreneur.forge({
                                            company_name: userData.company_name,
                                            vat_number: userData.vat_number,
                                            ceo_name: userData.ceo_name,
                                            country_of_registration: userData.country_of_registration,
                                            company_email: userData.company_email,
                                            company_phone: userData.company_phone,
                                            funding_sum: userData.funding_sum,
                                            last_year_sales: userData.last_year_sales,
                                            password: userData.password,
                                            email_conf: false,
                                            phone_conf: false,
                                            video_url: userData.video_url || '',
                                            // docs: [1,2,3,4],
                                            // team_members: [1,2,3],
                                            // projects: [1,2,3]
                                        }).save().then(collection => {
                                            res.json({success: true, data: {id: collection.get('id')}})
                                        }).catch(err => {
                                            res.status(500).json({success: false, data: {message: err.message}})
                                        })

                                    }
                                })
                        }
                    })


            }

        })
    })

})

router.post('/signin', (req,res)=>{
    if(!req.body.email||!req.body.password) {
        res.json({success: false, message: 'Pls enter email and password to sign in'})
    }else{
        const query = `SELECT * FROM users WHERE email='${req.body.email}'`
        postgresClient.query(query, (err, result)=>{
            if(err) {
                console.log(err, 'while selecting user from DB')
                return res.json({success: false, message: 'An error has been occured while getting user from DB'})
            }
            if(result.rows[0]) {
                const user = result.rows[0]

                bcrypt.compare(req.body.password, user.password, (err, isMatch)=>{
                    if (err) {
                        console.log(err)
                        return res.json({success: false, massage: `An error has been occured while comparing passwords ${err}`})
                    }
                    if(isMatch) {
                        console.log(user)
                        const token = jwt.sign(user, keys.secret, {
                            expiresIn: 10000 //in seconds
                        })
                        res.json({success: true, token: 'JWT ' + token})
                    }else{
                        res.json({success: false, message: 'Authentication failed. Passwords did not match'})
                    }
                })
            }else{
                res.json({success: false, message: 'User with this email not found'})
            }

        })
    }

})

module.exports = router