import React, { useCallback, useState, Dispatch, SetStateAction, ChangeEvent, useEffect, useRef } from 'react';
import validation from '../../validation';
import cn from 'classnames';
import PhoneInput from 'react-phone-input-2';
import { useTranslation } from 'react-i18next';

import 'react-phone-input-2/lib/bootstrap.css';
import styles from './field.module.css';
interface Props {
	label: string;
	name: string;
	type: string;
	autocomplete?: string;
	value: Record<string, string>;
	setValue: Dispatch<SetStateAction<Record<string, string>>>;
	className?: string;
	errors: Record<string, string>;
	setErrors: Dispatch<SetStateAction<Record<string, string>>>;
}

const hasValue = (value: string, focused: boolean): boolean => {
	return value !== '' || focused;
};

const Field: React.FC<Props> = (props: Props): React.ReactElement => {
	const { name, label, type, autocomplete, value, setValue, className, errors, setErrors } = props;
	const [focused, setFocused] = useState(false);
	const [touched, setTouched] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	const { t, i18n } = useTranslation();

	useEffect(() => {
		if (touched && !focused) {
			validation({ [name]: value[name] }, setErrors);
		}
	}, [touched, focused]);

	useEffect(() => {
		if (type === 'tel') {
			const defaultValue = i18n.language === 'ru' ? '+7' : '+66';
			setValue((prev) => ({ ...prev, [name]: defaultValue }));
		}
	}, [i18n.language]);

	const handleFocus = useCallback(() => {
		setFocused(true);
		setTouched(true);
	}, []);

	const handleBlurComp = useCallback(() => {
		setFocused(false);
	}, []);

	const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setValue((prev) => ({ ...prev, [name]: e.target.value }));
		setErrors((prev) => ({ ...prev, [name]: '' }));
	}, []);

	const handleChangePhone = useCallback((value: string, data: unknown) => {
		const countryCode =
			!!data && typeof data === 'object' && 'dialCode' in data && typeof data.dialCode === 'string' && data.dialCode;
		setValue((prev) => ({ ...prev, [name]: `${countryCode}_${value.slice(countryCode.length)}` }));
		setErrors((prev) => ({ ...prev, [name]: '' }));
	}, []);

	const hasVal = hasValue(value[name], focused);

	const labelCls = cn(styles.label, {
		[styles.label_phone]: type === 'tel',
		[styles.label_active]: hasVal,
		[styles.label_hide]: value[name] && !focused,
		[styles.label_error]: errors[name],
	});

	const inputCls = cn(styles.input, {
		[styles.input_phone]: type === 'tel',
		[styles.input_focus]: hasVal,
		[styles.input_error]: errors[name],
	});

	const cls = cn(styles.field, className);

	return (
		<div className={cls} onFocus={handleFocus} onBlur={handleBlurComp} ref={ref}>
			{type === 'tel' ? (
				<PhoneInput
					countryCodeEditable={false}
					masks={{ ru: '(...) ... ....', th: '.. ... ....' }}
					inputProps={{ id: name, name }}
					country={i18n.language === 'ru' ? 'ru' : 'th'}
					placeholder=""
					containerClass={styles.phoneContainer}
					inputClass={inputCls}
					value={value[name]}
					onChange={(value, data) => handleChangePhone(value, data)}
				/>
			) : (
				<input
					id={name}
					className={inputCls}
					type={type}
					autoComplete={autocomplete}
					onChange={handleChange}
					value={value[name]}
				/>
			)}
			<label className={labelCls} htmlFor={name}>
				{label}
			</label>
			<div className={cn(styles.errorText, { [styles.errorText_active]: errors[name] })}>
				{errors[name] && <div>{t(errors[name])}</div>}
			</div>
		</div>
	);
};

export default Field;
