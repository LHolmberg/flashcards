<template>
	<blog-post title="My journey with Vue"></blog-post>
</template>

<script>
const Vue = window.vue;
Vue.component("blog-post", {
	props: ["title"],
	template: "<h3>{{ title }}</h3>",
});
export default {
	name: "Home",
	props: {
		msg: String,
	},
};
</script>

<style scoped></style>
