const Sequelize = require( 'sequelize');
const User = require('../models/User');

const databaseConfig = require( '../config/database');

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    User.init(this.connection)
  }
}
module.exports = new Database();
