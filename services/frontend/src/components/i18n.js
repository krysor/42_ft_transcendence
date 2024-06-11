import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

i18next
	.use(initReactI18next)
	.use(LanguageDetector)
	.init({
		debug: true,
		fallbackLng: 'en',
		resources: {
			en: {
				translation: {
					test: 'translation test from App.js'
				}
			},
			fr: {
				translation: {
					test: 'test de traduction de App.js'
				}
			},
			nl: {
				translation: {
					test: 'vertalingstest van App.js'
				}
			}
		}
	})