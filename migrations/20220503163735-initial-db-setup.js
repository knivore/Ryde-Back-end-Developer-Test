const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "GeoLocation", deps: []
 * createTable() => "Users", deps: []
 * createTable() => "UserAddresses", deps: [Users, GeoLocation]
 *
 */

const info = {
  revision: 1,
  name: "noname",
  created: "2021-04-24T16:35:18.648Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "GeoLocation",
      {
        geo_id: {
          type: Sequelize.BIGINT,
          field: "geo_id",
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        latitude: {
          type: Sequelize.DOUBLE,
          field: "latitude",
          allowNull: true,
        },
        longitude: {
          type: Sequelize.DOUBLE,
          field: "longitude",
          allowNull: true,
        },
        created_by: {
          type: Sequelize.STRING(255),
          field: "created_by",
          allowNull: false,
        },
        created_date: {
          type: Sequelize.DATE,
          field: "created_date",
          allowNull: false,
        },
        updated_by: {
          type: Sequelize.STRING(255),
          field: "updated_by",
          allowNull: false,
        },
        updated_date: {
          type: Sequelize.DATE,
          field: "updated_date",
          allowNull: false,
        },
        version: {
          type: Sequelize.INTEGER,
          field: "version",
          defaultValue: 0,
          allowNull: false,
        },
      },
      { charset: "utf8mb4", transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Users",
      {
        user_id: {
          type: Sequelize.BIGINT,
          field: "user_id",
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        email: {
          type: Sequelize.STRING(255),
          field: "email",
          unique: "uq_user_email",
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(255),
          field: "password",
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING(255),
          field: "username",
          allowNull: true,
        },
        first_name: {
          type: Sequelize.STRING(255),
          field: "first_name",
          allowNull: true,
        },
        last_name: {
          type: Sequelize.STRING(255),
          field: "last_name",
          allowNull: true,
        },
        gender: {
          type: Sequelize.STRING(255),
          field: "gender",
          allowNull: true,
        },
        date_of_birth: {
          type: Sequelize.DATE,
          field: "date_of_birth",
          allowNull: true,
        },
        created_by: {
          type: Sequelize.STRING(255),
          field: "created_by",
          allowNull: false,
        },
        created_date: {
          type: Sequelize.DATE,
          field: "created_date",
          allowNull: false,
        },
        updated_by: {
          type: Sequelize.STRING(255),
          field: "updated_by",
          allowNull: false,
        },
        updated_date: {
          type: Sequelize.DATE,
          field: "updated_date",
          allowNull: false,
        },
        version: {
          type: Sequelize.INTEGER,
          field: "version",
          defaultValue: 0,
          allowNull: false,
        },
      },
      { charset: "utf8mb4", transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "UserAddresses",
      {
        address_id: {
          type: Sequelize.BIGINT,
          field: "address_id",
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        user_id: {
          type: Sequelize.BIGINT,
          field: "user_id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Users", key: "user_id" },
          allowNull: true,
        },
        geo_id: {
          type: Sequelize.BIGINT,
          field: "geo_id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "GeoLocation", key: "geo_id" },
          allowNull: true,
        },
        address_line_1: {
          type: Sequelize.STRING(255),
          field: "address_line_1",
          allowNull: true,
        },
        address_line_2: {
          type: Sequelize.STRING(255),
          field: "address_line_2",
          allowNull: true,
        },
        address_line_3: {
          type: Sequelize.STRING(255),
          field: "address_line_3",
          allowNull: true,
        },
        country_code: {
          type: Sequelize.STRING(255),
          field: "country_code",
          allowNull: true,
        },
        postal_code: {
          type: Sequelize.STRING(255),
          field: "postal_code",
          allowNull: true,
        },
        created_by: {
          type: Sequelize.STRING(255),
          field: "created_by",
          allowNull: false,
        },
        created_date: {
          type: Sequelize.DATE,
          field: "created_date",
          allowNull: false,
        },
        updated_by: {
          type: Sequelize.STRING(255),
          field: "updated_by",
          allowNull: false,
        },
        updated_date: {
          type: Sequelize.DATE,
          field: "updated_date",
          allowNull: false,
        },
        version: {
          type: Sequelize.INTEGER,
          field: "version",
          defaultValue: 0,
          allowNull: false,
        },
      },
      { charset: "utf8mb4", transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["GeoLocation", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Users", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["UserAddresses", { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (this.useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
      execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
      execute(queryInterface, sequelize, rollbackCommands),
  info,
};
