"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "bids",
      [
        {
          email: "test@test.com",
          amount: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
          artworkId: 1,
        },

        {
          email: "test@test.com",
          amount: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
          artworkId: 2,
        },
        {
          email: "a@a.com",
          amount: 11,
          createdAt: new Date(),
          updatedAt: new Date(),
          artworkId: 1,
        },

        {
          email: "a@a.com",
          amount: 101,
          createdAt: new Date(),
          updatedAt: new Date(),
          artworkId: 2,
        },
        {
          email: "test@test.com",
          amount: 12,
          createdAt: new Date(),
          updatedAt: new Date(),
          artworkId: 1,
        },
        {
          email: "a@a.com",
          amount: 50,
          createdAt: new Date(),
          updatedAt: new Date(),
          artworkId: 3,
        },
        {
          email: "test@test.com",
          amount: 55,
          createdAt: new Date(),
          updatedAt: new Date(),
          artworkId: 3,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("bids", null, {});
  },
};
