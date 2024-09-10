const { Pool } = require('pg'); // Substituir por PostgreSQL

const pool = new Pool({
    connectionString: 'postgresql://user_db:616SgPRstweBDis3Rh77kWMIfRU9oy6d@dpg-crg5vut6l47c73dsfh1g-a/veiculos_67lu'
});

module.exports = pool;
