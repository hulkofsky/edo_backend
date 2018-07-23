const {Client} = require('pg')
const keys = require('./keys')
const Bookshelf = require('./database')
const projects = require('./tables/projects')
const project_statuses = require('./tables/project_statuses')
const contents = require('./tables/content')
const company_contacts = require('./tables/conpany_contacts')
const banks = require('./tables/banks')
const purchase_statuses = require('./tables/purchase_statuses')

//connecting to postgres
const postgresClient = new Client({
    host: keys.postgres.host,
    port: keys.postgres.port,
    user: keys.postgres.user,
    password: keys.postgres.password,
    database: keys.postgres.database
})

postgresClient.connect((err)=>{
    err ? console.log(`Postgres connection error: ${err}`) :
        console.log('Postgres connected!')
})

const Project = Bookshelf.Model.extend({
    tableName: 'projects',
    uuid: true
})
const Projects = Bookshelf.Collection.extend({
    model: Project
})

const Project_status = Bookshelf.Model.extend({
    tableName: 'project_statuses',
})
const Project_statuses = Bookshelf.Collection.extend({
    model: Project_status
})

const Content = Bookshelf.Model.extend({
    tableName: 'content',
})
const Contents = Bookshelf.Collection.extend({
    model: Content
})

const Company_contact = Bookshelf.Model.extend({
    tableName: 'company_contacts',
})
const Company_contacts = Bookshelf.Collection.extend({
    model: Company_contact
})

const Bank = Bookshelf.Model.extend({
    tableName: 'banks',
})
const Banks = Bookshelf.Collection.extend({
    model: Bank
})

const Purchase_status = Bookshelf.Model.extend({
    tableName: 'purchase_statuses',
    uuid: true
})
const Purchase_statuses = Bookshelf.Collection.extend({
    model: Purchase_status
})

//table purchase_statuses
purchase_statuses.forEach((item, i)=>{
    Purchase_status.forge({
        status_id: item.status_id,
        status_name: item.status_name
    })
        .save()
        .then(content=>{
            console.log(`Purchase_status ${i} successfully inserted`)
        })
        .catch(err=>{
            console.log(`Error while inserting Purchase_status ${i} - ${err}`)
        })
})

// //table banks
// banks.forEach((item, i)=>{
//     Bank.forge({
//         bank_id: item.bank_id,
//         name: item.name,
//         po_template_id: item.po_template_id,
//         tos_doc_id: item.tos_doc_id,
//         documents: item.documents
//     })
//         .save()
//         .then(content=>{
//             console.log(`Bank ${i} successfully inserted`)
//         })
//         .catch(err=>{
//             console.log(`Error while inserting Bank ${i} - ${err}`)
//         })
// })

// //table company_contacts
// company_contacts.forEach((item, i)=>{
//     Company_contact.forge({
//         contact: item.contact,
//     })
//         .save()
//         .then(content=>{
//             console.log(`Company_contact ${i} successfully inserted`)
//         })
//         .catch(err=>{
//             console.log(`Error while inserting Company_contact ${i} - ${err}`)
//         })
// })

// //table content
// contents.forEach((item, i)=>{
//     Content.forge({
//         page_name: item.page_name,
//         en: item.en,
//         he: item.he,
//     })
//     .save()
//     .then(content=>{
//         console.log(`content ${i} successfully inserted`)
//     })
//     .catch(err=>{
//         console.log(`Error while inserting content ${i} - ${err}`)
//     })
// })
//
// //table projects
// projects.forEach((item, i)=>{
//     Project.forge({
//         project_name: item.project_name,
//         project_description: item.project_description,
//         contact_person: item.contact_person,
//         project_team: item.project_team,
//         status_id: item.status_id,
//         project_price_nis: item.project_price_nis,
//         raised_funds_nis: item.raised_funds_nis,
//         video_url: item.video_url,
//         project_finish_date: item.project_finish_date,
//         min_unit_price: item.min_unit_price,
//         min_units: item.min_units
//     })
//     .save()
//     .then(project=>{
//         console.log(`project ${i} successfully inserted`)
//     })
//     .catch(err=>{
//         console.log(`Error while inserting project ${i} - ${err}`)
//     })
// })

//table project_statuses
// project_statuses.forEach((item, i)=>{
//     Project_status.forge({
//         status_id: item.status_id,
//         status_name: item.status_name,
//     })
//     .save()
//     .then(project_status=>{
//         console.log(`project_status ${i} successfully inserted`)
//     })
//     .catch(err=>{
//         console.log(`Error while inserting project_status ${i} - ${err}`)
//     })
// })







