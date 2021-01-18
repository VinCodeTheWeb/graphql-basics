const Query = {
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
  users(parent, args, { db }, info) {
    if (!args.query) return db.users;
    return db.users.filter((user) => user.name.toLowerCase().includes(args.query));
  },
  posts(parent, args, { db }, info) {
    if (!args.title) return posts;
    return db.posts.filter((post) => post.title.toLowerCase().includes(args.title));
  },
  comments(parent, args, { db }, info) {
    if (!args.id) return db.comments;
    return db.comments.filter((comment) => comment.author === parent.id);
  },
};

export { Query as default };
