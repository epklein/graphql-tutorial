const graphql = require('graphql');
const _ = require('lodash');
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// a dummy list to test
var books = [
    { name: 'How to Win Friends and Influence People', genre: 'Leadership', id: '1' },
    { name: 'Accelerate: The Science of Lean Software and DevOps', genre: 'Software Engineering', id: '2' }
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

const RootQuery = new graphql.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: { type: GraphQLString }},
            resolve(parent, args) {
                // code to get data from db / other source
                return _.find(books, { id: args.id });
            }
        }
    }
});

module.exports = new graphql.GraphQLSchema({
    query: RootQuery
})