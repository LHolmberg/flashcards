<template>
	<a @click="greet"> GREET </a>
</template>

<script>
export default {
	name: "Home",
	props: {
		msg: String,
	},
	methods: {
		greet() {
			console.log("Hello");
		},
	},
};
</script>

<style scoped>
a {
	color: green;
}
</style>
