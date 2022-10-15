import { client, gql } from "./graph";

const sendMessage = async (message, id) => {
  const currentDate = new Date();
  const query = gql`
      mutation MyMutation {
        updateLink(
          data: { messages: { create: { data: { message: "${message}", date:"${currentDate}"  } } } }
          where: { id: "${id}" }
        ) {
          id
        }
      }
    `;

  const response = await client.request(query);
  if (response.updateLink.id) {
    return {
      success: true,
      data: response.updateLink,
    };
  } else {
    return {
      success: false,
      data: null,
    };
  }
};

export default sendMessage;
