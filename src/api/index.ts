import { Dispatch, SetStateAction } from 'react';

export const postData = async (
	params: Record<string, string>,
	setLoading: Dispatch<SetStateAction<boolean>>
): Promise<boolean> => {
	const url = 'https://enigma-residence.com/api/';

	const body = {
		...params,
		phone: params.phone.replace(/_/, ''),
	};

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
