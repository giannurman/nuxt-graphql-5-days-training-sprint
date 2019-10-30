const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      unique: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: false,
    },
  });
  
  return User;
};
// export default user;
module.exports = user