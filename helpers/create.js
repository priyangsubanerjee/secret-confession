import { client, gql } from "./graph";

const create = async (name, email, userId) => {
  const query = gql`
    mutation MyMutation {
      createLink(data: { email: "${email}", name: "${name}", userId: "${userId}", views: ${0} }) {
        id
      }
    }
  `;

  const response = await client.request(query);
  if (response.createLink.id) {
    return {
      success: true,
      data: response.createLink,
      link:
        "https://secretconfession.vercel.app/message/" + response.createLink.id,
    };
  } else {
    return {
      success: false,
      data: null,
    };
  }
};

export default create;
