// config/db.js

const { Pool } = require('pg');

// Configure and initialize PostgreSQL connection pool
const pool = new Pool({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
});

// Export the pool to be used in other files
module.exports = {pool};
