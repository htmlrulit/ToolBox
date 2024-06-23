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
import { Icon16Done, Icon24Delete } from '@vkontakte/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { GlobalContext } from "../context";
import './CombineColumns.css';

const CombineColumns = props => {
    const { go } = useContext(GlobalContext);
    const [firstList, setFirstList] = useState('');
    const [secondList, setSecondList] = useState('');
    const [combinedList, setCombinedList] = useState('');
    const [unpairedList, setUnpairedList] = useState('');
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

    const handleInputChange = (setter) => (e) => {
        const text = e.target.value;
        if (text.length <= 65535) {
            setter(text);
            setError('');
        } else {
            setError('Превышено максимальное количество символов: 65535');
        }
    };

    const handleCombine = () => {
        const firstArray = firstList.split('\n').filter(line => line.trim() !== '');
        const secondArray = secondList.split('\n').filter(line => line.trim() !== '');
        const maxLength = Math.max(firstArray.length, secondArray.length);
        let combined = [];
        let unpaired = [];

        for (let i = 0; i < maxLength; i++) {
            const firstItem = firstArray[i] || '';
            const secondItem = secondArray[i] || '';
            if (firstItem && secondItem) {
                combined.push(`${firstItem} ${secondItem}`);
            } else {
                unpaired.push(firstItem || secondItem);
            }
        }

        setCombinedList(combined.join('\n'));
        setUnpairedList(unpaired.join('\n'));
    };

    const clearText = () => {
        setFirstList('');
        setSecondList('');
        setCombinedList('');
        setUnpairedList('');
        setError('');
    };

    return (
        <Panel id={props.id}>
            <PanelHeader before={<PanelHeaderBack onClick={() => go("home")} />}>
                Объединение столбцов
            </PanelHeader>
            <FormLayout className="combine-columns-form">
                <Textarea
                    placeholder="Первый список"
                    value={firstList}
                    onChange={handleInputChange(setFirstList)}
                    className="combine-columns-textarea"
                />
                <Textarea
                    placeholder="Второй список"
                    value={secondList}
                    onChange={handleInputChange(setSecondList)}
                    className="combine-columns-textarea"
                />
                {error && <FormStatus mode="error">{error}</FormStatus>}
                <ButtonGroup mode="horizontal" gap="m" stretched align="center">
                    <Button size="l" onClick={handleCombine} className="combine-columns-button" disabled={!firstList.trim() && !secondList.trim()}>
                        Объединить
                    </Button>
                    <Button size="l" mode="tertiary" onClick={clearText} className="combine-columns-button" disabled={!firstList.trim() && !secondList.trim()}>
                        <Icon24Delete />
                    </Button>
                </ButtonGroup>
                {combinedList && (
                    <Div className="combine-columns-result">
                        <Textarea
                            placeholder="Комбинированный список"
                            value={combinedList}
                            readOnly
                            className="combine-columns-textarea"
                        />
                        <CopyToClipboard text={combinedList} onCopy={showCopiedSnackbar}>
                            <Button size="l" stretched className="combine-columns-button">
                                Копировать
                            </Button>
                        </CopyToClipboard>
                    </Div>
                )}
                {unpairedList && (
                    <Div className="combine-columns-result">
                        <Textarea
                            placeholder="Строки без пары"
                            value={unpairedList}
                            readOnly
                            className="combine-columns-textarea"
                        />
                        <CopyToClipboard text={unpairedList} onCopy={showCopiedSnackbar}>
                            <Button size="l" stretched className="combine-columns-button">
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

export default CombineColumns;
