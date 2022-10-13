import { gql, GraphQLClient } from "graphql-request";

const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPH_API, {
  headers: {
    Authorization: process.env.NEXT_PUBLIC_GRAPH_TOKEN,
  },
});

export { gql, client };
