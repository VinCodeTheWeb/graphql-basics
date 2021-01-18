const users = [
  { id: 1, name: 'Vincenzo', email: 'vincenzo33.pellegrini@gmail.com', age: 33 },
  { id: 2, name: 'Hassen', email: 'hassen33.pellegrini@gmail.com', age: 33 },
  { id: 3, name: 'Charazade', email: 'charazade.merabet@gmail.com', age: 55 },
];

const posts = [
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

const comments = [
  { id: 1, text: 'Comment 1', author: 1 },
  { id: 2, text: 'Comment 2', author: 1 },
  { id: 3, text: 'Comment 3', author: 2 },
];

const db = {
  users,
  posts,
  comments,
};

export { db as default };
