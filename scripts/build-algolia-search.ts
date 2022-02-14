const algoliasearch = require("algoliasearch/lite");

interface WikiObject {
  objectID: string;
  content_md: string;
}

export async function buildAlgoliaSearch(objects: WikiObject[]) {
  // initialize the client with your environment variables
  const client = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.ALGOLIA_SEARCH_ADMIN_KEY
  );
  // initialize the index with your index name
  const index = client.initIndex("wiki");
  // add the data to the index
  const algoliaResponse = await index.saveObjects(objects);
  console.log(
    `Successfully added ${
      algoliaResponse.objectIDs.length
    } records to Algolia search! Object IDs:\n${algoliaResponse.objectIDs.join(
      "\n"
    )}`
  );
}
