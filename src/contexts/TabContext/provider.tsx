import { useState } from 'react';
import { TabContext, tabs } from './context';
import { Tab } from '@type/home';

export default function TabProvider(props: { children: React.ReactNode }) {
  const [tab, setTab] = useState<Tab>('searchRoute');

  const handleSetNumber = (newTab: number) => {
    if (newTab < 0 || newTab >= tabs.length) throw new Error('Tab index out of range');
    setTab(tabs[newTab]);
  };

  const handleSetName = (newTab: Tab) => {
    if (!tabs.includes(newTab)) throw new Error('Tab name not recognized');
    setTab(newTab);
  };

  return (
    <TabContext.Provider value={{ tab, setTabNumber: handleSetNumber, setTabName: handleSetName }}>
      {props.children}
    </TabContext.Provider>
  );
}
