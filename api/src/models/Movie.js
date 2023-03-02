const { DataTypes } = require("sequelize");

const Movie = (sequelize) => {
  sequelize.define(
    "Movie",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      title: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
        validate: {
          validateLength(value) {
            if (value.length > 30) {
              throw new Error("The title is very long");
            }
          },
        },
      },
      image: {
        type: DataTypes.STRING(65535),
        allowNull: false,
        validate: {
          validateLength(value) {
            if (value.length > 65535) {
              throw new Error("The image is very heavy");
            }
          },
        },
      },
      overview: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
          validateLength(value) {
            if (value.length > 150) {
              throw new Error("The description is very long");
            }
          },
        },
      },
      release_date: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
          validateLength(value) {
            if (value.length > 10) {
              throw new Error("The date is very long");
            }
          },
        },
      },
      genres: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
          validateLength(value) {
            if (value.length > 10) {
              throw new Error("The genre is very long");
            }
          },
        },
      },
      popularity: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        validate: {
          validateLength(value) {
            if (value.length > 10) {
              throw new Error("The popularity is very long");
            }
          },
        },
      },
      created: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
    }
  );
};

module.exports = Movie;
