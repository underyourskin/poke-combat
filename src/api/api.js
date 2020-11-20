export default class Api {
  static async getPokemons() {
    const cache = localStorage.getItem('pokemons');

    if ( cache ) {
      return JSON.parse(cache);
    }

    const response = await fetch('https://pokeapi.co/api/v2/pokemon/'),
      collection = (await response.json()).results,
      result = [];

    // Await for all promises to be done.
    await Promise.all(collection.map(async (item) => {
      const itemResult = await (await fetch(item.url)).json();

      result.push(itemResult);
    }));

    const sorted = result.sort((a, b) => a.id - b.id);

    localStorage.setItem('pokemons', JSON.stringify(sorted));

    return sorted;
  }
}