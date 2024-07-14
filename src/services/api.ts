import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

const api: AxiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL,
	timeout: 5000,
});

let requestInterceptor: number;

interface Query {
	[key: string]: any;
}

const Api = {
	async clearClientToken() {
		api.interceptors.request.eject(requestInterceptor);
	},
	async setClientToken(token: string) {
		Api.clearClientToken();

		requestInterceptor = api.interceptors.request.use(
			async (config) => {
				config.headers.Authorization = `Bearer ${token}`;
				return config;
			},
			function (error) {
				return Promise.reject(error);
			}
		);
	},
	async registerUser(
		query: Query
	): Promise<AxiosResponse | any | AxiosError<any>> {
		if (!api) {
			throw new Error("API not initialized");
		}
		try {
			const response = await api.post(`register`, query);
			return response;
		} catch (error) {
			const axiosError = error as AxiosError<any>;
			return axiosError.response;
		}
	},
	async loginUser(
		query: Query
	): Promise<AxiosResponse | any | AxiosError<any>> {
		if (!api) {
			throw new Error("API not initialized");
		}
		try {
			const response = await api.post(`login`, query);
			return response;
		} catch (error) {
			const axiosError = error as AxiosError<any>;
			return axiosError.response;
		}
	},
	async updatePassword(
		query: Query,
		id: string
	): Promise<AxiosResponse | any | AxiosError<any>> {
		if (!api) {
			throw new Error("API not initialized");
		}
		try {
			const response = await api.put(`update-password/${id}`, query);
			return response;
		} catch (error) {
			const axiosError = error as AxiosError<any>;
			return axiosError.response;
		}
	},
	async updateProfileImage(
		query: Query,
		id: string
	): Promise<AxiosResponse | any | AxiosError<any>> {
		if (!api) {
			throw new Error("API not initialized");
		}
		try {
			const response = await api.put(`update-profile-image/${id}`, query);
			return response;
		} catch (error) {
			const axiosError = error as AxiosError<any>;
			return axiosError.response;
		}
	},
	async updateProfile(
		query: Query,
		id: string
	): Promise<AxiosResponse | any | AxiosError<any>> {
		if (!api) {
			throw new Error("API not initialized");
		}
		try {
			const response = await api.put(`update-profile/${id}`, query);
			return response;
		} catch (error) {
			const axiosError = error as AxiosError<any>;
			return axiosError.response;
		}
	},
	async createTravel(
		query: Query,
	): Promise<AxiosResponse | any | AxiosError<any>> {
		if (!api) {
			throw new Error("API not initialized");
		}
		try {
			const response = await api.post(`create-travel`, query);
			return response;
		} catch (error) {
			const axiosError = error as AxiosError<any>;
			return axiosError.response;
		}
	},
	async getUserTravel(
		id: string
	): Promise<AxiosResponse | any | AxiosError<any>> {
		if (!api) {
			throw new Error("API not initialized");
		}
		try {
			const response = await api.get(`user-travels/${id}`);
			return response;
		} catch (error) {
			const axiosError = error as AxiosError<any>;
			return axiosError.response;
		}
	},
};

export default Api;
