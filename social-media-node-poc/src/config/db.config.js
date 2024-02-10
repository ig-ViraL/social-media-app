const mongoose = require("mongoose");
const config = require("./config")

mongoose.connect(config.database.dbUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true 
  }
);

const dbConnection = mongoose.connection;

// handlers
dbConnection.on('connecting', () => {
  console.log('MongoDB :: connecting');
});

dbConnection.on('error', (error) => {
  console.log(`MongoDB :: connection ${error}`);
  mongoose.disconnect();
});

dbConnection.on('connected', () => {
  console.log('MongoDB :: connected');
});

dbConnection.once('open', () => {
  // console.log('MongoDB :: connection opened');
});

dbConnection.on('reconnected', () => {
  console.log('MongoDB :: reconnected');
});

dbConnection.on('reconnectFailed', () => {
  console.log('MongoDB :: reconnectFailed');
});

dbConnection.on('disconnected', () => {
  console.log('MongoDB :: disconnected');
});

dbConnection.on('fullsetup', () => {
  console.log('MongoDB :: reconnecting... %d');
});

module.exports = dbConnection; 