<template>
	<ul class="w-full flex flex-col items-center justify-center gap-y-2">
		<li
			class="pokemon-options"
			:class="isSelected && 'hidden opacity-0 transition-all '"
			v-for="pokemon of pokemonsArr"
			:key="pokemon.id"
			@click="selectPokemon(pokemon.id)">
			{{ pokemon.name }}
		</li>
	</ul>
</template>

<script>
export default {
	name: 'PokemonOptions',
	props: {
		pokemonsArr: {
			type: Array,
			required: true,
		},
		isSelected: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	emits: ['click'],
	methods: {
		selectPokemon(pokemonId) {
			if (this.isSelected) return;
			this.$emit('selectedPokemon', pokemonId);
		},
	},
};
</script>
