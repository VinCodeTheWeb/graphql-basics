import { GraphQLServer } from 'graphql-yoga';

// Demo Users Data
const users = [
  { id: 1, name: 'Vincenzo', email: 'vincenzo33.pellegrini@gmail.com', age: 33 },
  { id: 2, name: 'Hassen', email: 'hassen33.pellegrini@gmail.com', age: 33 },
  { id: 3, name: 'Charazade', email: 'charazade.merabet@gmail.com', age: 55 },
];

const posts = [
  { id: 1, title: 'Title1', body: 'Body1', published: false },
  { id: 2, title: 'Title2', body: 'Body2', published: false },
  { id: 3, title: 'Title3', body: 'Body3', published: false },
];

// 5 Scaler Type
// String - Boolean - Int - Float - ID -

// Type Definitions (Schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]
    posts(title: String): [Post!]
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }

`;
// Resolvers
const resolvers = {
  Query: {
    me() {
      return {
        id: '123abc',
        name: 'Vincenzo Pellegrini',
        email: 'vincenzo33.pellegrini@gmail.com',
        age: 33,
      };
    },
    post() {
      return {
        id: '123dfe',
        title: '1 Only Way To Get Better At Coding',
        body: 'If you wanna get better at coding then you should keep reading',
        published: false,
      };
    },
    users(parent, args, ctx, info) {
      if (!args.query) return users;
      return users.filter((user) =>
        user.name.toLowerCase().includes(args.query.toLowerCase())
      );
    },
    posts(parent, args, ctx, info) {
      if (!args.title) return posts;
      return posts.filter((post) => post.title.toLowerCase().includes(args.title));
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => console.log('Starting server'));
