const graphql = require('graphql');

const Book = require('../models/book.js');
const Author = require('../models/author.js');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLSchema
} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: { 
            type: AuthorType,
            resolve(parent, args) {
                return Author.findById(parent.authorId);
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
                return Book.find({ authorId: parent.id });
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
                return Book.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: {id: { type: GraphQLID }},
            resolve(parent, args) {
                return Author.findById(args.id);
            }
        },
        books: {
            type: GraphQLList(BookType),
            resolve (parent, args) {
                return Book.find({});
            }
        },
        authors: {
            type: GraphQLList(AuthorType),
            resolve (parent, args) {
                return Author.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addBook: {
            type: BookType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                authorId: { type: GraphQLID }
            },
            resolve (parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });

                return book.save();
            }
        },
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString }
            },
            resolve (parent, args) {
                let author = new Author({
                    name: args.name
                });

                return author.save();
            }
        }
    }
})

module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})