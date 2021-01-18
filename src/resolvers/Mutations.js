import { v4 as uuidv4 } from 'uuid';

const Mutation = {
  createUser(parent, args, { db }, info) {
    const emailTaken = db.users.some((user) => user.email === args.data.email);
    if (emailTaken) throw new Error('Email Taken');

    const user = {
      id: uuidv4(),
      ...args.data,
    };

    db.users.push(user);

    return user;
  },
  updateUser(parent, { data }, { db }, info) {
    const existingUser = db.users.find((user) => user.id === parseInt(data.id));

    if (!existingUser) throw new Error('User not found');

    if (typeof data.email === 'string') {
      const emailTaken = db.users.some((user) => user.email === data.email);

      if (emailTaken) throw new Error('Email in used');
      existingUser.email = data.email;
    }

    if (typeof data.name === 'string') {
      existingUser.name = data.name;
    }

    if (data.age !== 'undefined') {
      existingUser.age = data.age;
    }

    return existingUser;
  },
  deleteUser(parent, args, { db }, info) {
    const userIndex = db.users.findIndex((user) => user.id === args.id);
    if (userIndex === -1) throw new Error('User not found');

    const deletedUsers = db.users.splice(userIndex, 1);

    posts = db.posts.filter((post) => {
      const match = post.author === args.id;

      if (match) {
        db.comments = db.comments.filter((comment) => comment.post !== post.id);
      }
      return !match;
    });

    db.comments = db.comments.filter((comment) => comment.author !== args.id);

    return deletedUsers;
  },
  createPost(parent, args, { db }, info) {
    const userExist = db.users.some((user) => user.id === args.data.author);
    if (!userExist) throw new Error('User not found');

    const post = {
      id: uuidv4(),
      ...args.data,
    };

    posts.push(post);

    return post;
  },
  updatePost(parent, { data }, { db }, info) {
    const existingPost = db.posts.find((post) => {
      return post.id === parseInt(data.id);
    });

    if (!existingPost) throw new Error('Post not found');

    for (let d in existingPost) {
      existingPost[d] = data[d] || existingPost[d];
    }

    return existingPost;
  },
  deletePost(parent, args, { db }, info) {
    const postIndex = db.posts.findIndex((post) => post.id === args.id);
    if (postIndex === -1) throw new Error('Post not found');

    const deletedPost = db.posts.splice(postIndex, 1);

    db.comments = db.comments.filter((comment) => {
      const match = comment.id === args.id;

      if (match) {
        db.comments = db.comments.filter((comment) => comment.author !== post.author);
      }
      return !match;
    });
    return deletedPost;
  },
  createComment(parent, args, { db }, info) {
    const userExist = db.users.some((user) => user.id === args.data.author);
    if (!userExist) throw new Error('User not found');

    const comment = {
      id: uuidv4(),
      ...args.data,
    };

    db.comments.push(comment);

    return comment;
  },
  updateComment(parent, { data }, { db }, info) {
    const exisitingComment = db.comments.find(
      (comment) => comment.id === parseInt(data.id)
    );

    if (!exisitingComment) throw new Error('Comment not found');

    for (let d in exisitingComment) {
      exisitingComment[d] = data[d] || exisitingComment[d];
    }

    return exisitingComment;
  },
};

export { Mutation as default };
