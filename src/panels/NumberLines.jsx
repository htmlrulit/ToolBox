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
import {Icon16Done, Icon24Delete} from '@vkontakte/icons';
import { GlobalContext } from "../context";
import './NumberLines.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
const NumberLines = props => {
    const { go } = useContext(GlobalContext);
    const [inputList, setInputList] = useState('');
    const [separator, setSeparator] = useState('dot');
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

    const handleSeparatorChange = (e) => {
        setSeparator(e.target.value);
    };

    const numberLines = () => {
        const listArray = inputList.split('\n').filter(line => line.trim() !== '');
        const numberedArray = listArray.map((line, index) => {
            switch (separator) {
                case 'dot':
                    return `${index + 1}. ${line}`;
                case 'paren':
                    return `${index + 1}) ${line}`;
                case 'space':
                    return `${index + 1} ${line}`;
                default:
                    return `${index + 1}. ${line}`;
            }
        });
        setOutputList(numberedArray.join('\n'));
    };

    const clearText = () => {
        setInputList('');
        setOutputList('');
        setSeparator('dot');
        setError('');
    };


    return (
        <Panel id={props.id}>
            <PanelHeader before={<PanelHeaderBack onClick={() => go("home")} />}>
                Нумерация строк
            </PanelHeader>
            <FormLayout className="number-lines-form">
                <Textarea
                    placeholder="Введите список строк"
                    value={inputList}
                    onChange={handleInputChange}
                    className="number-lines-textarea"
                />
                {error && <FormStatus mode="error">{error}</FormStatus>}
                <Div>
                    <Radio name="separator" value="dot" checked={separator === 'dot'} onChange={handleSeparatorChange}>
                        Точка
                    </Radio>
                    <Radio name="separator" value="paren" checked={separator === 'paren'} onChange={handleSeparatorChange}>
                        Скобка
                    </Radio>
                    <Radio name="separator" value="space" checked={separator === 'space'} onChange={handleSeparatorChange}>
                        Пробел
                    </Radio>
                </Div>
                <ButtonGroup mode="horizontal" gap="m" stretched align="center">
                    <Button size="l" onClick={numberLines} className="number-lines-button" disabled={!inputList.trim()}>
                        Начать
                    </Button>
                    <Button size="l" mode="tertiary" onClick={clearText} className="number-lines-button" disabled={!inputList.trim()}>
                        <Icon24Delete />
                    </Button>
                </ButtonGroup>
                {outputList && (
                    <Div className="number-lines-result">
                        <Textarea
                            placeholder="Результат"
                            value={outputList}
                            readOnly
                            className="number-lines-textarea"
                        />
                        <CopyToClipboard text={outputList} onCopy={showCopiedSnackbar}>
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

export default NumberLines;
