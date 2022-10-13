import { client, gql } from "./graph";

const refreshLinks = async () => {
  const userId = localStorage.getItem("secret-link-user-id");
  const query = gql`
    query MyQuery2 {
      links(where: { userId: "${userId}" }) {
        email
        id
        messages {
          id
          message
        }
        name
        userId
        views
      }
    }
  `;

  try {
    const response = await client.request(query);
    return response.links;
  } catch (error) {}
};

export default refreshLinks;
