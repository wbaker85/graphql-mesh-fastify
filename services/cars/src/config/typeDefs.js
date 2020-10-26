import { gql } from 'apollo-server';

const typeDefs = gql`
  type Car @key(fields: "id") {
    id: ID!
    make: String
    year: String!
  }

  extend type Query {
    allCars: [Car]
  }

  extend type Mutation {
    createCar(make: String!, year: String!): Car
  }
`;

export default typeDefs;
