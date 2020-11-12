export default class Api {
  static async getPokemons() {
    const response = await fetch( 'https://pokeapi.co/api/v2/pokemon/' ),
      collection = ( await response.json() ).results,
      result = [];

      // Await for all promises to be done.
      await Promise.all( collection.map( async ( item ) => {
        const itemResult = await ( await fetch( item.url ) ).json();

        
         result.push( itemResult );
      } ) ); 

      return result.sort( ( a, b ) => a.id - b.id);

  }
}