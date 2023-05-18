import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPEN_AI_KEY ,

});
const openai = new OpenAIApi(configuration);

export const getPokemonDescription = async (pokemonName: string) : Promise<string> => {
    delete configuration.baseOptions.headers['User-Agent'];
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Quiero exactamente el mismo texto que aparece en la pokedex del videojuego pokemon edicion Plata cuando buscas al siguiente pokemon :${pokemonName}
      `,
      temperature: 0.2,
      max_tokens: 200,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    const description = response.data.choices[0].text;

    return description || 'No description found';
}
