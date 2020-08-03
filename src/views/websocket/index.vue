<template>
	<div>
		<h1>{{ name }}</h1>
		<el-button @click="start">连接</el-button><br />
		<el-button>接受</el-button><el-row>{{ receiveMsg }}</el-row>
		<el-button @click="onSend">发送</el-button>
		<el-input v-model="sendMsg"></el-input>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
	name: 'websocket'
})
export default class extends Vue {
	private name: string = 'Websocket'
	private websocket!: WebSocket
	private sendMsg: string = ''
	private receiveMsg: string = ''

	created() {}
	private start() {
		this.websocket = new WebSocket('ws://localhost:7000/api/v1/ws/start')
		this.websocket.onopen = this.onOpen
		this.websocket.onmessage = this.onMsg
		this.websocket.onclose = this.onClose
		this.websocket.onerror = this.onError
		if (this.websocket.readyState === 1) {
			console.log('开启成功:{}', this.websocket)
		}
	}
	private onOpen(e: Event) {
		console.log('开启:{}', e)
	}

	private onMsg(e: Event) {
		console.log('接受到消息:{}', e)
		this.receiveMsg = e.data
	}

	private onSend() {
		console.log('发送消息:{}', this.sendMsg)
		this.websocket.send(JSON.stringify(this.sendMsg))
	}
	private onClose(e: Event) {
		console.log('关闭:{}', e)
	}

	private onError(e: Event) {
		console.log('异常:{}', e)
	}
}
</script>

<style scoped></style>
