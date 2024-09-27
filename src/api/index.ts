import { Dispatch, SetStateAction } from 'react';

export const postData = async (
	params: Record<string, string>,
	setLoading: Dispatch<SetStateAction<boolean>>
): Promise<boolean> => {
	const url = 'https://enigma-residence.com/api/';

	const body: Record<string, string> = {}

	for (let param in params) {
		if (params[param]) {
			body[param] = param === 'phone' ? params[param].replace(/_/, '') : params[param];
		}
	}

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});

		const result = await response.json();

		if (result.ok) {
			return true;
		}
	} catch {
		return false;
	} finally {
		setLoading(false);
	}
};
