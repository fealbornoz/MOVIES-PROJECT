const { Sequelize } = require("sequelize");
require("dotenv").config();

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
//Importar los modelos
const MovieModel = require("./models/Movie");

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/movies`,
  {
    logging: false,
  }
);


MovieModel(sequelize);

module.exports = { sequelize, ...sequelize.models };
