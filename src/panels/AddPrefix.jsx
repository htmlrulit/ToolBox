import React, { useState, useContext } from 'react';
import { Panel, PanelHeader, PanelHeaderBack, FormLayout, Textarea, Button, Input, Div, Checkbox, FormStatus, ButtonGroup, Snackbar } from '@vkontakte/vkui';
import { Icon24Delete, Icon16Done } from '@vkontakte/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { GlobalContext } from "../context";
import './AddPrefix.css';

const AddPrefix = props => {
    const { go } = useContext(GlobalContext);
    const [inputList, setInputList] = useState('');
    const [prefix, setPrefix] = useState('');
    const [suffix, setSuffix] = useState('');
    const [ignoreEmptyLines, setIgnoreEmptyLines] = useState(false);
    const [outputList, setOutputList] = useState('');
    const [error, setError] = useState('');
    const [snackbar, setSnackbar] = useState(null);

    const handleInputChange = (e) => {
        setInputList(e.target.value);
    };

    const clearText = () => {
        setInputList('');
        setOutputList('');
        setPrefix('');
        setSuffix('');
        setIgnoreEmptyLines(false);
        setError('');
    };

    const handlePrefixChange = (e) => {
        setPrefix(e.target.value);
    };

    const handleSuffixChange = (e) => {
        setSuffix(e.target.value);
    };

    const handleIgnoreEmptyLinesChange = (e) => {
        setIgnoreEmptyLines(e.target.checked);
    };

    const addPrefixSuffix = () => {
        if (!inputList.trim()) {
            setError('Текст не может быть пустым');
            return;
        }
        const listArray = inputList.split('\n');
        const filteredListArray = ignoreEmptyLines ? listArray.filter(line => line.trim() !== '') : listArray;
        const modifiedArray = filteredListArray.map(line => {
            return `${prefix}${line}${suffix}`;
        });
        setOutputList(modifiedArray.join('\n'));
    };

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

    return (
        <Panel id={props.id}>
            <PanelHeader before={<PanelHeaderBack onClick={() => go("home")} />}>
                Добавление префикса и постфикса
            </PanelHeader>
            <FormLayout className="add-prefix-form">
                <Textarea
                    placeholder="Введите список строк"
                    value={inputList}
                    onChange={handleInputChange}
                    className="add-prefix-textarea"
                />
                <Input
                    placeholder="Введите префикс"
                    value={prefix}
                    onChange={handlePrefixChange}
                    className="add-prefix-input"
                />
                <Input
                    placeholder="Введите постфикс"
                    value={suffix}
                    onChange={handleSuffixChange}
                    className="add-prefix-input"
                />
                <Div>
                    <Checkbox checked={ignoreEmptyLines} onChange={handleIgnoreEmptyLinesChange}>
                        Игнорировать пустые строки
                    </Checkbox>
                </Div>
                <ButtonGroup mode="horizontal" gap="m" stretched align="center">
                    <Button size="l" onClick={addPrefixSuffix} className="add-prefix-button" disabled={!inputList.trim()}>
                        Добавить префикс и постфикс
                    </Button>
                    <Button size="l" mode="tertiary" onClick={clearText} className="add-prefix-button" disabled={!inputList.trim()}>
                        <Icon24Delete />
                    </Button>
                </ButtonGroup>
                {error && <FormStatus mode="error">{error}</FormStatus>}
                {outputList && (
                    <Div className="add-prefix-result">
                        <Textarea
                            placeholder="Результат"
                            value={outputList}
                            readOnly
                            className="add-prefix-textarea"
                        />
                        <CopyToClipboard text={outputList} onCopy={showCopiedSnackbar}>
                            <Button size="l" stretched className="add-prefix-button">
                                Копировать результат
                            </Button>
                        </CopyToClipboard>
                    </Div>
                )}
                {snackbar}
            </FormLayout>
        </Panel>
    );
};

export default AddPrefix;
