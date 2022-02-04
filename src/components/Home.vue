<template>
	<body>
		<h1>Test</h1>
	</body>
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

<style>
body {
	background-image: linear-gradient(15deg, #13547a 0%, #80d0c7 100%);
}
</style>
