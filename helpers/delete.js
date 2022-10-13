import { gql, client } from "../helpers/graph";
import refreshLinks from "./refresh";

const deleteLink = async (id) => {
  console.log(id);
  const query = gql`
    mutation MyMutation {
      deleteLink(where: { id: "${id}" }) {
        id
      }
    }
  `;
  const response = await client.request(query);
  if (response.deleteLink.id) {
    const links = refreshLinks();
    return links;
  } else {
    return null;
  }
};

export default deleteLink;
