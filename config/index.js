let config = {
    cloudinary: {
        api_key: '',
        api_secret: '',
        cloud_name: ''
    },
    mongodb_connection_string: 'mongodb://localhost:27017'
};


if (process.env.NODE_ENV === 'production'){
    config.mongodb_connection_string = process.env.MONGO_URL;
}


module.exports = config;