import {PRESENTATION_LINKS} from './consts';

export const getImageLink = (image: string, ext: string, dir = 'components'): string => {
	return `../../../static/images/${dir}/${image}${ext}`;
}

export const getPresentationLink = (lang: keyof typeof PRESENTATION_LINKS): string => {
	return PRESENTATION_LINKS[lang];
}