module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User', //MYSQL에는 users로 테이블 생성
    {
      //id는 mysql에서 자동으로 들어감
      email: {
        type: DataTypes.STRING(30), //데이터의 타입을 명시
        allowNull: false, //필수여부 true:필수 아님,false:필수
        unique: true, //유일한 값
      },
      nickname: {
        type: DataTypes.STRING(30), //데이터의 타입을 명시
        allowNull: false, //필수여부 true:필수 아님,false:필수
      },
      password: {
        type: DataTypes.STRING(100), //암호화를 했기에 비밀번호가 길음
        allowNull: false, //필수여부 true:필수 아님,false:필수
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci', //한글 저장을 위한 설정
    }
  )
  User.associate = (db) => {
    db.User.hasMany(db.Post)
    db.User.hasMany(db.Comment)
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' }) //as로 별칭을 붙임. 대문자로 시작
    db.User.belongsToMany(db.User, {
      through: 'Follow', //테이블 이름
      as: 'Followers', //컬럼 이름
      foreignKey: 'FollowingId', //참고할 키 이름 변경
      //서로 다른 테이블끼리는 키 이름이 다르게 나오지만 같은 테이블끼리는 같은 Id이름이라서 구분하기 위해..
    })
    db.User.belongsToMany(db.User, {
      through: 'Follow',
      as: 'Followings',
      foreignKey: 'FollowerId',
    })
  }
  return User
}
