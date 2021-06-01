"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "artworks",
      [
        {
          title: "Between Flames",
          imageUrl:
            "https://external-preview.redd.it/nI3-AYNdmHvPlBJtN__6-c04iZNeB-6-N3dzC1rNCMk.jpg?auto=webp&s=bffd2240c23d718a50a824bd5f05fa66a02df86a",
          hearts: 20,
          minimumBid: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 3,
        },
        {
          title: "Grog's Ale",
          imageUrl:
            "https://art.ngfiles.com/medium_views/506000/506271_x0mbi3s_critical-role-grog-strongjaw.png?f1493243099",
          hearts: 10,
          minimumBid: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 3,
        },
        {
          title: "On The Titans Shoulders",
          imageUrl:
            "https://geekandsundry.com/wp-content/uploads/2017/08/Kent-Davis-@iDrawBagman.jpg",
          hearts: 5,
          minimumBid: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 3,
        },
        {
          title: "Mighty Nein",
          imageUrl:
            "https://i.pinimg.com/736x/89/ad/e9/89ade9172e39dc99e32735873d59979c.jpg",
          hearts: 1000,
          minimumBid: 500,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 3,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("artworks", null, {});
  },
};
