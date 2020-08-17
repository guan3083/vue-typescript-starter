import request from '@/utils/request'

export const getShoes = (params: any) =>
	request({
		url: '/shoes/list',
		method: 'get',
		params
	})
