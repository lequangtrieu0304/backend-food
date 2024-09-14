db.createUser({
  user: 'quangtrieu',
  pwd: '123123',
  roles: [
    {
      role: 'readWrite',
      db: 'dbfood',
    },
  ],
});
