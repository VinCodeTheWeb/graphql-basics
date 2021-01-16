import { GraphQLServer } from 'graphql-yoga';
import { v4 as uuidv4 } from 'uuid';

// Demo Users Data
let users = [
  { id: 1, name: 'Vincenzo', email: 'vincenzo33.pellegrini@gmail.com', age: 33 },
  { id: 2, name: 'Hassen', email: 'hassen33.pellegrini@gmail.com', age: 33 },
  { id: 3, name: 'Charazade', email: 'charazade.merabet@gmail.com', age: 55 },
];

let posts = [
  {
    id: 1,
    title: 'Title1',
    body: 'Body1',
    published: false,
    author: 1,
  },
  {
    id: 2,
    title: 'Title2',
    body: 'Body2',
    published: false,
    author: 1,
  },
  {
    id: 3,
    title: 'Title3',
    body: 'Body3',
    published: false,
    author: 2,
  },
];

let comments = [
  { id: 1, text: 'Comment 1', author: 1 },
  { id: 2, text: 'Comment 2', author: 1 },
  { id: 3, text: 'Comment 3', author: 2 },
];

// 5 Scaler Type
// String - Boolean - Int - Float - ID -

// Type Definitions (Schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]
    posts(title: String): [Post!]
    comments: [Comment!]
    me: User!
    post: Post!
  }

  type Mutation {
    createUser(data: createUserInput): User!
    createPost(data: createPostInput): Post!
    createComment(data: createCommentInput): Comment!
    deleteUser(id: ID!): User!
    deletePost(id: ID!): Post!
  }

  input createUserInput {
    name: String!,
    email: String!,
    age: Int
  }

  input createPostInput {
    title: String!
    body: String!
    published: Boolean!
    author: ID!
  }

  input createCommentInput {
    text: String!
    author: ID!
    post: ID!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int,
    posts: [Post!]
    comments: [Comment!]
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: Comment!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
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
    comments(parent, args, ctx, info) {
      return comments;
    },
  },

  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = users.some((user) => user.email === args.data.email);
      if (emailTaken) throw new Error('Email Taken');

      const user = {
        id: uuidv4(),
        ...args.data,
      };

      users.push(user);

      return user;
    },
    deleteUser(parent, args, ctx, info) {
      const userIndex = users.findIndex((user) => user.id === args.id);
      if (userIndex === -1) throw new Error('User not found');

      const deletedUsers = users.splice(userIndex, 1);

      posts = posts.filter((post) => {
        const match = post.author === args.id;

        if (match) {
          comments = comments.filter((comment) => comment.post !== post.id);
        }
        return !match;
      });

      comment = comments.filter((comment) => comment.author !== args.id);

      return deletedUsers;
    },
    createPost(parent, args, ctx, info) {
      const userExist = users.some((user) => user.id === args.data.author);
      if (!userExist) throw new Error('User not found');

      const post = {
        id: uuidv4(),
        ...args.data,
      };

      posts.push(post);

      return post;
    },
    deletePost(parent, args, ctx, info) {
      const postIndex = posts.findIndex((post) => post.id === args.id);
      if (postIndex === -1) throw new Error('Post not found');

      const deletedPost = posts.splice(postIndex, 1);

      comments = comments.filter((comment) => {
        const match = comment.id === args.id;

        if (match) {
          comments = comments.filter((comment) => comment.author !== post.author);
        }
        return !match;
      });
      return deletedPost;
    },
    createComment(parent, args, ctx, info) {
      const userExist = users.some((user) => user.id === args.data.author);
      if (!userExist) throw new Error('User not found');

      const comment = {
        id: uuidv4(),
        ...args.data,
      };

      comments.push(comment);

      return comment;
    },
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => user.id === parent.author);
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => comment.post === parent.id);
    },
  },

  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => post.author === parent.id);
    },
  },

  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => user.id === parent.author);
    },
    post(parent, args, ctx, info) {
      return posts.find((post) => post.id === parent.id);
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => console.log('Starting server'));
