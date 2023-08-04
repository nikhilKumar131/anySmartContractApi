// const express = require('express');
// const { graphqlHTTP } = require('express-graphql');
// const schema = require('./schema');
// const resolvers = require('./resolvers');

import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./schema.js";
import { resolvers } from "./resolvers.js";

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true, // Enable GraphiQL interface for testing
}));

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`GraphQL server is running at http://localhost:${PORT}/graphql`);
});
