const Sequelize = require('sequelize')
const db = require('../database')

const Campuses = db.define('campus', {
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'http://pillboxmedia.com/images/senior-enrichment/school.png'
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
    }
}, {
        hooks: {
            beforeValidate: (instance) => {
                if (instance.name === '') {
                    throw new Error("The name field cannot be empty")
                }
                if (instance.address === '') {
                    throw new Error("The address field cannot be empty")
                }

                let nameArray = instance.name.split(' ')
                nameArray = nameArray.map((el, index) => {
                    if (el === 'of' && index !== 0) {
                        return el
                    }

                    if (el === 'the' && index !== 0) {
                        return el
                    }

                    let wordArray = el.split('')

                    if (wordArray.length <= 1 && index !== 0 && wordArray[0] !== "i") {
                        return el
                    }

                    let firstLetter = wordArray[0].toUpperCase()
                    wordArray.splice(0, 1, firstLetter)
                    return wordArray.join('')
                })
                instance.name = nameArray.join(' ')
            }
        }
    });

module.exports = Campuses