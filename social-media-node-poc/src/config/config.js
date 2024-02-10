module.exports = {
    database: {
        // dbUrl:process.env.DB_URL || "mongodb://localhost:27017/postgram",
        dbUrl: process.env.DB_URL || "mongodb+srv://sanketwebosmotic:oCpRh2uQN4lIMo0Y@cluster0.ullhimi.mongodb.net/postgram",
    },
    sslCertificates: {
        privkey: process.env.PRIVKEY,
        fullchain: process.env.FULLCHAIN,
    },
    port: process.env.PORT || 4004,
    protocol: process.env.PROTOCOL || 'http',
    baseUrl: process.env.BASE_URL || 'http://localhost:3000/',
    version:'1.0.0',
} 