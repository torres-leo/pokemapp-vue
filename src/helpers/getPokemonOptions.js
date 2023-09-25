import pokemonAPI from '../api/pokemonAPI';

const getPokemons = async () => {
	const pokemonArr = Array.from(Array(650));
	return pokemonArr.map((_, index) => index + 1);
};

const getPokemonOptions = async () => {
	const mixedPokemons = (await getPokemons()).sort(() => Math.random() - 0.5);
	const pokemons = await getPokemonNames(mixedPokemons.splice(0, 4));
	return pokemons;
};

const getPokemonNames = async (pokemon = []) => {
	if (pokemon.length === 0) return;

	const pokemonsNames = await Promise.all(
		pokemon.map(async (pokemonId) => {
			const resp = await pokemonAPI.get(`/${pokemonId}`);
			return { name: resp.data.name, id: resp.data.id };
		})
	);

	return pokemonsNames;
};

export default getPokemonOptions;
