import React, { useState, useContext } from 'react';
import {
    Panel,
    PanelHeader,
    PanelHeaderBack,
    FormLayout,
    Textarea,
    Button,
    Radio,
    Div,
    FormStatus,
    ButtonGroup,
    Snackbar
} from '@vkontakte/vkui';
import { Icon16Done, Icon24Delete } from '@vkontakte/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { GlobalContext } from "../context";
import './ChangeCase.css';

const ChangeCase = props => {
    const { go } = useContext(GlobalContext);
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [caseType, setCaseType] = useState('lowercase');
    const [error, setError] = useState('');
    const [snackbar, setSnackbar] = useState(null);

    const handleInputChange = (e) => {
        const text = e.target.value;
        if (text.length <= 65535) {
            setInputText(text);
            setError('');
        } else {
            setError('Превышено максимальное количество символов: 65535');
        }
    };

    const handleCaseChange = (e) => {
        setCaseType(e.target.value);
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

    const changeCase = () => {
        let changedText;
        switch (caseType) {
            case 'uppercase':
                changedText = inputText.toUpperCase();
                break;
            case 'lowercase':
                changedText = inputText.toLowerCase();
                break;
            case 'capitalize':
                changedText = inputText.split(/(\s+)/).map(word =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                ).join('');
                break;
            case 'sentence':
                changedText = inputText.replace(/(^\s*\p{L})|([.!?]\s*\p{L})/gu, c => c.toUpperCase());
                break;
            default:
                changedText = inputText;
        }
        setOutputText(changedText);
    };

    const clearText = () => {
        setInputText('');
        setOutputText('');
        setError('');
    };

    return (
        <Panel id={props.id}>
            <PanelHeader before={<PanelHeaderBack onClick={() => go("home")} />}>
                Изменение регистра
            </PanelHeader>
            <FormLayout className="change-case-form">
                <Textarea
                    placeholder="Введите текст"
                    value={inputText}
                    onChange={handleInputChange}
                    className="change-case-textarea"
                />
                {error && <FormStatus mode="error">{error}</FormStatus>}
                <Div>
                    <Radio name="caseType" value="uppercase" checked={caseType === 'uppercase'} onChange={handleCaseChange}>
                        Верхний регистр
                    </Radio>
                    <Radio name="caseType" value="lowercase" checked={caseType === 'lowercase'} onChange={handleCaseChange}>
                        Нижний регистр
                    </Radio>
                    <Radio name="caseType" value="capitalize" checked={caseType === 'capitalize'} onChange={handleCaseChange}>
                        Заглавные буквы в каждом слове
                    </Radio>
                    <Radio name="caseType" value="sentence" checked={caseType === 'sentence'} onChange={handleCaseChange}>
                        Заглавные буквы в начале каждого предложения
                    </Radio>
                </Div>
                <ButtonGroup mode="horizontal" gap="m" stretched align="center">
                    <Button size="l" onClick={changeCase} className="change-case-button" disabled={!inputText}>
                        Изменить регистр
                    </Button>
                    <Button size="l" mode="tertiary" onClick={clearText} className="change-case-button" disabled={!inputText}>
                        <Icon24Delete />
                    </Button>
                </ButtonGroup>
                {outputText && (
                    <Div className="change-case-result">
                        <Textarea
                            placeholder="Результат"
                            value={outputText}
                            readOnly
                            className="change-case-textarea"
                        />
                        <CopyToClipboard text={outputText} onCopy={showCopiedSnackbar}>
                            <Button size="l" stretched className="change-case-button">
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

export default ChangeCase;
