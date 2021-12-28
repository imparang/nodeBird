module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false, // 필수
    },
  }, 
  {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci', // 한글 저장
  })
  Comment.associate = db => {
    db.Post.belongsTo(db.User)
    db.Post.belongsTo(db.Post)
  }
  return Comment
}
