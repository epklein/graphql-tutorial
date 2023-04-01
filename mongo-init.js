db = db.getSiblingDB('graphql-tutorial');

db.createUser({
  user: 'root',
  pwd: 'abc123',
  roles: [
    {
      role: 'readWrite',
      db: 'graphql-tutorial',
    },
  ],
});

const authors = [
  {
    _id: ObjectId(),
    name: 'Dale Carnegie',
  },
  {
    _id: ObjectId(),
    name: 'Nicole Forsgren',
  },
];

db.authors.insertMany(authors);

const books = [
  {
    _id: ObjectId(),
    name: 'How to Win Friends and Influence People',
    genre: "Leadership",
    authorId: authors[0]._id.toString()
  },
  {
    _id: ObjectId(),
    name: 'Accelerate: The Science of Lean Software and DevOps',
    genre: "Software Engineering",
    authorId: authors[1]._id.toString()
  },
];

db.books.insertMany(books);