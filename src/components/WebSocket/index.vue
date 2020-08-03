<template>
	<div></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getToken } from '@/utils/cookies'

@Component({
	name: 'WebSocket'
})
export default class extends Vue {
	private reqUrl: string = ''
	private websocket!: WebSocket
	private sendMsg: string = ''
	private receiveMsg: string = ''

	created() {
		const token = getToken()
		const wsBaseUrl = process.env.VUE_APP_BASE_WS
		this.reqUrl = `${wsBaseUrl}?token=${token}`
	}
	mounted() {
		this.start()
	}
	private start() {
		this.websocket = new WebSocket(this.reqUrl)
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
