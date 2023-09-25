<template>
	<div class="flex justify-center mt-5 h-[210px]">
		<img :src="pokemonImage" alt="Pokemon" class="brightness-0 select-none resize-none" />

		<img v-if="showPicture" :src="pokemonImage" alt="Pokemon" class="fade-in" />
	</div>
</template>

<script>
export default {
	name: 'PokemonPicture',
	props: {
		pokemonId: {
			type: Number,
			required: true,
		},
		showPicture: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	computed: {
		pokemonImage() {
			return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.pokemonId}.svg`;
		},
	},
};
</script>

<style scoped>
img {
	height: 200px;
	width: 250px;
	position: absolute;
	/* right: 30%; */
	user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	-webkit-user-drag: none;
	-webkit-user-select: none;
}
</style>
