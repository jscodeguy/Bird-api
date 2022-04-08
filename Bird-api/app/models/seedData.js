// seedData.js will be a script we can run from the terminal to populate data across our models easily and all at once.

// ********************************************************************
// ****** CAUTION *****************************************************
// ****** The script will first drop all documents ********************
// ****** ALL DATA DROPPED WILL BE GONE GONE GONE *********************
// ********************************************************************

// 1. Require Mongoose to make a database connection in the file
const mongoose = require("mongoose")
// 2. Get db config string from the file
const db = require("../../config/db")
// 3. Bring in our models
const Pictures = require("./picture")
const Favorites = require("./favorite")
const Sightings = require("./sighting")


// Seed data for Pictures
const starterPics = [
    { "source": "https://i.imgur.com/rRrA3zD.jpg",
        "description": "I can't believe I managed to get this shot!!",
        "bird": "1234_bird_id_from_api",
        "owner": "624b492a0eccccf59d938a54",
        "comments": {
            "note": "Jealous!",
            "author": "62502b4bbd6b824bf6232031"
        }
    },
    { "source": "https://i.imgur.com/Tjciztp.jpg",
        "description": "look at this colorful little guy",
        "bird": "2345_bird_id_from_api",
        "owner": "624b492a0eccccf59d938a54",
        "comments": {
            "note": "nature's paintbrush",
            "author": "62502b94ba169d0103170b88"
        },
        "comments": {
            "note": "I have a shirt just like that.",
            "author": "62502b4bbd6b824bf6232031"
        }
    },
    { "source": "https://i.imgur.com/vwmdEId.jpg",
        "description": "I love themmmm!",
        "bird": "3456_bird_id_from_api",
        "owner": "624b492a0eccccf59d938a54",
        "comments": {
            "note": "eww affection",
            "author": "62502b4bbd6b824bf6232031"
        },
        "comments": {
            "note": "SHUT UP THEY'RE PERFECT",
            "author": "62502b94ba169d0103170b88"
        }
    },
    { "source": "https://i.imgur.com/7gTOmsP.jpg",
        "description": "Pigeons need love too.",
        "bird": "2345_bird_id_from_api",
        "owner": "624b492a0eccccf59d938a54",
        "comments": {
            "note": "I LOVE YOU PIGEON",
            "author": "62502b94ba169d0103170b88"
        }
    },
    { "source": "https://i.imgur.com/ls7js2s.jpg",
        "description": "S'UP",
        "bird": "2345_bird_id_from_api",
        "owner": "624b492a0eccccf59d938a54",
        "comments": {
            "note": "first",
            "author": "62502b94ba169d0103170b88"
        }
    },
    { "source": "https://i.imgur.com/3SNfh0D.jpg",
        "description": "I will mess you up.",
        "bird": "1234_bird_id_from_api",
        "owner": "624b492a0eccccf59d938a54",
        "comments": {
            "note": "#mood",
            "author": "62502c20098d5ec2590901df"
        }
    }
]

// Seed data for Favorites
const starterFavs = [
    { "haveSeen": true,
        "owner": "624b492a0eccccf59d938a54",
        "note": "MY LIFE CHANGED",
        "bird": "2345_bird_id_from_api"
    },
    { "haveSeen": true,
        "owner": "624b492a0eccccf59d938a54",
        "note": "a precious son",
        "bird": "1234_bird_id_from_api"
    },
    { "haveSeen": true,
        "owner": "624b492a0eccccf59d938a54",
        "note": "blirdbo from my skies",
        "bird": "3456_bird_id_from_api"
    },
    { "haveSeen": false,
        "owner": "624b492a0eccccf59d938a54",
        "note": "I WANT MY LIFE TO CHANGE",
        "bird": "2345_bird_id_from_api"
    },
    { "haveSeen": false,
        "owner": "624b492a0eccccf59d938a54",
        "note": "One day... One day...",
        "bird": "4567_bird_id_from_api"
    },
    { "haveSeen": false,
        "owner": "624b492a0eccccf59d938a54",
        "note": "Does this bird even exist?",
        "bird": "4567_bird_id_from_api"
    }
]

// Seed data for Sightings
const starterSights = [
    { "where_seen": "My yard",
        "when_seen": "4/1/2022",
        "weather": "sun",
        "description": "It was a gorgeous day and the birds were twittery and perfect.",
        "owner": "624b492a0eccccf59d938a54",
        "bird": "1234_bird_id_from_api"
    },
    { "where_seen": "Albertsons parking lot",
        "when_seen": "2/27/2022",
        "weather": "snow",
        "description": "So cold, but the crows don't care.",
        "owner": "624b492a0eccccf59d938a54",
        "bird": "1234_bird_id_from_api"
    },
    { "where_seen": "out my window",
        "when_seen": "5/17/2020",
        "weather": "rain",
        "description": "AWESOME",
        "owner": "624b492a0eccccf59d938a54",
        "bird": "2345_bird_id_from_api"
    },
    { "where_seen": "The zoo (not in a cage though)",
        "when_seen": "9/9/21",
        "weather": "sun",
        "description": "Gave them a peanut! :D",
        "owner": "624b492a0eccccf59d938a54",
        "bird": "3456_bird_id_from_api"
    },
    { "where_seen": "In a tree",
        "when_seen": "2/2/22",
        "weather": "overcast",
        "description": "Just living their bird life.",
        "owner": "624b492a0eccccf59d938a54",
        "bird": "4567_bird_id_from_api"
    },
    { "where_seen": "flying",
        "when_seen": "4/20/22",
        "weather": "sun",
        "description": "so beautiful i cried",
        "owner": "624b492a0eccccf59d938a54",
        "bird": "4567_bird_id_from_api"
    }
]


//////////////////////////
// Seeding Collections
//////////////////////////
//
// Connect to the database via Mongoose (reference server.js)
mongoose.connect(db, {
	useNewUrlParser: true,
})
    // Remove all the documents currently in the database, then create a bunch of new documents in the collection from the appropriate array above.
    .then(() => {
        Pictures.remove({}).then(() => {
            Pictures.create(starterPics).then(() => {
                console.log("Pictures data seeded.")})
    .then(() => {
        Favorites.remove({}).then(() => {
            Favorites.create(starterFavs).then(() => {
                console.log("Favorites data seeded.")})
    .then(() => {
        Sightings.remove({}).then(() => {
            Sightings.create(starterSights).then(() => {
                console.log("Sightings data seeded.")
                // Close the db connection after the third seeding
                mongoose.connection.close()
    ////////////////////////////
    // Sightings error catchers
    ////////////////////////////
                })
                .catch(error => {
                    console.log(error)
                    mongoose.connection.close()
                })
            })
            .catch(error => {
                console.log(error)
                mongoose.connection.close()
            })
        })
        .catch(error => {
            console.log(error)
            mongoose.connection.close()
        })
    ////////////////////////////
    // Favorites error catchers
    ////////////////////////////
        })
        .catch(error => {
            console.log(error)
            mongoose.connection.close()
        })
    })
    .catch(error => {
    console.log(error)
    mongoose.connection.close()
    })
    ////////////////////////////
    // Pictures error catchers
    ////////////////////////////
        })
        .catch(error => {
            console.log(error)
            mongoose.connection.close()
        })
    })
    .catch(error => {
    console.log(error)
    mongoose.connection.close()
    })
//
//////////////////////////
// End seed script
//////////////////////////
