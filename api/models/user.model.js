const { DataTypes } = require('sequelize');
const sequelize = require('../config.db');
const bcrypt = require('bcrypt');
const validator = require('validator')

const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
});

const validateFields = (email, password) => {

    if (!email || !password) {
        throw Error('All fields must be filled.')
    }

    if (!validator.isEmail(email)) {
        throw Error('Please use a valid email.')
    }    
}

// Static Login Method

User.login = async function (email, password) {

    validateFields(email, password)

    const user = await this.findOne({ where: { email } });

    if (!user) {
        throw new Error('Invalid login credentials.');
    }

    const match = await bcrypt.compare(password, user.password)
    
    if(!match) {
        throw new Error('Invalid login credentials.');
    }

    return user;
};

// Static Signup Method

User.signup = async function (email, password) {

    validateFields(email, password)

    if (!validator.isStrongPassword(password)) {
        throw Error('The password should have an uppercase, lowercase, number, special character and minimum 8 characters.')
    }

    const exists = await this.findOne({ where: { email } });

    if (exists) {
        throw new Error('Email already in use.');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({ email, password: hash });

    return user;
};


User.sync().then(
    () => {
        console.log('User table is available.');
    }
).catch(
    (error) => {
        console.error('Unable to access table : ', error.message);
    }
)

module.exports = User;