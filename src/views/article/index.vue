<template>
	<el-container>
		<!-- v-infinite-scroll="load" infinite-scroll-disabled="disabled"-->
		<el-aside v-loading="titleLoading" width="20%">
			<div v-infinite-scroll="load" infinite-scroll-disabled="disabled">
				<div v-for="item in titleData" class="article-title">
					<el-badge :value="item.hot_num" class="item">
						<p class="" @click="details(item)">{{ item.title }}</p>
					</el-badge>
				</div>
				<p v-if="titleMoreLoading" class="title-more-tips">加载中...</p>
				<p v-if="noMore" class="title-more-tips">没有更多了</p>
			</div>
		</el-aside>

		<el-container v-loading="containerLoading" class="article-container">
			<el-header>{{ detailInfo.title }}</el-header>
			<el-main>
				<div v-html="detailInfo.content_html"></div>
				<!--				<div>{{ detailInfo.content }}</div>-->
			</el-main>
			<el-footer>Footer</el-footer>
		</el-container>
	</el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import * as article from '@/api/articles'

@Component({
	name: 'editor'
})
export default class extends Vue {
	private titleData: array = []
	private detailInfo: {} = {}
	private titleLoading: boolean = false
	private containerLoading: boolean = false
	private pageInfo: { page: number; size: number } = { page: 1, size: 15 }
	private total: number = 0
	private markDownLib: any = require('markdown').markdown
	private titleMoreLoading: boolean = false

	created() {
		this.articleList(1, 15)
	}

	mounted() {}

	//computed
	get noMore() {
		return this.titleData.length >= this.total
	}
	get disabled() {
		return this.titleMoreLoading || this.noMore
	}
	private async articleList(page: number, size: number) {
		this.titleLoading = true
		this.pageInfo.page = page
		this.pageInfo.size = size
		const data = await article.getArticles(this.pageInfo)
		if (this.titleData.length <= 0) {
			this.titleData = data.data.list
		} else {
			this.titleData.push.apply(this.titleData, data.data.list)
		}
		console.log(this.titleData.length)
		this.total = data.data.total
		setTimeout(() => {
			this.titleLoading = false
		}, 0.5 * 1000)
		if (this.titleData && this.titleData.length > 0 && !this.detailInfo.title) {
			this.details(this.titleData[0])
		}
	}

	private load() {
		this.titleMoreLoading = true
		setTimeout(() => {
			this.pageInfo.page++
			this.articleList(this.pageInfo.page, this.pageInfo.size)
			this.titleMoreLoading = false
		}, 2000)
	}

	private details(item: {}) {
		this.containerLoading = true
		this.detailInfo = item
		setTimeout(() => {
			this.containerLoading = false
		}, 0.3 * 1000)
	}
}
</script>

<style lang="scss">
.el-aside {
	color: #333;
	text-align: center;
	line-height: 30px;
	position: absolute;
	width: 20% !important;
	top: 50px;
	left: 0;
	bottom: 0;
	.article-title {
		/*box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);*/
		border-bottom: 1px solid #000000;
	}
	.title-more-tips {
		line-height: 10px;
		font-size: 10px;
	}
}

.article-container {
	position: absolute;
	width: 80%;
	top: 50px;
	left: 20%;
	bottom: 0;
	overflow-x: visible;
	overflow-y: visible;
	.el-main {
		background-color: #e9eef3;
		color: #333;
		iframe {
			width: 100%;
			height: 700px;
		}
	}
}
.el-header,
.el-footer {
	background-color: #b3c0d1;
	color: #333;
	text-align: center;
	line-height: 60px;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
	.el-aside {
		width: 10% !important;
		.el-badge__content.is-fixed {
			position: absolute;
			top: 0;
			right: 50px !important;
		}
	}
	.article-container {
		width: 85%;
		left: 15%;
	}
	.article-title {
	}
}
</style>
