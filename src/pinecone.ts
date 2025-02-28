import { Pinecone } from "@pinecone-database/pinecone";
import * as dotenv from "dotenv";
dotenv.config();

const indexName = process.env.INDEX_NAME;
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const saveEmbedding = async ({
  id,
  values,
  metadata,
  namespace = "default",
}) => {
  const index = pinecone.index(indexName);
  const ns = index.namespace(namespace);

  await ns.upsert([
    {
      id,
      values,
      metadata,
    },
  ]);
};

const queryEmbedding = async ({ values, namespace = "default" }) => {
  const index = pinecone.index(indexName);
  const ns = index.namespace(namespace);

  const response = await ns.query({
    topK: 20,
    vector: values,
    includeMetadata: true,
  });

  const filteredMatches = response.matches.filter((match) => {
    return match.score > 0.9;
  });

  return filteredMatches.map((match) => {
    const metadata = match?.metadata;
    const score = match?.score;

    console.log(score);

    return {
      id: metadata?.set + "-" + metadata?.number,
      set: metadata?.set || "Unknown",
      number: metadata?.number || "Unknown",
      name: metadata?.name || "Unknown",
      confidence: score,
    };
  });
};

export { saveEmbedding, queryEmbedding };
