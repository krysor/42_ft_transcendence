import React from "react";

import { useTranslation } from 'react-i18next'

function Home() {
	const { t } = useTranslation()

	return (
		<div>
			<h1>Home</h1>
				<p>{t('Intro')}</p>
		</div>
	);
}

export default Home;
