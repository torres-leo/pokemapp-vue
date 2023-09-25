<template>
	<main class="flex items-center justify-center min-h-screen">
		<div v-if="!pokemon"><Spinner /></div>

		<div v-else class="flex flex-col gap-y-5 justify-center items-center">
			<h1 class="dark:text-gray-300 text-center text-6xl font-bold tracking-wide">Who's that Pokemon?</h1>

			<PokemonPicture :pokemonId="pokemon.id" :showPicture="showPicture" />
			<PokemonOptions :pokemonsArr="pokemons" @selected-pokemon="checkAnswer" :is-selected="selected" />
			<div v-if="message" class="flex items-center justify-center gap-x-3 fade-in">
				<p
					class="dark:text-gray-100 inline-flex gap-x-1 items-center py-2 px-4 rounded-md text-lg font-semibold tracking-wider"
					:class="itsCorrect ? 'bg-green-500' : 'bg-red-500'">
					{{ message }}
					<svg
						v-if="!itsCorrect"
						xmlns="http://www.w3.org/2000/svg"
						class="icon icon-tabler icon-tabler-mood-sad"
						width="32"
						height="32"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="#ffffff"
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
						<path d="M9 10l.01 0" />
						<path d="M15 10l.01 0" />
						<path d="M9.5 15.25a3.5 3.5 0 0 1 5 0" />
					</svg>
					<svg
						v-if="itsCorrect"
						xmlns="http://www.w3.org/2000/svg"
						class="icon icon-tabler icon-tabler-mood-tongue-wink-2"
						width="32"
						height="32"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="#ffffff"
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
						<path d="M12 21a9 9 0 1 1 0 -18a9 9 0 0 1 0 18z" />
						<path d="M15 10h-.01" />
						<path d="M10 14v2a2 2 0 1 0 4 0v-2m1.5 0h-7" />
						<path d="M7 10c.5 -1 2.5 -1 3 0" />
					</svg>
				</p>
			</div>
			<button
				v-if="selected"
				class="bg-slate-500 px-5 py-2 rounded text-gray-100 text-xl hover:bg-slate-600"
				@click="reset">
				Reset
			</button>
		</div>
	</main>
</template>

<script>
import confetti from 'canvas-confetti';
import PokemonPicture from '@/components/PokemonPicture.vue';
import PokemonOptions from '@/components/PokemonOptions.vue';
import Spinner from '@/components/Spinner.vue';
import getPokemonOptions from '@/helpers/getPokemonOptions.js';

export default {
	name: 'PokemonPage',
	components: {
		PokemonPicture,
		PokemonOptions,
		Spinner,
	},
	data() {
		return {
			pokemons: [],
			pokemon: null,
			showPicture: false,
			selected: false,
			message: '',
			itsCorrect: false,
		};
	},
	methods: {
		async mixPokemons() {
			this.pokemons = await getPokemonOptions();

			const randomPokemon = Math.floor(Math.random() * this.pokemons.length);
			this.pokemon = this.pokemons[randomPokemon];
		},

		checkAnswer(pokemonId) {
			this.selected = true;
			if (pokemonId === this.pokemon.id) {
				this.showPicture = true;
				confetti();
				this.itsCorrect = true;
				this.message = `That's correct! The Pokémon name is ${this.pokemon.name}`;
			} else {
				this.showPicture = true;
				this.itsCorrect = false;
				this.message = `Wrong! The Pokémon name is ${this.pokemon.name}`;
			}
		},

		reset() {
			this.message = '';
			this.selected = false;
			this.showPicture = false;
			this.itsCorrect = false;
			this.pokemon = null;
			this.mixPokemons();
		},
	},
	mounted() {
		this.mixPokemons();
	},
};
</script>
