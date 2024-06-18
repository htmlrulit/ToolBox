import React, { useState, useContext } from 'react';
import {
    Panel,
    PanelHeader,
    PanelHeaderBack,
    FormLayout,
    Textarea,
    Button,
    Div,
    FormStatus,
    ButtonGroup,
} from '@vkontakte/vkui';
import {Icon24Delete} from '@vkontakte/icons';
import { GlobalContext } from "../context";
import './CompareTexts.css';
import { diffWords } from 'diff';
const CompareTexts = props => {
    const { go } = useContext(GlobalContext);
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [differences, setDifferences] = useState('');
    const [error, setError] = useState('');

    const handleTextChange = (e, setText) => {
        const text = e.target.value;
        if (text.length <= 65535) {
            setText(text);
            setError('');
        } else {
            setError('Превышено максимальное количество символов: 65535');
        }
    };

    const compareTexts = () => {
        if (!text1 || !text2) {
            setError('Оба текста должны быть заполнены.');
            return;
        }

        const diff = diffWords(text1, text2);
        const formattedDiff = diff.map(part => {
            const color = part.added ? 'green' :
                part.removed ? 'red' : 'black';
            const prefix = part.added ? '+' :
                part.removed ? '-' : ' ';
            return `<span style="color: ${color}; white-space: pre-wrap;">${prefix}${part.value}</span>`;
        }).join('');

        setDifferences(formattedDiff || 'Тексты идентичны.');
    };

    const clearText = () => {
        setText1('');
        setText2('');
        setDifferences('');
        setError('');
    };


    return (
        <Panel id={props.id}>
            <PanelHeader before={<PanelHeaderBack onClick={() => go("home")} />}>
                Сравнить текст
            </PanelHeader>
            <FormLayout className="compare-texts-form">
                <Textarea
                    placeholder="Текст 1"
                    value={text1}
                    onChange={e => handleTextChange(e, setText1)}
                    className="compare-texts-textarea"
                />
                <Textarea
                    placeholder="Текст 2"
                    value={text2}
                    onChange={e => handleTextChange(e, setText2)}
                    className="compare-texts-textarea"
                />
                {error && <FormStatus mode="error">{error}</FormStatus>}
                <ButtonGroup mode="horizontal" gap="m" stretched align="center">
                    <Button size="l" onClick={compareTexts} className="compare-texts-button" disabled={!text1.trim() || !text2.trim()}>
                        Сравнить
                    </Button>
                    <Button size="l" mode="tertiary" onClick={clearText} className="compare-texts-button" disabled={!text1.trim() && !text2.trim()}>
                        <Icon24Delete />
                    </Button>
                </ButtonGroup>
                {differences && (
                    <Div className="compare-texts-result">
                        <div className="diff-container" dangerouslySetInnerHTML={{ __html: differences }} />
                    </Div>
                )}
            </FormLayout>
        </Panel>
    );
};

export default CompareTexts;
