// server.js
const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schemas/userSchema');
const resolvers = require('./resolvers/userResolver');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb+srv://ashishp:R3H2r2vWB6bAP4YJ@dronahq.rkdkdhs.mongodb.net/?retryWrites=true&w=majority&appName=DronaHQ';

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();

  server.applyMiddleware({ app });

  await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startServer().catch(err => console.error('Error starting server:', err));
