const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./schema/schema');

const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://root:abc123@localhost:27017/graphql-tutorial');
mongoose.connection.once('open',  () => {
    console.log('connected to MongoDB');
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true

}));

app.listen(4000, () => {
    console.log('listening for requests on port 4000... ')
});