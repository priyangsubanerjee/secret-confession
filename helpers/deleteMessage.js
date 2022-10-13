import { gql, client } from "../helpers/graph";
import refreshLinks from "./refresh";
import refreshMessages from "./refreshMessages";

const deleteMessage = async (linkId, messageId) => {
  console.log(linkId, messageId);
  const query = gql`
    mutation MyMutation {
      updateLink(
        data: { messages: { delete: { id: "${messageId}" } } }
        where: { id: "${linkId}" }
      ) {
        id
      }
    }
  `;
  const response = await client.request(query);
  const refresh = await refreshMessages(linkId);
  if (refresh.success) {
    return {
      success: true,
      data: refresh.data,
    };
  } else {
    return {
      success: false,
      data: null,
    };
  }
};

export default deleteMessage;
