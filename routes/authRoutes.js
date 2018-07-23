const express = require('express')
const router = express.Router()
const {Client} = require('pg')
const keys = require('../config/keys')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Bookshelf = require('./database')

const project_status = Bookshelf.Model.extend({
    tableName: 'project_statuses',
})

const project_statuses = Bookshelf.Collection.extend({
    model: project_status
})