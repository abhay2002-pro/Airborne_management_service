'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Check if columns exist before removing them
    const table = await queryInterface.describeTable('Cities');
    
    if (table.allowNull) {
      await queryInterface.removeColumn('Cities', 'allowNull');
    }
    
    if (table.unique) {
      await queryInterface.removeColumn('Cities', 'unique');
    }
  },

  async down(queryInterface, Sequelize) {
    // Add the columns back if needed (for rollback)
    await queryInterface.addColumn('Cities', 'allowNull', {
      type: Sequelize.BOOLEAN,
    });
    await queryInterface.addColumn('Cities', 'unique', {
      type: Sequelize.BOOLEAN,
    });
  }
};