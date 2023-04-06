const responseFormatter = async (
	api,
	defaultMsg = 'Something went wrong, please contact your system administrator.'
) => {
	try {
		const { data: response, status } = await api;
		if (status === 202 && response.error) throw response;

		return {
			data: response,
			message: response.message,
			status,
			error: null,
		};
	} catch (err) {
		if (!err.response) {
			return {
				data: null,
				status: null,
				error:
					err.message &&
					err.message.toLowerCase().indexOf('network error') === -1
						? err.message || err.error || defaultMsg
						: [{ message: '' }],
			};
		}

		return {
			data: null,
			status: err?.response?.status ? err.response.status : null,
			error: (err.response && err.response.data.error) || defaultMsg,
		};
	}
};

export default responseFormatter;
