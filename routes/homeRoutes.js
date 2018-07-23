const express = require('express')
const router = express.Router()
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

const Company_contact = Bookshelf.Model.extend({
    tableName: 'company_contacts',
})
const Company_contacts = Bookshelf.Collection.extend({
    model: Company_contact
})

//get HOMEPAGE
router.get('/', (req,res)=>{
    const lang = req.get('language')
    Projects.forge().fetch({withRelated: ['project_statuses']}).then(projectsResult=>{ //selecting ALL projects
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

//get HOW DOES IT WORK
router.get('/howdoesitwork', (req,res)=>{
    const lang = req.get('language')
    Content
        .where({page_name: 'header',}) //selecting HEADER translation
        // .orWhere('page_name', 'home')
        // .orWhere('page_name', 'footer')
        .fetch({ columns: [lang] })
        .then(headerTranslation=>{
            Content
                .where({page_name: 'how_does_it_work',}) //selecting HOW DOES IT WORK translation
                .fetch({ columns: [lang] })
                .then(homePageTranslation=>{
                    Content
                        .where({page_name: 'footer'}) //selecting FOOTER translation
                        .fetch({ columns: [lang] })
                        .then(footerTranslation=>{
                            res.json({success: true,
                                data: {
                                    langContent: {headerTranslation, homePageTranslation, footerTranslation},
                                }
                            })
                        })
                })

        }).catch(err=>{
            res.status(500).json({success: false, data: {message: err.message}})
        })
})

//get ABOUT US
router.get('/aboutus', (req,res)=>{
    const lang = req.get('language')
    Content
        .where({page_name: 'header',}) //selecting HEADER translation
        // .orWhere('page_name', 'home')
        // .orWhere('page_name', 'footer')
        .fetch({ columns: [lang] })
        .then(headerTranslation=>{
            Content
                .where({page_name: 'about_us',}) //selecting ABOUT US translation
                .fetch({ columns: [lang] })
                .then(aboutTranslation=>{
                    Content
                        .where({page_name: 'footer'}) //selecting FOOTER translation
                        .fetch({ columns: [lang] })
                        .then(footerTranslation=>{
                            res.json({success: true,
                                data: {
                                    langContent: {headerTranslation, aboutTranslation, footerTranslation},
                                }
                            })
                        })
                })

        }).catch(err=>{
            res.status(500).json({success: false, data: {message: err.message}})
        })
})

//get HOW WE R WORKING(ENTERPRENEUR SEEKING FUNDING)
router.get('/howweareworking', (req,res)=>{
    const lang = req.get('language')
    Content
        .where({page_name: 'header',}) //selecting HEADER translation
        // .orWhere('page_name', 'home')
        // .orWhere('page_name', 'footer')
        .fetch({ columns: [lang] })
        .then(headerTranslation=>{
            Content
                .where({page_name: 'enterpreneur_seeking',}) //selecting HOW WE ARE WORKING translation
                .fetch({ columns: [lang] })
                .then(howTranslation=>{
                    Content
                        .where({page_name: 'footer'}) //selecting FOOTER translation
                        .fetch({ columns: [lang] })
                        .then(footerTranslation=>{
                            Company_contacts
                                .forge()
                                .fetch()
                                .then(contacts=>{
                                    res.json({success: true,
                                        data: {
                                            langContent: {headerTranslation, howTranslation, footerTranslation},
                                            company_contacts: contacts
                                        }
                                    })
                                })

                        })
                })

        }).catch(err=>{
        res.status(500).json({success: false, data: {message: err.message}})
    })
})

//get CONTACT US
router.get('/contactus', (req,res)=>{
    const lang = req.get('language')
    Content
        .where({page_name: 'header',}) //selecting HEADER translation
        // .orWhere('page_name', 'home')
        // .orWhere('page_name', 'footer')
        .fetch({ columns: [lang] })
        .then(headerTranslation=>{
            Content
                .where({page_name: 'contact_us',}) //selecting CONTACT US translation
                .fetch({ columns: [lang] })
                .then(contactTranslation=>{
                    Content
                        .where({page_name: 'footer'}) //selecting FOOTER translation
                        .fetch({ columns: [lang] })
                        .then(footerTranslation=>{
                            Company_contacts
                                .forge()
                                .fetch()
                                .then(contacts=>{
                                    res.json({success: true,
                                        data: {
                                            langContent: {headerTranslation, contactTranslation, footerTranslation},
                                            company_contacts: contacts
                                        }
                                    })
                                })
                        })
                })

        }).catch(err=>{
        res.status(500).json({success: false, data: {message: err.message}})
    })
})

//get LOG IN page
router.get('/login', (req,res)=>{
    const lang = req.get('language')
    Content
        .where({page_name: 'header',}) //selecting HEADER translation
        // .orWhere('page_name', 'home')
        // .orWhere('page_name', 'footer')
        .fetch({ columns: [lang] })
        .then(headerTranslation=>{
            Content
                .where({page_name: 'log_in',}) //selecting LOG IN page translation
                .fetch({ columns: [lang] })
                .then(loginTranslation=>{
                    Content
                        .where({page_name: 'footer'}) //selecting FOOTER translation
                        .fetch({ columns: [lang] })
                        .then(footerTranslation=>{
                            res.json({success: true,
                                data: {
                                    langContent: {headerTranslation, loginTranslation, footerTranslation},
                                }
                            })
                        })
                })

        }).catch(err=>{
        res.status(500).json({success: false, data: {message: err.message}})
    })
})

//get SIGN UP page
router.get('/signup', (req,res)=>{
    const lang = req.get('language')
    Content
        .where({page_name: 'header',}) //selecting HEADER translation
        // .orWhere('page_name', 'home')
        // .orWhere('page_name', 'footer')
        .fetch({ columns: [lang] })
        .then(headerTranslation=>{
            Content
                .where({page_name: 'sign_up',}) //selecting SIGN UP page translation
                .fetch({ columns: [lang] })
                .then(loginTranslation=>{
                    Content
                        .where({page_name: 'footer'}) //selecting FOOTER translation
                        .fetch({ columns: [lang] })
                        .then(footerTranslation=>{
                            res.json({success: true,
                                data: {
                                    langContent: {headerTranslation, loginTranslation, footerTranslation},
                                }
                            })
                        })
                })

        }).catch(err=>{
        res.status(500).json({success: false, data: {message: err.message}})
    })
})

//get project page by id
router.get('/project/:id', (req,res)=>{
    Project.forge({id: req.params.id}).fetch({withRelated: ['project_statuses']}).then(project=>{
        res.json({success: true, data: project})
    }).catch(err=>{
        res.status(500).json({success: false, data: {message: err.message}})
    })
})

module.exports = router