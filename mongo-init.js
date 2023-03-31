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