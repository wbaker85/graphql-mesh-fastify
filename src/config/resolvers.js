module.exports = {
  Query: {
    add: (_, { x, y }, context) => {
      console.log(context.userId);
      return x + y;
    },
  },
};
