import React, { useState, useContext } from 'react';
import {
    Panel,
    PanelHeader,
    PanelHeaderBack,
    FormLayout,
    Textarea,
    Input,
    Button,
    Div,
    Checkbox,
    FormStatus,
    ButtonGroup,
    Snackbar
} from '@vkontakte/vkui';
import {Icon16Done, Icon24Delete} from '@vkontakte/icons';
import { GlobalContext } from "../context";
import './ReplaceText.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const ReplaceText = props => {
    const { go } = useContext(GlobalContext);
    const [inputText, setInputText] = useState('');
    const [searchText, setSearchText] = useState('');
    const [replaceText, setReplaceText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [error, setError] = useState('');
    const [caseSensitive, setCaseSensitive] = useState(false);
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
            setInputText(text);
            setError('');
        } else {
            setError('Превышено максимальное количество символов: 65535');
        }
    };

    const handleSearchTextChange = (e) => {
        setSearchText(e.target.value);
        if (e.target.value) {
            setError('');
        }
    };

    const handleReplaceTextChange = (e) => {
        setReplaceText(e.target.value);
    };

    const handleCaseSensitiveChange = (e) => {
        setCaseSensitive(e.target.checked);
    };

    const handleReplace = () => {
        if (!searchText) {
            setError('Введите текст для поиска');
            return;
        }
        const flags = caseSensitive ? 'g' : 'gi';
        const regex = new RegExp(searchText, flags);
        const replacedText = inputText.replace(regex, replaceText);
        setOutputText(replacedText);
    };

    const clearText = () => {
        setInputText('');
        setSearchText('');
        setReplaceText('');
        setOutputText('');
        setCaseSensitive(false);
        setError('');
    };



    return (
        <Panel id={props.id}>
            <PanelHeader before={<PanelHeaderBack onClick={() => go("home")} />}>
                Замена текста
            </PanelHeader>
            <FormLayout className="replace-text-form">
                <Textarea
                    placeholder="Введите текст"
                    value={inputText}
                    onChange={handleInputChange}
                    className="replace-text-textarea"
                />
                {error && <FormStatus mode="error">{error}</FormStatus>}
                <Input
                    placeholder="Текст для поиска"
                    value={searchText}
                    onChange={handleSearchTextChange}
                    className="replace-text-input"
                />
                <Input
                    placeholder="Текст для замены"
                    value={replaceText}
                    onChange={handleReplaceTextChange}
                    className="replace-text-input"
                />
                <Div>
                    <Checkbox checked={caseSensitive} onChange={handleCaseSensitiveChange}>
                        Учитывать регистр
                    </Checkbox>
                </Div>
                <ButtonGroup mode="horizontal" gap="m" stretched align="center">
                    <Button size="l" onClick={handleReplace} className="replace-text-button" disabled={!inputText.trim() || !searchText.trim()}>
                        Заменить
                    </Button>
                    <Button size="l" mode="tertiary" onClick={clearText} className="replace-text-button" disabled={!inputText.trim()}>
                        <Icon24Delete />
                    </Button>
                </ButtonGroup>
                {outputText && (
                    <Div className="replace-text-result">
                        <Textarea
                            placeholder="Результат"
                            value={outputText}
                            readOnly
                            className="replace-text-textarea"
                        />
                        <CopyToClipboard text={outputText} onCopy={showCopiedSnackbar}>
                            <Button size="l" stretched className="add-prefix-button">
                                Копировать
                            </Button>
                        </CopyToClipboard>
                    </Div>
                )}
                {snackbar}
            </FormLayout>
        </Panel>
    );
};

export default ReplaceText;
