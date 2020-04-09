var { graphql, buildSchema } = require('graphql');
const express = require('express');
const express_graphql = require('express-graphql');
const apollo_server = require('apollo-server');
var app = express();

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    user(id:Int!): User
    allUser: [User]
  },
  type Employee {
    id: ID!,
    name: String,
    empcode: String,
    department: String,
    grade: String,
    created_date: String
  },
  type User {
    id: Int!
    name: String
    age: Int
    shark: String
  }
`);

// Sample users
var users = [
  {
    id: 1,
    name: 'Brian',
    age: '21',
    shark: 'Great White Shark'
  },
  {
    id: 2,
    name: 'Kim',
    age: '22',
    shark: 'Whale Shark'
  },
  {
    id: 3,
    name: 'Faith',
    age: '23',
    shark: 'Hammerhead Shark'
  },
  {
    id: 4,
    name: 'Joseph',
    age: '23',
    shark: 'Tiger Shark'
  },
  {
    id: 5,
    name: 'Joy',
    age: '25',
    shark: 'Hammerhead Shark'
  }
];

// Return a single user
var getUser = function(args) {
  var id = args.id;
  return users.filter(user => user.id == id)[0];
}

var getAllUser = function() {
  return users;
}
// The root provides a resolver function for each API endpoint
var root = {
  user: getUser,
  allUser: getAllUser
};

// Run the GraphQL query '{ hello }' and print out the response
var test = `query getAllUser{
  allUser{
    name
    age
  }
}`;

graphql(schema, test, root).then((response) => {
  console.log(JSON.stringify(response));
}); 

var test = `query getSingleUser($userId: Int!){
  user(id: $userId) {
    name
    age
    shark
  }
}`;
graphql(schema, test, root, '', {"userId": 3}).then((response) => {
  console.log(response);
}); 

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use('/graphql', express_graphql({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.listen(4000, () => console.log('graphql running on port 4000'));  