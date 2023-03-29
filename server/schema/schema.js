const graphql = require('graphql');
const _ = require('lodash');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLSchema
} = graphql;

// dummy data
var books = [
    { name: 'How to Win Friends and Influence People', genre: 'Leadership', id: '1' },
    { name: 'Accelerate: The Science of Lean Software and DevOps', genre: 'Software Engineering', id: '2' }
];

var authors = [
    { name: 'Dale Carnegie', id: '1' },
    { name: 'Nicole Forsgren', id: '2' }
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString }
    })
});

const RootQuery = new graphql.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: { type: GraphQLID }},
            resolve(parent, args) {
                // code to get data from db / other source
                return _.find(books, { id: args.id });
            }
        },
        author: {
            type: AuthorType,
            args: {id: { type: GraphQLID }},
            resolve(parent, args) {
                // code to get data from db / other source
                return _.find(authors, { id: args.id });
            }
        }

    }
});

module.exports = new graphql.GraphQLSchema({
    query: RootQuery
})