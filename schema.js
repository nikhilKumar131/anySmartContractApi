// const { buildSchema } = require('graphql');
import { buildSchema, GraphQLScalarType, Kind } from 'graphql';

// Custom scalar type for representing objects
const GraphQLJSONObject = new GraphQLScalarType({
  name: 'JSONObject',
  description: 'Represents a JSON object',
  serialize(value) {
    // Assuming the value is a valid JSON object, return as is
    return value;
  },
  parseValue(value) {
    // Assuming the value is a valid JSON object, return as is
    return value;
  },
  parseLiteral(ast) {
    // Parse the AST literal into a valid JSON object
    if (ast.kind === Kind.OBJECT) {
      const value = Object.create(null);
      ast.fields.forEach((field) => {
        value[field.name.value] = field.value.value;
      });
      return value;
    }
    return null; // Invalid JSON object, return null
  },
});

// const any = Int | String ;

const schema = buildSchema(`
scalar JSONObject
scalar JSON

type Query {
  message(function: String!, parameters: JSON!): JSONObject
  payableFunction(function: String!, parameters: JSON!, value: Int!): JSONObject
}
`);

// module.exports = schema;
export {schema}
