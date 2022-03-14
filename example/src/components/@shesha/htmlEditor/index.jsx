import React from 'react';
import { Skeleton } from 'antd';
//import 'jodit/build/jodit.min.css';

const JoditReact = React.lazy(() => {
  return import('jodit-react');
});

// note: we have to use React.lazy to disable SSR in the nextjs
const HtmlEditor = ({ value, onChange, ...restProps }) => {
  const isSSR = typeof window === 'undefined';

  console.log({
    value,
    restProps,
  });

  return isSSR ? (
    <Skeleton loading={true}></Skeleton>
  ) : (
    <React.Suspense fallback={<div>Loading</div>}>
      <JoditReact value={value} onChange={onChange} {...restProps} />
    </React.Suspense>
  );
};

export default HtmlEditor;
