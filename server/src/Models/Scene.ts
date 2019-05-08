import Sequelize from 'sequelize';

import Database from '../Config/Database';

class Scene extends Sequelize.Model {};

Scene.init({
  name: { type: Sequelize.STRING, allowNull: false },
  config: { type: Sequelize.JSON, allowNull: false },
  createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  finishedAt: { type: Sequelize.DATE }
}, {
  sequelize: Database,
  modelName: 'scene'
});
