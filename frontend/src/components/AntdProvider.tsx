'use client';

import React from 'react';
import { ConfigProvider } from 'antd';
import { useServerInsertedHTML } from 'next/navigation';
import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs';

export default function AntdProvider({ children }: { children: React.ReactNode }) {
  const [cache] = React.useState(() => createCache());

  useServerInsertedHTML(() => {
    const styleText = extractStyle(cache, true);
    return styleText ? (
      <style
        id="antd-css"
        dangerouslySetInnerHTML={{ __html: styleText }}
      />
    ) : null;
  });

  return (
    <StyleProvider cache={cache}>
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: '#1890ff',
            borderRadius: 6,
          },
        }}
      >
        {children}
      </ConfigProvider>
    </StyleProvider>
  );
}
