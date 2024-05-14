
import { useState, useEffect } from 'react';
import { Configuration, Flex, TabPanel, Tabs } from '@pega/cosmos-react-core';
import RatingElem from './RatingElem';
import StyledFusionAixComponentsFxRatingLayoutWrapper from './styles';
import getAllFields from './utils';

export default function FusionAixComponentsFxRatingLayout(props) {
  const { getPConnect, minWidth = '40ch' } = props;
  const [tabs, setTabs] = useState([]);
  const [panelShown, changePanel] = useState('0');
  const handleTabChange = (id) => {
    changePanel(id);
  };
  useEffect(() => {
    const tmpFields = getAllFields(getPConnect);
    const categories = {};
    const tmpTabs = [];
    if (tmpFields && tmpFields[0] && tmpFields[0].value) {
      /* Retrieve the name of the embedded object */
      const paths = tmpFields[2].path?.split(' ');
      let path = '';
      if (paths && paths.length == 2) {
        path = paths[1].substring(0, paths[1].indexOf('[')).trim();
      }
      tmpFields[0].value.forEach((category, i) => {
        const content = categories[category] || [];
        const item = {
          id: `${category} - ${tmpFields[1].value[i]}`,
          label: tmpFields[1].value[i],
          value: tmpFields[2].value[i],
          path,
          propIndex: i
        };
        content.push(item);
        categories[category] = content;
      });
    }
    let tabId = 0;
    for (const [key, item] of Object.entries(categories)) {
      tmpTabs.push({
        name: key,
        id: `${tabId}`,
        content: item
      });
      tabId += 1;
    }
    setTabs(tmpTabs);
  }, [getPConnect]);

  return (
    <Configuration>
      <Flex container={{ direction: 'column' }}>
        <Flex item={{ grow: 1 }}>
          <Tabs tabs={tabs} onTabClick={handleTabChange} currentTabId={panelShown} />
        </Flex>
        <Flex container={{ pad: 1 }} item={{ grow: 1 }}>
          {tabs.map(tab => (
            <TabPanel
              tabId={tab.id}
              currentTabId={panelShown}
              key={tab.id}
              style={{ width: '100%' }}
            >
              <StyledFusionAixComponentsFxRatingLayoutWrapper minWidth={minWidth}>
                {tab.content.map((content) => {
                  return (
                    <RatingElem
                      key={content.id}
                      label={content.label}
                      value={content.value}
                      path={content.path}
                      getPConnect={getPConnect}
                      propIndex={content.propIndex}
                    />
                  );
                })}
              </StyledFusionAixComponentsFxRatingLayoutWrapper>
            </TabPanel>
          ))}
        </Flex>
      </Flex>
    </Configuration>
  );
}
