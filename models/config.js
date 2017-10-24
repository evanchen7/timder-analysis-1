module.exports = {
  client: 'pg',
  version: '7.6',
  connection: {
    host : 'localhost',
    dialect: 'postgres',
    user : 'evanchen',
    password : '',
    database : 'timderanalysis'
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
};
