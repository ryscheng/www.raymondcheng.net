import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { DataProvider } from '@plasmicapp/loader-react';
import React from "react";

type DocusaurusContextProviderProps = {
  className?: string;
  children?: React.ReactNode;
};

function DocusaurusContextProvider(props: DocusaurusContextProviderProps) {
  const { className, children } = props;
  const ctx = useDocusaurusContext();
  return (
    <div className={className}>
      <DataProvider name={"docusaurus"} data={ctx}>
        {children}
      </DataProvider>
    </div>
  );
}

export type { DocusaurusContextProviderProps };
export { DocusaurusContextProvider };