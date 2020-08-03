<template>
	<div class="app-container markdown-container">
		<mavon-editor ref="editor" v-model="doc"> </mavon-editor></div
></template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

@Component({
	name: 'editor',
	components: {
		mavonEditor
	}
})
export default class extends Vue {
	private doc: string = ''
	private markDownLib: any = require('markdown').markdown

	mounted() {
		let time = setInterval(() => {
			console.log(this.doc)
			console.log(this.markDownLib)
			console.log(this.markDownLib.toHTML(this.doc))
		}, 5 * 1000)
	}
}
</script>

<style lang="scss">
.markdown-container {
	position: absolute;
	width: 100%;
	top: 100px;
	left: 0;
	bottom: 0;

	.markdown-body {
		height: 100% !important;
	}
}
</style>
