import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Button, Input, Toast} from '@douyinfe/semi-ui';

// @ts-ignore
const microApp = window.microApp

function App() {
    const [data,setData] = useState('');

  return (
    <div className="App">
      <header className="App-header">
          <Button theme='solid' type='primary' onClick={getBaseData}>获取基座数据</Button>
          <Input  onChange={setData} style={{width:180}}/>
          <Button theme='solid' type='primary' onClick={dispatchToBase}>发送数据给基座</Button>
          <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );

  function dispatchToBase(){
      if(!microApp) return Toast.warning('没有获取到microApp！')
      if(!data) return Toast.warning('子应用1：请输入数据！')
      microApp.dispatch({data})
      Toast.info(`子应用1发送数据 ${data} 给基座！`)
  }

  function getBaseData(){
      if(!microApp) return Toast.warning('没有获取到microApp！')
      const {data} = microApp.getData() || {}
      if(!data) return Toast.warning('获取数据为空！')
      Toast.info(`子应用1获取数据：${data}`)
  }
}

export default App;
