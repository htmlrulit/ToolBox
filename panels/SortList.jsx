import React, { useState, useContext } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
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
    ButtonGroup, Snackbar
} from '@vkontakte/vkui';
import {Icon16Done, Icon24Delete} from '@vkontakte/icons';
import { GlobalContext } from "../context";
import './SortList.css';

const SortList = props => {
    const { go } = useContext(GlobalContext);
    const [inputList, setInputList] = useState('');
    const [sortedList, setSortedList] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
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
        setInputList(e.target.value);
    };

    const handleSortOrderChange = (e) => {
        setSortOrder(e.target.value);
    };

    const sortList = () => {
        // Разделяем строки по новой строке или запятой и удаляем пробелы
        const listArray = inputList.split(/[\n,]/).map(item => item.trim()).filter(line => line !== '');
        const sortedArray = listArray.sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.localeCompare(b);
            } else {
                return b.localeCompare(a);
            }
        });
        setSortedList(sortedArray.join('\n'));
    };

    const clearText = () => {
        setInputList('');
        setSortedList('');
        setSortOrder('asc');
        setError('');
    };

    return (
        <Panel id={props.id}>
            <PanelHeader before={<PanelHeaderBack onClick={() => go("home")} />}>
                Сортировка (А-Я)
            </PanelHeader>
            <FormLayout className="sort-list-form">
                <FormStatus mode="default">
                    Сортировать можно как в формате списка, так и в формате перечислений (одной строки). Если Вы сортируете
                    в формате одной строки, то, пожалуйста, убедитесь, что между сортируемыми элементами отсутствуют пробелы.
                </FormStatus>
                <Textarea
                    placeholder="Введите список, разделенный новой строкой или запятой"
                    value={inputList}
                    onChange={handleInputChange}
                    className="sort-list-textarea"
                />

                <Div>
                    <Radio name="sortOrder" value="asc" checked={sortOrder === 'asc'} onChange={handleSortOrderChange}>
                        По возрастанию (от А до Я)
                    </Radio>
                    <Radio name="sortOrder" value="desc" checked={sortOrder === 'desc'} onChange={handleSortOrderChange}>
                        По убыванию (от Я до А)
                    </Radio>
                </Div>
                <ButtonGroup mode="horizontal" gap="m" stretched align="center">
                    <Button size="l" onClick={sortList} className="sort-list-button" disabled={!inputList.trim()}>
                        Сортировать
                    </Button>
                    <Button size="l" mode="tertiary" onClick={clearText} className="sort-list-button" disabled={!inputList.trim()}>
                        <Icon24Delete />
                    </Button>
                </ButtonGroup>
                {sortedList && (
                    <Div className="sort-list-result">
                        <Textarea
                            placeholder="Отсортированный список"
                            value={sortedList}
                            readOnly
                            className="sort-list-textarea"
                        />
                        <CopyToClipboard text={sortedList} onCopy={showCopiedSnackbar}>
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

export default SortList;
