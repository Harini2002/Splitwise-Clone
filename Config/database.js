import Pool from 'pg';

const pool=new Pool.Pool({
    user:"postgres",
    password :"root",
    host :"localhost",
    port:5432,
    database:"splitwise"
});

export {pool};