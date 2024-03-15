// resolvers/userResolver.js
const User = require('../models/User');

const resolvers = {
  Query: {
    users: async () => {
        try {
          const allUsers = await User.find();
          return allUsers;
        } catch (error) {
          throw new Error('Failed to fetch users.');
        }
      },
    user: async (_, { id }) => {
        try {
          const foundUser = await User.findById(id);
          if (!foundUser) {
            throw new Error('User not found.');
          }
          return foundUser;
        } catch (error) {
          throw new Error('Failed to fetch user.');
        }
      },
  },
  Mutation: {
    createUser: (_, { name, email, age }) => User.create({ name, email, age }),
    updateUser: async (_, { id, name, email, age }) => {
        try {
          const updatedUser = await User.findByIdAndUpdate(id, { name, email, age }, { new: true });
          return updatedUser;
        } catch (error) {
          throw new Error('Failed to update user.');
        }
      },
      deleteUser: async (_, { id }) => {
        try {
          const deletedUser = await User.findByIdAndDelete(id);
          if (!deletedUser) {
            throw new Error('User not found.');
          }
          return deletedUser;
        } catch (error) {
          console.error('Error deleting user:', error);
          throw new Error('Failed to delete user.');
        }
      },
  },
};

module.exports = resolvers;
