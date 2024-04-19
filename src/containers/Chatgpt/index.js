import React from 'react';
import {
  Tabs,
} from 'antd';
import GPTNormalPage from '@components/GPTPages/Normal';
import GPTLongEssayPage from '@components/GPTPages/LongEssay';
import style from './index.module.scss';

const GPTPage = () => {
  const tabItems = [
    {
      key: 'normal',
      label: 'Normal ChatGPT',
      children: <GPTNormalPage />,
    },
    {
      key: 'long',
      label: 'Long Essay',
      children: <GPTLongEssayPage />,
    },
  ];

  return (
    <div className={style.GPTPage}>
      <Tabs defaultActiveKey="normal" items={tabItems} style={{ marginTop: 20 }} />
    </div>
  );
};

export default GPTPage;
