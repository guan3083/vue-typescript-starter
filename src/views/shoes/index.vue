<template>
	<div>
		<div class="shoes">
			<div class="item" v-for="item in tableList">
				<el-image :src="item.logo_url" class="shoes-image">
					<div slot="placeholder" class="image-slot">加载中<span class="dot">...</span></div>
				</el-image>
				<br />
				<span class="title">{{ item.title }} </span>
				<span class="price">￥{{ item.price / 100 }} </span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import * as shoes from '@/api/shoes'

@Component({
	name: 'websocket'
})
export default class extends Vue {
	private searchKey: { page: number; size: number } = { page: 1, size: 9 }
	private tableList: array = []
	created() {
		// url = https://du.duoerpu.com/du/api/search?title=aj&page=0&limit=1&sortType=0&sortMode=1&unionId=
		// token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDgwYTc2ZmY4ODNkOGUwYmYwOGE2ZDAiLCJpYXQiOjE1NzA3OTQ3MTZ9.58xagM7WfoItwpTkg-Q4PHnb09Vl5Z7zVnW0ErWVLRs"
		this.getList(1, 9)
	}

	async getList(page: number, size: number) {
		this.searchKey = { page, size }
		const data = await shoes.getShoes(this.searchKey)
		this.tableList = data.data.list
	}
}
</script>

<style lang="scss">
.shoes {
	margin: 10px 10%;
	display: flex;
	flex-wrap: wrap;
	.item {
		width: 30%;
		/*margin-left: 10px;*/
		text-align: center;
		flex-direction: column;
		-webkit-box-pack: justify;
		justify-content: space-between;
		/*padding: 44px 18px 18px;*/
		transition: all 0.15s ease-in-out 0s;
		margin: 10px 12px;
	}
	.item:hover {
		transform: scale(1.1);
		/*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);*/
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
	}
	.title {
		font-size: 15px;
		font-weight: 100;
		line-height: 23px;
		text-transform: uppercase;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		width: 300px;
		word-wrap: break-word;
		word-break: break-all;
		overflow: hidden;
		margin: 0 auto;
		text-align: left;
	}
	.price {
		color: rgb(20, 21, 26);
		font-size: 16px;
		font-weight: 700;
		text-align: right;
		width: 300px;
	}
	.shoes-image {
		width: 300px;
		height: 225px;
	}
}
</style>
