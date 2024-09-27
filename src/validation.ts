import { Dispatch, SetStateAction } from 'react';

export const validateEmail = (email: string): boolean => {
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
	return phone.split('_')[1]?.length > 8;
};

const validate = (
	data: Record<string, string>,
	setErrors: Dispatch<SetStateAction<Record<string, string>>>
): Record<string, string> => {
	let errs: Record<string, string> = {};

	for (let elem in data) {
		if (elem === 'name') {
			if (!data[elem]) {
				errs.name = 'inputs__validate__name';
			}
		}

		if (elem === 'phone') {
			if (!data[elem]) {
				errs.phone = 'inputs__validate__tel';
			} else if (!validatePhone(data[elem])) {
				errs.phone = 'inputs__validate__tel_short';
			}
		}

		if (elem === 'email') {
			if (data[elem] && !validateEmail(data[elem])) {
				errs.email = 'inputs__validate__email';
			}
		}
	}

	setErrors((prev) => ({ ...prev, ...errs }));
	return errs;
};

export default validate;
