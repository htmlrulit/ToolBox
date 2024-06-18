import React, { useState, useEffect, useContext } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol } from '@vkontakte/vkui';
import { GlobalContext, GetRoutes } from './context';
import '@vkontakte/vkui/dist/vkui.css';
import Home from './panels/Home';
import RemoveLines from "./panels/RemoveLines.jsx";
import DuplicateRemover from "./panels/DuplicateRemover.jsx";
import CombineColumns from "./panels/CombineColumns.jsx";
import SortList from "./panels/SortList.jsx";
import AddPrefix from "./panels/AddPrefix.jsx";
import LineCount from "./panels/LineCount.jsx";
import NumberLines from "./panels/NumberLines.jsx";
import CleanList from "./panels/CleanList.jsx";
import ReplaceText from "./panels/ReplaceText.jsx";
import RemoveHtmlTags from "./panels/RemoveHtmlTags.jsx";
import ChangeCase from "./panels/ChangeCase.jsx";
import UniqueLines from "./panels/UniqueLines.jsx";
import CompareTexts from "./panels/CompareTexts.jsx";
import TextAnalysis from "./panels/TextAnalysis.jsx";

const Gioconda = React.lazy(() => import('./panels/DuplicateRemover.jsx'));
const Error = React.lazy(() => import('./panels/Error'));

const App = () => {
  const { path, appearance, Appearance, go } = useContext(GlobalContext);
  const [fetchedUser, User] = useState(null);

  const VKBridgeSubscribeHandler = ({ detail: { type, data }}) => {
    if (type === 'VKWebAppUpdateConfig') {
      console.log(data)
      Appearance(data.appearance)
    }
  }

  useEffect(() => {
    bridge.subscribe(VKBridgeSubscribeHandler);
    bridge.send('VKWebAppGetUserInfo').then(User);

    const handlePopState = () => {
      go("home"); // Меняем на нужный путь, например, "home"
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      bridge.unsubscribe(VKBridgeSubscribeHandler);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
      <ConfigProvider appearance={appearance}>
        <AdaptivityProvider>
          <AppRoot>
            <SplitLayout>
              <SplitCol>
                <GetRoutes index='home' fallback='404'>
                  <View id="home" activePanel={path}>
                    <Home id='home' fetchedUser={fetchedUser} />
                    <DuplicateRemover id='duplicateremover' />
                    <RemoveLines id='removelines' />
                    <CombineColumns id='combinecolumns' />
                    <SortList id='sortlist' />
                    <AddPrefix id = 'addprefix'/>
                    <LineCount id = 'linecount'/>
                    <NumberLines id = 'numberlines'/>
                    <CleanList id = 'cleanlist'/>
                    <ReplaceText id = 'replacetext'/>
                    <RemoveHtmlTags id = 'removehtmltags'/>
                    <ChangeCase id = 'changecase'/>
                    <UniqueLines id = 'uniquelines'/>
                    <CompareTexts id = 'comparetexts'/>
                    <TextAnalysis id = 'textanalysis'/>
                  </View>
                </GetRoutes>
              </SplitCol>
            </SplitLayout>
          </AppRoot>
        </AdaptivityProvider>
      </ConfigProvider>
  );
}

export default App;
