import React, { useState, useContext } from 'react';
import { Panel, PanelHeader, PanelHeaderBack, FormLayout, Textarea, Button, Div, FormStatus, ButtonGroup } from '@vkontakte/vkui';
import { Icon24Delete } from '@vkontakte/icons';
import { GlobalContext } from "../context";
import './UniqueLines.css';

const UniqueLines = props => {
    const { go } = useContext(GlobalContext);
    const [inputText, setInputText] = useState('');
    const [uniqueCount, setUniqueCount] = useState(0);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const text = e.target.value;
        if (text.length <= 65535) {
            setInputText(text);
            setError('');
        } else {
            setError('Превышено максимальное количество символов: 65535');
        }
    };

    const countUniqueLines = () => {
        const lines = inputText.split('\n').filter(line => line.trim() !== '');
        const uniqueLines = new Set(lines);
        setUniqueCount(uniqueLines.size);
    };

    const clearText = () => {
        setInputText('');
        setUniqueCount(0);
        setError('');
    };

    return (
        <Panel id={props.id}>
            <PanelHeader before={<PanelHeaderBack onClick={() => go("home")} />}>
                Уникальные строки
            </PanelHeader>
            <FormLayout className="unique-lines-form">
                <Textarea
                    placeholder="Введите текст"
                    value={inputText}
                    onChange={handleInputChange}
                    className="unique-lines-textarea"
                />
                {error && <FormStatus mode="error">{error}</FormStatus>}
                <ButtonGroup mode="horizontal" gap="m" stretched align="center">
                    <Button size="l" onClick={countUniqueLines} className="unique-lines-button" disabled={!inputText.trim()}>
                        Подсчитать
                    </Button>
                    <Button size="l" mode="tertiary" onClick={clearText} className="unique-lines-button" disabled={!inputText.trim()}>
                        <Icon24Delete />
                    </Button>
                </ButtonGroup>
                <Div className="unique-lines-result">
                    Количество уникальных строк: {uniqueCount}
                </Div>
            </FormLayout>
        </Panel>
    );
};

export default UniqueLines;
