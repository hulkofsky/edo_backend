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

    `CREATE TABLE IF NOT EXISTS company_contacts(
        id serial,
        contact TEXT NOT NULL
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

    `CREATE TABLE IF NOT EXISTS banks(
        id SERIAL,
        bank_id INT NOT NULL PRIMARY KEY,
        name TEXT NOT NULL,
        po_template_id TEXT NOT NULL,
        tos_doc_id TEXT,
        documents INT[]
    );`,


    `CREATE TABLE IF NOT EXISTS investors(
        id BIGSERIAL,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        bank_id INT NOT NULL REFERENCES banks (bank_id),
        password TEXT NOT NULL,
        account_number TEXT NOT NULL,
        email_conf BOOLEAN NOT NULL,
        phone_conf BOOLEAN NOT NULL,
        purchased_projects INT[],
        subscribed_projects INT[]
    );`,

    `CREATE TABLE IF NOT EXISTS purchase_statuses(
        id SERIAL,
        status_id INT NOT NULL PRIMARY KEY,
        status_name TEXT NOT NULL
    );`,

    `CREATE TABLE IF NOT EXISTS purchases(
        id BIGSERIAL,
        investor_id INT NOT NULL,
        project_id INT NOT NULL,
        bank_id INT NOT NULL,
        unit_count INT NOT NULL,
        unit_price_ils REAL NOT NULL,
        purchase_date TIMESTAMP NOT NULL,
        po_doc_id TEXT,
        status_id INT NOT NULL REFERENCES purchase_statuses (status_id),
        documents INT[]
    );`,

    `CREATE TABLE IF NOT EXISTS enterpreneurs(
        id BIGSERIAL,
        company_name TEXT NOT NULL,
        vat_number TEXT NOT NULL,
        ceo_name TEXT NOT NULL,
        country_of_registration TEXT NOT NULL,
        company_email TEXT NOT NULL,
        company_phone TEXT NOT NULL,
        funding_sum INT NOT NULL,
        last_year_sales INT NOT NULL,
        password TEXT NOT NULL,
        video_url TEXT,
        docs TEXT[],
        team_members INT[],
        email_conf BOOLEAN NOT NULL,
        phone_conf BOOLEAN NOT NULL,
        projects INT[]
    );`,

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