const {Client} = require('pg')
const keys = require('./keys')

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

const tables = [
    `CREATE TABLE IF NOT EXISTS project_statuses(
        id SERIAL,
        status_id INT NOT NULL PRIMARY KEY,
        status_name TEXT NOT NULL
    );`,

    `CREATE TABLE IF NOT EXISTS projects(
        id BIGSERIAL,
        project_name TEXT NOT NULL,
        project_description TEXT NOT NULL,
        contact_person JSON NOT NULL,
        project_team JSON[],
        status_id INT NOT NULL REFERENCES project_statuses (status_id), 
        project_price_nis REAL NOT NULL, 
        raised_funds_nis REAL NOT NULL,
        video_url TEXT NOT NULL,
        project_finish_date TIMESTAMP NOT NULL,
        min_unit_price REAL,
        min_units INT
    );`,

    // `CREATE TABLE IF NOT EXISTS doc_templates(
    //     doc_template_uid INT NOT NULL PRIMARY KEY,
    //     path TEXT NOT NULL
    // );`,

    // `CREATE TABLE IF NOT EXISTS docs(
    //     doc_id INT NOT NULL PRIMARY KEY,
    //     doc_template_uid INT NOT NULL REFERENCES doc_templates (doc_template_uid),
    //     type TEXT,
    //     path TEXT NOT NULL
    // );`,

    // `CREATE TABLE IF NOT EXISTS banks(
    //     bank_uid INT NOT NULL PRIMARY KEY,
    //     name STRING NOT NULL,
    //     po_template_id TEXT NOT NULL,
    //     tos_doc_id TEXT,
    //     documents doc_id[]
    // );`,

    // `CREATE TABLE IF NOT EXISTS investors(
    //     contact JSON NOT NULL,
    //     password JSON NOT NULL,
    //     email_conf BOOLEAN NOT NULL,
    //     phone_conf BOOLEAN NOT NULL,
    //     bank_uid INT NOT NULL REFERENCES banks (bank_uid),
    //     bank_details JSON NOT NULL,
    //     purchases INT[]
    // );`,

    // `CREATE TABLE IF NOT EXISTS enterpreneurs(
    //     contact JSON NOT NULL,
    //     password JSON NOT NULL,
    //     email_conf BOOLEAN NOT NULL,
    //     phone_conf BOOLEAN NOT NULL,
    //     bank_uid STRING NOT NULL,
    //     bank_details JSON NOT NULL,
    //     purchases INT[]
    // );`,

    `CREATE TABLE IF NOT EXISTS content(
        id serial,
        page_name TEXT NOT NULL,
        he JSON NOT NULL,
        en JSON NOT NULL
    );`,
    
]

tables.forEach((item, i)=>{
    let query = item
    postgresClient.query(query, (err)=>{
        if(err) {
            console.log(`An error has been occured while creating table ${i} - ${err}`)
        } else {
            console.log(`Table ${i} succesfully created`)
        }
        
    })
})