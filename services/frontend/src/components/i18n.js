import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './locales/en.json';
import fr from './locales/fr.json';
import nl from './locales/nl.json';

i18next
	.use(initReactI18next)
	.use(LanguageDetector)
	.init({
		debug: true,
		fallbackLng: 'en',
		resources: {
			en: {
				translation: en,
			},
			fr: {
				translation: fr,
			},
			nl: {
				translation: nl,
			}
		}
	})