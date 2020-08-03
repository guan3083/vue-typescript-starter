import request from '@/utils/request'

export const getArticles = (params: any) =>
	request({
		url: '/article/weibo',
		method: 'get',
		params
	})
