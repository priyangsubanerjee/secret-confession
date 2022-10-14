import { client, gql } from "../helpers/graph";

const incrementView = async (linkId) => {
  console.log(linkId);
  const query = gql`
    query MyQuery {
      link(where: { id: "${linkId}" }) {
        views
      }
    }
  `;
  const { link } = await client.request(query);
  console.log(link);

  const mutation = gql`
      mutation MyMutation {
        updateLink(data: { views: ${
          link.views + 1
        } }, where: { id: "${linkId}" }) {
          id
        }
      }
    `;

  const { updateLink } = await client.request(mutation);
  return updateLink;
};

export default incrementView;
