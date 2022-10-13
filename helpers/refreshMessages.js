import { gql, client } from "../helpers/graph";
import refreshLinks from "./refresh";

const refreshMessages = async (linkId) => {
  const query = gql`
    query MyQuery2 {
      link(where: { id: "${linkId}" }) {
        id
        messages {
          id
          message
        }
      }
    }
  `;

  const response = await client.request(query);
  if (response.link.id) {
    return {
      success: true,
      data: response.link.messages,
    };
  } else {
    return {
      success: false,
      data: null,
    };
  }
};

export default refreshMessages;
