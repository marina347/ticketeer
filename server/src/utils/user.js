let users = [];

const addUser = ({ id, boardId }) => {
  const user = { id, boardId };
  users.push(user);
  return user;
};

const removeUser = (id) => {
  const index = users.findIndex((el) => el.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => {
  return users.find((user) => user.id === id);
};

const getUsersFromBoard = (boardId) => {
  return users.filter((user) => user.boardId === boardId);
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersFromBoard,
};
