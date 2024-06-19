import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const SelectionScreen = ({ onStartGame }) => {
    const [mode, setMode] = useState('ai'); // 'ai' or '2players'
    const [speed, setSpeed] = useState(1); // Default ball speed
    const { t } = useTranslation();

    const handleSpeedChange = (e) => {
        const value = Math.max(1, Math.min(10, Number(e.target.value)));
        setSpeed(value);
    };

    const handleStartGame = () => {
        onStartGame(mode, speed);
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>{t('Game Setup')}</h1>
            <div>
                <label>
                    <input
                        type="radio"
                        name="mode"
                        value="ai"
                        checked={mode === 'ai'}
                        onChange={(e) => setMode(e.target.value)}
                    />
                    {t('AI vs Player')}
                </label>
                <label>
                    <input
                        type="radio"
                        name="mode"
                        value="2players"
                        checked={mode === '2players'}
                        onChange={(e) => setMode(e.target.value)}
                    />
                    {t('2 Players')}
                </label>
            </div>
            <div>
                <label>
                    {t('Ball Speed:')}
                    <input
                        type="number"
                        value={speed}
                        min={1}
                        max={10}
                        onChange={handleSpeedChange}
                    />
                </label>
            </div>
            <button onClick={handleStartGame}>{t('Play')}</button>
        </div>
    );
};

export default SelectionScreen;