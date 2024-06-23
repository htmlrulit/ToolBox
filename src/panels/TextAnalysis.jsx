import React, { useState, useContext } from 'react';
import { Panel, PanelHeader, PanelHeaderBack, FormLayout, Textarea, Button, Div, FormStatus, ButtonGroup, Checkbox } from '@vkontakte/vkui';
import { Icon24Delete } from '@vkontakte/icons';
import { GlobalContext } from "../context";
import './TextAnalysis.css';

const TextAnalysis = props => {
    const { go } = useContext(GlobalContext);
    const [inputText, setInputText] = useState('');
    const [analysisResult, setAnalysisResult] = useState({});
    const [error, setError] = useState('');
    const [showWordCount, setShowWordCount] = useState(true);
    const [showSentenceCount, setShowSentenceCount] = useState(true);
    const [showAvgWordLength, setShowAvgWordLength] = useState(true);
    const [showAvgSentenceLength, setShowAvgSentenceLength] = useState(true);
    const [showCharCountWithSpaces, setShowCharCountWithSpaces] = useState(true);
    const [showCharCountWithoutSpaces, setShowCharCountWithoutSpaces] = useState(true);

    const handleInputChange = (e) => {
        const text = e.target.value;

        if (text.length <= 65535) {
            setInputText(text);
            setError('');
        } else {
            setError('Превышено максимальное количество символов: 65535');
        }
    };

    const analyzeText = () => {
        if (!inputText.trim()) {
            setError('Текст не может быть пустым');
            return;
        }

        const wordCount = inputText.split(/\s+/).filter(word => word).length;

        // Используем регулярное выражение для поиска предложений
        const sentenceRegex = /[^.!?]+[.!?]+/g;
        const sentences = inputText.match(sentenceRegex) || [];
        const sentenceCount = sentences.length;

        // Рассчитываем среднюю длину слов и предложений
        const averageWordLength = inputText.split(/\s+/).filter(word => word).reduce((acc, word) => acc + word.length, 0) / wordCount || 0;
        const averageSentenceLength = sentenceCount > 0 ? (wordCount / sentenceCount) : 0;

        const characterCountWithSpaces = inputText.length;
        const characterCountWithoutSpaces = inputText.replace(/\s+/g, '').length;

        setAnalysisResult({
            wordCount,
            sentenceCount,
            averageWordLength: averageWordLength.toFixed(2),
            averageSentenceLength: averageSentenceLength.toFixed(2),
            characterCountWithSpaces,
            characterCountWithoutSpaces
        });
    };

    const clearText = () => {
        setInputText('');
        setAnalysisResult({});
        setError('');
    };

    const isAnyCheckboxChecked = () => {
        return showWordCount || showSentenceCount || showAvgWordLength || showAvgSentenceLength || showCharCountWithSpaces || showCharCountWithoutSpaces;
    };

    return (
        <Panel id={props.id}>
            <PanelHeader before={<PanelHeaderBack onClick={() => go("home")} />}>
                Анализ текста
            </PanelHeader>
            <FormLayout className="text-analysis-form">
                <Textarea
                    placeholder="Введите текст"
                    value={inputText}
                    onChange={handleInputChange}
                    className="text-analysis-textarea"
                />
                {error && <FormStatus mode="error">{error}</FormStatus>}
                <Div>
                    <Checkbox checked={showWordCount} onChange={e => setShowWordCount(e.target.checked)}>
                        Показывать количество слов
                    </Checkbox>
                    <Checkbox checked={showSentenceCount} onChange={e => setShowSentenceCount(e.target.checked)}>
                        Показывать количество предложений
                    </Checkbox>
                    <Checkbox checked={showAvgWordLength} onChange={e => setShowAvgWordLength(e.target.checked)}>
                        Показывать среднюю длину слова
                    </Checkbox>
                    <Checkbox checked={showAvgSentenceLength} onChange={e => setShowAvgSentenceLength(e.target.checked)}>
                        Показывать среднюю длину предложения
                    </Checkbox>
                    <Checkbox checked={showCharCountWithSpaces} onChange={e => setShowCharCountWithSpaces(e.target.checked)}>
                        Показывать количество символов (с пробелами)
                    </Checkbox>
                    <Checkbox checked={showCharCountWithoutSpaces} onChange={e => setShowCharCountWithoutSpaces(e.target.checked)}>
                        Показывать количество символов (без пробелов)
                    </Checkbox>
                </Div>
                <ButtonGroup mode="horizontal" gap="m" stretched align="center">
                    <Button size="l" onClick={analyzeText} className="text-analysis-button" disabled={!inputText.trim() || !isAnyCheckboxChecked()}>
                        Анализ
                    </Button>
                    <Button size="l" mode="tertiary" onClick={clearText} className="text-analysis-button" disabled={!inputText.trim()}>
                        <Icon24Delete />
                    </Button>
                </ButtonGroup>
                {Object.keys(analysisResult).length > 0 && (
                    <Div className="text-analysis-result">
                        {showWordCount && <div>Количество слов: {analysisResult.wordCount}</div>}
                        {showSentenceCount && <div>Количество предложений: {analysisResult.sentenceCount}</div>}
                        {showAvgWordLength && <div>Средняя длина слова: {analysisResult.averageWordLength}</div>}
                        {showAvgSentenceLength && <div>Средняя длина предложения: {analysisResult.averageSentenceLength}</div>}
                        {showCharCountWithSpaces && <div>Количество символов (с пробелами): {analysisResult.characterCountWithSpaces}</div>}
                        {showCharCountWithoutSpaces && <div>Количество символов (без пробелов): {analysisResult.characterCountWithoutSpaces}</div>}
                    </Div>
                )}
            </FormLayout>
        </Panel>
    );
};

export default TextAnalysis;
