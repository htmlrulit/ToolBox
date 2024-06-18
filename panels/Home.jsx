import React, { useContext } from 'react';
import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar } from '@vkontakte/vkui';
import { GlobalContext } from '../context';
import './Home.css';

const Home = ({ id, fetchedUser }) => {
  const { go } = useContext(GlobalContext);

  return (
      <Panel id={id}>
        <PanelHeader>ToolBox</PanelHeader>
        <Div className="intro">
          <h1>Добро пожаловать в ToolBox!</h1>
          <p>
            ToolBox - это набор онлайн-инструментов для работы с текстом. Используйте наши инструменты для анализа, форматирования и манипуляции над ним.
          </p>
        </Div>
        <Group header={<Header mode="secondary">Функции</Header>}>
          <Div><Button stretched size="l" mode="secondary" onClick={() => go("textanalysis")}>Анализ текста</Button></Div>
          <Div><Button stretched size="l" mode="secondary" onClick={() => go("addprefix")}>Добавление префикса</Button></Div>
          <Div><Button stretched size="l" mode="secondary" onClick={() => go("replacetext")}>Замена текста</Button></Div>
          <Div><Button stretched size="l" mode="secondary" onClick={() => go("changecase")}>Изменение регистра</Button></Div>
          <Div><Button stretched size="l" mode="secondary" onClick={() => go("numberlines")}>Нумерация строк</Button></Div>
          <Div><Button stretched size="l" mode="secondary" onClick={() => go("combinecolumns")}>Объединение столбцов</Button></Div>
          <Div><Button stretched size="l" mode="secondary" onClick={() => go("linecount")}>Подсчет строк</Button></Div>
          <Div><Button stretched size="l" mode="secondary" onClick={() => go("sortlist")}>Сортировка (А-Я)</Button></Div>
          <Div><Button stretched size="l" mode="secondary" onClick={() => go("comparetexts")}>Сравнить текст</Button></Div>
          <Div><Button stretched size="l" mode="secondary" onClick={() => go("duplicateremover")}>Удаление дубликатов</Button></Div>
          <Div><Button stretched size="l" mode="secondary" onClick={() => go("removelines")}>Удаление разрывов</Button></Div>
          <Div><Button stretched size="l" mode="secondary" onClick={() => go("cleanlist")}>Очистка символов</Button></Div>
          <Div><Button stretched size="l" mode="secondary" onClick={() => go("uniquelines")}>Уникальные строки</Button></Div>
          <Div><Button stretched size="l" mode="secondary" onClick={() => go("removehtmltags")}>Удаление HTML-тегов</Button></Div>
        </Group>
      </Panel>
  );
}

export default Home;
