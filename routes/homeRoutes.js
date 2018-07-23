const express = require('express')
const projectRouter = express.Router()
const Bookshelf = require('../config/database')

const Project = Bookshelf.Model.extend({
    tableName: 'projects',
    project_statuses: function(){
        return this.belongsTo(project_status, 'status_id')
    },
})
const Projects = Bookshelf.Collection.extend({
    model: Project
})

const project_status = Bookshelf.Model.extend({
    tableName: 'project_statuses',
})

const project_statuses = Bookshelf.Collection.extend({
    model: project_status
})

const Content = Bookshelf.Model.extend({
    tableName: 'content'
})

const contentCollection = Bookshelf.Collection.extend({
    model: Content
})



//get all projects
projectRouter.get('/', (req,res)=>{
    const lang = req.get('language')
    Projects.forge().fetch({withRelated: ['project_statuses']}).then(projectsResult=>{
        console.log(lang, 'pageLanguage')
        Content
            .where({page_name: 'header',}) //selecting HEADER translation
            // .orWhere('page_name', 'home')
            // .orWhere('page_name', 'footer')
            .fetch({ columns: [lang] })
            .then(headerTranslation=>{
                Content
                    .where({page_name: 'home',}) //selecting HOMEPAGE translation
                    .fetch({ columns: [lang] })
                    .then(homePageTranslation=>{
                        Content
                            .where({page_name: 'footer'}) //selecting FOOTER translation
                            .fetch({ columns: [lang] })
                            .then(footerTranslation=>{
                                res.json({success: true,
                                    data: {
                                        langContent: {headerTranslation, homePageTranslation, footerTranslation},
                                        projects: projectsResult
                                    }
                                })
                            })
                    })

        }).catch(err=>{
            res.status(500).json({success: false, data: {message: err.message}})
        })

    }).catch(err=>{
        res.status(500).json({success: false, data: {message: err.message}})
    })
})



module.exports = projectRouter