var mongoose = require('mongoose');
var crypto = require('crypto');
var log = require('../libs/log')(module);


var User = new mongoose.Schema({
    name: {
        type: String
    },
    provider: {
        type: String
    },
    provider_id: {
        type: String, 
        unique: true
    },
    provider_token: {
        type: String
    },
    provider_refresh_token: {
        type: String
    }
    email: {
        type: String
    },    
    photo: {
        type: String
    },
    created: {
        type: Date, 
        default: Date.now
    }
});

User.virtual('userId')
    .get(function () {
        return this.id;
    });


// Client
var Client = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    }, 
    clientId: {
        type: String,
        unique: true,
        required: true
    },
    clientSecret: {
        type: String,
        required: true
    }
});



// AccessToken
var AccessToken = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    clientId: {
        type: String,
        required: true
    },
    token: {
        type: String,
        unique: true,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

// RefreshToken
var RefreshToken = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    clientId: {
        type: String,
        required: true
    },
    token: {
        type: String,
        unique: true,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('User',User);
mongoose.model('Client', Client);
mongoose.model('AccessToken', AccessToken);
mongoose.model('RefreshToken', RefreshToken);

mongoose.model('User',User);
mongoose.model('AccessToken', AccessToken);
mongoose.model('RefreshToken', RefreshToken);
