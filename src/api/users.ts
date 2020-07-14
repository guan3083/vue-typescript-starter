import request from '@/utils/request'

export const getUserInfo = (params: any) =>
	request({
		url: '/user/info',
		method: 'get',
        params
	})

export const login = (data: any) =>
    request({
		url: '/login',
		method: 'post',
		data
	})

export const logout = () =>
	request({
		url: '/user/logout',
		method: 'post'
	})
