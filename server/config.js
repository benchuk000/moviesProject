module.exports = {
    PORT:        process.env.PORT || 3000,
    JWT_SECRET:  process.env.JWT_SECRET || 'secret',
    SALT_FACTOR: process.env.SALT_FACTOR,
    MONGO_URI:   process.env.MONGO_URI || 'mongodb://localhost:27017/movie',
    //SENDGIRD_USER:  process.env.SENDGIRD_USER,
    //SENDGIRD_PASSWORD:  process.env.SENDGIRD_PASSWORD,
    //AWS_KEY_ID: process.env.AWS_KEY_ID,
    //AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
};
