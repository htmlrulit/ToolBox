import React, { useState, useContext } from 'react';
import {
    Panel,
    PanelHeader,
    PanelHeaderBack,
    FormLayout,
    Textarea,
    Button,
    Checkbox,
    Input,
    Div,
    FormStatus,
    ButtonGroup,
    Snackbar
} from '@vkontakte/vkui';
import {Icon16Done, Icon24Delete} from '@vkontakte/icons';
import { GlobalContext } from "../context";
import './CleanList.css';

const CleanList = props => {
    const { go } = useContext(GlobalContext);
    const [inputList, setInputList] = useState('');
    const [charactersToRemove, setCharactersToRemove] = useState('');
    const [removeDigits, setRemoveDigits] = useState(false);
    const [removeCommas, setRemoveCommas] = useState(false);
    const [removeEmptyLines, setRemoveEmptyLines] = useState(false);
    const [removeDoubleSpaces, setRemoveDoubleSpaces] = useState(false);
    const [removePunctuation, setRemovePunctuation] = useState(false);
    const [removeSpecialChars, setRemoveSpecialChars] = useState(false);
    const [outputList, setOutputList] = useState('');
    const [error, setError] = useState('');
    const [snackbar, setSnackbar] = useState(null);

    const showCopiedSnackbar = () => {
        setSnackbar(
            <Snackbar
                onClose={() => setSnackbar(null)}
                before={<Icon16Done fill="var(--vkui--color_icon_positive)" />}
            >
                Результат скопирован в буфер обмена
            </Snackbar>
        );
    };
    const handleInputChange = (e) => {
        const text = e.target.value;
        if (text.length <= 65535) {
            setInputList(text);
            setError('');
        } else {
            setError('Превышено максимальное количество символов: 65535');
        }
    };

    const escapeRegExp = (string) => {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };

    const cleanList = () => {
        let cleanedList = inputList;

        if (removeDigits) cleanedList = cleanedList.replace(/\d/g, '');
        if (removeCommas) cleanedList = cleanedList.replace(/,/g, '');
        if (removeEmptyLines) cleanedList = cleanedList.replace(/^\s*[\r\n]/gm, '');
        if (removeDoubleSpaces) cleanedList = cleanedList.replace(/ {2,}/g, ' ');
        if (removePunctuation) cleanedList = cleanedList.replace(/[.,\/#!$%\^&\*;:{}?=\-_`~()'"\[\]]/g, '');
        if (removeSpecialChars) cleanedList = cleanedList.replace(/[^\w\sА-Яа-яёЁ]/gi, ''); // Учет кириллических символов

        if (charactersToRemove) {
            const charsArray = charactersToRemove.split(',').map(char => escapeRegExp(char.trim()));
            const regex = new RegExp(`(${charsArray.join('|')})`, 'g');
            cleanedList = cleanedList.replace(regex, '');
        }

        setOutputList(cleanedList);
    };

    const clearText = () => {
        setInputList('');
        setOutputList('');
        setCharactersToRemove('');
        setRemoveDigits(false);
        setRemoveCommas(false);
        setRemoveEmptyLines(false);
        setRemoveDoubleSpaces(false);
        setRemovePunctuation(false);
        setRemoveSpecialChars(false);
        setError('');
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(outputList);
    };

    return (
        <Panel id={props.id}>
            <PanelHeader before={<PanelHeaderBack onClick={() => go("home")} />}>
                Очистка символов
            </PanelHeader>
            <FormLayout className="clean-list-form">
                <Textarea
                    placeholder="Введите список строк"
                    value={inputList}
                    onChange={handleInputChange}
                    className="clean-list-textarea"
                />
                {error && <FormStatus mode="error">{error}</FormStatus>}
                <Input
                    placeholder="Символы для удаления (через запятую)"
                    value={charactersToRemove}
                    onChange={e => setCharactersToRemove(e.target.value)}
                    className="clean-list-input"
                />
                <Div>
                    <Checkbox checked={removeDigits} onChange={e => setRemoveDigits(e.target.checked)}>
                        Удалить цифры/числа
                    </Checkbox>
                    <Checkbox checked={removeCommas} onChange={e => setRemoveCommas(e.target.checked)}>
                        Удалить запятые
                    </Checkbox>
                    <Checkbox checked={removeEmptyLines} onChange={e => setRemoveEmptyLines(e.target.checked)}>
                        Удалить пустые строки
                    </Checkbox>
                    <Checkbox checked={removeDoubleSpaces} onChange={e => setRemoveDoubleSpaces(e.target.checked)}>
                        Удалить двойные пробелы
                    </Checkbox>
                    <Checkbox checked={removePunctuation} onChange={e => setRemovePunctuation(e.target.checked)}>
                        Удалить знаки пунктуации
                    </Checkbox>
                    <Checkbox checked={removeSpecialChars} onChange={e => setRemoveSpecialChars(e.target.checked)}>
                        Удалить спецсимволы
                    </Checkbox>
                </Div>
                <ButtonGroup mode="horizontal" gap="m" stretched align="center">
                    <Button size="l" onClick={cleanList} className="clean-list-button" disabled={!inputList.trim()}>
                        Удалить
                    </Button>
                    <Button size="l" mode="tertiary" onClick={clearText} className="clean-list-button" disabled={!inputList.trim()}>
                        <Icon24Delete />
                    </Button>
                </ButtonGroup>
                {outputList && (
                    <Div className="clean-list-result">
                        <Textarea
                            placeholder="Результат"
                            value={outputList}
                            readOnly
                            className="clean-list-textarea"
                        />
                        <Button size="l" stretched onClick={copyToClipboard} onCopy={showCopiedSnackbar} className="clean-list-button">
                            Копировать результат
                        </Button>
                    </Div>
                )}
                {snackbar}
            </FormLayout>
        </Panel>
    );
};

export default CleanList;
