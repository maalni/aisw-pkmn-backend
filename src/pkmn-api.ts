import * as dotenv from "dotenv";

export const getCardNameById = async (cardId: string) => {
  dotenv.config();

  const pkmnApiResponse = await fetch(
    `https://api.pokemontcg.io/v2/cards/${cardId}`,
    {
      headers: {
        "X-Api-Key": process.env.PKMNTCG_API_KEY,
      },
    },
  );

  const pkmncardResponseJson = await pkmnApiResponse.json();

  return pkmncardResponseJson.data.name;
};
