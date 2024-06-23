import React, { useContext, useState } from 'react';
import { Panel, PanelHeader, Header, Button, Group, Div, Search } from '@vkontakte/vkui';
import { GlobalContext } from '../context';
import './Home.css';

const Home = ({ id, fetchedUser }) => {
    const { go } = useContext(GlobalContext);
    const [search, setSearch] = useState('');

    const functions = [
        { name: 'Анализ текста', id: 'textanalysis' },
        { name: 'Добавление префикса', id: 'addprefix' },
        { name: 'Замена текста', id: 'replacetext' },
        { name: 'Изменение регистра', id: 'changecase' },
        { name: 'Нумерация строк', id: 'numberlines' },
        { name: 'Объединение столбцов', id: 'combinecolumns' },
        { name: 'Подсчет строк', id: 'linecount' },
        { name: 'Сортировка (А-Я)', id: 'sortlist' },
        { name: 'Сравнить текст', id: 'comparetexts' },
        { name: 'Удаление дубликатов', id: 'duplicateremover' },
        { name: 'Удаление разрывов', id: 'removelines' },
        { name: 'Очистка символов', id: 'cleanlist' },
        { name: 'Уникальные строки', id: 'uniquelines' },
        { name: 'Удаление HTML-тегов', id: 'removehtmltags' },
    ];

    const filteredFunctions = functions.filter(func =>
        func.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Panel id={id}>
            <PanelHeader>ToolBox</PanelHeader>
            <Div className="intro">
                <h1>Добро пожаловать в ToolBox!</h1>
                <p>
                    ToolBox - это набор онлайн-инструментов для работы с текстом. Используйте наши инструменты для анализа, форматирования и манипуляции над ним.
                </p>
            </Div>
            <Search
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                after={null}
                maxLength="20"
                placeholder="Поиск по функциям"
            />
            <Group header={<Header mode="secondary">Функции</Header>}>
                {filteredFunctions.length > 0 ? (
                    filteredFunctions.map((func) => (
                        <Div key={func.id}>
                            <Button
                                stretched
                                size="l"
                                mode="secondary"
                                onClick={() => go(func.id)}
                            >
                                {func.name}
                            </Button>
                        </Div>
                    ))
                ) : (
                    <Div className="no-results">
                        <p>Не найдено результатов</p>
                    </Div>
                )}
            </Group>
        </Panel>
    );
}

export default Home;
