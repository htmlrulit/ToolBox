import React, { useState, useContext } from 'react';
import { Panel, PanelHeader, PanelHeaderBack, FormLayout, Textarea, Button, Div, FormStatus, ButtonGroup } from '@vkontakte/vkui';
import { Icon24Delete } from '@vkontakte/icons';
import { GlobalContext } from "../context";
import './LineCount.css';

const LineCount = props => {
    const { go } = useContext(GlobalContext);
    const [inputText, setInputText] = useState('');
    const [lineCount, setLineCount] = useState(0);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const text = e.target.value;
        if (text.length <= 65535) {
            setInputText(text);
            setLineCount(text.split('\n').filter(line => line.trim() !== '').length);
            setError('');
        } else {
            setError('Превышено максимальное количество символов: 65535');
        }
    };

    const clearText = () => {
        setInputText('');
        setLineCount(0);
        setError('');
    };

    return (
        <Panel id={props.id}>
            <PanelHeader before={<PanelHeaderBack onClick={() => go("home")} />}>
                Подсчет строк
            </PanelHeader>
            <FormLayout className="line-count-form">
                <Textarea
                    placeholder="Введите текст"
                    value={inputText}
                    onChange={handleInputChange}
                    className="line-count-textarea"
                />
                {error && <FormStatus mode="error">{error}</FormStatus>}
                <ButtonGroup mode="horizontal" gap="m" stretched align="center">
                    <Button size="l" onClick={clearText} className="line-count-button" disabled={!inputText.trim()}>
                        <Icon24Delete />
                    </Button>
                </ButtonGroup>
                <Div className="line-count-result">
                    Количество строк: {lineCount}
                </Div>
            </FormLayout>
        </Panel>
    );
};

export default LineCount;
