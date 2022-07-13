import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Toast } from '@douyinfe/semi-ui';

function App() {
    const handleClick = () => {
        // @ts-ignore
        const microApp = window.microApp
        if(microApp){
            const {data} = microApp.getData() || {}
            if(!data){
                Toast.warning('获取数据为空！')
            }else{
                Toast.info(`子应用1获取数据：${data}`)
            }
        }
        else{
            Toast.warning('没有获取到microApp！')
        }

    }
  return (
    <div className="App">
      <header className="App-header">
          <Button theme='solid' type='primary' onClick={handleClick}>获取基座数据</Button>
          <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
