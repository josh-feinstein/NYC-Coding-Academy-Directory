const Sequelize = require('sequelize')
const db = require('../database')

const Students = db.define('student', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '/images/default.gif'
    },
    gpa: {
        type: Sequelize.DECIMAL(10, 1),
        allowNull: false,
        defaultValue: 0.0,
        validate: {
            min: 0.0,
            max: 4.0
        }
    },
    campusId: {
        type: Sequelize.INTEGER,
        defaultValue: null
    }
}, {
        hooks: {
            beforeValidate: (instance) => {
                if (instance.firstName === '') {
                    throw new Error("The first name field cannot be empty")
                }
                if (instance.lastName === '') {
                    throw new Error("The last name field cannot be empty")
                }
                if (instance.email === '') {
                    throw new Error("The email field cannot be empty")
                }
                if (instance.gpa === "") {
                    instance.gpa = null;
                }
                if (instance.campusId === "") {
                    instance.campusId = null;
                }

                const firstNameArray = instance.firstName.split('')
                const firstLetter = firstNameArray[0].toUpperCase()
                firstNameArray.splice(0, 1, firstLetter)
                instance.firstName = firstNameArray.join('')

                const lastNameArray = instance.lastName.split('')
                const lastLetter = lastNameArray[0].toUpperCase()
                lastNameArray.splice(0, 1, lastLetter)
                instance.lastName = lastNameArray.join('')
            }
        }
    });

module.exports = Students