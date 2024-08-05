import {krispy} from './consts';

export const getImageLink = (image: string, ext: string, dir = 'components'): string => {
	return `../../../static/images/${dir}/${image}${ext}`;
}

export const getKrispyLink = (lang: string, isMobile: boolean): string => {
	return krispy[`${isMobile ? 'mob' : 'web'}_${lang}`];
}