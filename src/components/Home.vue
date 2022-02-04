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
		greet(event) {
			// `this` inside methods points to the current active instance
			alert("Hello " + this.name + "!");
			// `event` is the native DOM event
			if (event) {
				alert(event.target.tagName);
			}
		},
	},
};
</script>

<style scoped></style>
