/**
 * Database Models
 * Defines Sequelize models for User, Activity, and Feedback
 */
const { DataTypes } = require("sequelize");
const sequelize = require("./database");

/**
 * User Model - stores registered users (professors and students)
 */
const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING, // 'professor' or 'student'
    allowNull: false,
  },
});

/**
 * Activity Model - stores activities created by professors
 */
const Activity = sequelize.define("Activity", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  durationMinutes: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  professorId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

/**
 * Feedback Model - stores feedback reactions from students
 */
const Feedback = sequelize.define("Feedback", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  activityCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING, // 1=happy, 2=unhappy, 3=surprised, 4=confused
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

// Relationships
User.hasMany(Activity, { foreignKey: "professorId" });
Activity.belongsTo(User, { foreignKey: "professorId" });

Activity.hasMany(Feedback, { foreignKey: "activityCode", sourceKey: "code" });
Feedback.belongsTo(Activity, { foreignKey: "activityCode", targetKey: "code" });

module.exports = {
  User,
  Activity,
  Feedback,
};
