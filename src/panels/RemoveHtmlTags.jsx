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
    Snackbar
} from '@vkontakte/vkui';
import {Icon16Done, Icon24Delete} from '@vkontakte/icons';
import { GlobalContext } from "../context";
import './RemoveHtmlTags.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
const RemoveHtmlTags = props => {
    const { go } = useContext(GlobalContext);
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
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
            setInputText(text);
            setError('');
        } else {
            setError('Превышено максимальное количество символов: 65535');
        }
    };

    const removeHtmlTags = () => {
        console.log('Initial input:', inputText); // Отладочное сообщение
        const plainText = inputText.replace(/<\/?[^>]+(>|$)/g, "");
        console.log('Output:', plainText); // Отладочное сообщение
        setOutputText(plainText);
    };

    const clearText = () => {
        setInputText('');
        setOutputText('');
        setError('');
    };



    return (
        <Panel id={props.id}>
            <PanelHeader before={<PanelHeaderBack onClick={() => go("home")} />}>
                Удаление HTML-тегов
            </PanelHeader>
            <FormLayout className="remove-html-tags-form">
                <Textarea
                    placeholder="Введите текст с HTML-тегами"
                    value={inputText}
                    onChange={handleInputChange}
                    className="remove-html-tags-textarea"
                />
                {error && <FormStatus mode="error">{error}</FormStatus>}
                <ButtonGroup mode="horizontal" gap="m" stretched align="center">
                    <Button size="l" onClick={removeHtmlTags} className="remove-html-tags-button" disabled={!inputText.trim()}>
                        Удалить
                    </Button>
                    <Button size="l" mode="tertiary" onClick={clearText} className="remove-html-tags-button" disabled={!inputText.trim()}>
                        <Icon24Delete />
                    </Button>
                </ButtonGroup>
                {outputText && (
                    <Div className="remove-html-tags-result">
                        <Textarea
                            placeholder="Результат"
                            value={outputText}
                            readOnly
                            className="remove-html-tags-textarea"
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

export default RemoveHtmlTags;
