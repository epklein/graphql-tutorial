const graphql = require('graphql');
const _ = require('lodash');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLSchema
} = graphql;

// dummy data
var books = [
    { name: 'How to Win Friends and Influence People', genre: 'Leadership', id: '1', authorId: '1' },
    { name: 'Accelerate: The Science of Lean Software and DevOps', genre: 'Software Engineering', id: '2', authorId: '2' }
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
        genre: { type: GraphQLString },
        author: { 
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authors, { id: parent.authorId });
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        books: {
            type: GraphQLList(BookType),
            resolve (parent, args) {
                return _.filter(books, { authorId: parent.id });
            }
        }
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
        },
        books: {
            type: GraphQLList(BookType),
            resolve (parent, args) {
                return books
            }
        },
        authors: {
            type: GraphQLList(AuthorType),
            resolve (parent, args) {
                return authors
            }
        }
    }
});

module.exports = new graphql.GraphQLSchema({
    query: RootQuery
})