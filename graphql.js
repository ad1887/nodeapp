var { graphql, buildSchema } = require('graphql');
const { RESTDataSource } = require('apollo-datasource-rest');
const express = require('express');
const express_graphql = require('express-graphql');
const { ApolloServer, gql } = require('apollo-server');
// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type User {
    firstname: String
    lastname: String
    username: String
    email: String
    phone: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    allUser: [User]
  }
`;

class reqAPI extends RESTDataSource {
  constructor() {
      super();
      this.baseURL = 'http://localhost:3000/api/';
  }

  async getUsers() {
    const response = await this.get(`user/`);
    return response.data;
  }
}
const resolvers = {
  Query: {
    allUser: async (_source, _args, { dataSources }) => {
      return dataSources.reqAPI.getUsers();
    }
  },
};

const server = new ApolloServer({
  typeDefs, 
  resolvers,
  dataSources: () => {
    return {
      reqAPI: new reqAPI(),
    };
  },
  context: () => {
    return {
      token: 'foo',
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

