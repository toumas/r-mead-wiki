import algoliasearch from "algoliasearch";

export interface WikiObject {
  objectID: string;
  content_md: string;
}

export async function buildAlgoliaSearch(objects: WikiObject[]) {
  // initialize the client with your environment variables
  const client = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
    process.env.ALGOLIA_SEARCH_ADMIN_KEY as string
  );
  // initialize the index with your index name
  const index = client.initIndex("wiki");
  const res = await index.setSettings({
    highlightPreTag: '<em class="search-highlight">',
    highlightPostTag: "</em>",
  });

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
