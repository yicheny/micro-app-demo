import React from 'react';
import {Collapse} from "antd";
import DockApp from "./dockApp";

const { Panel } = Collapse;

export default function Base() {
    return  <Collapse defaultActiveKey={['1']} style={{margin:16}}>
        <Panel header="基座应用" key="1">
            <DockApp/>
        </Panel>
        <Panel header="子应用1" key="2">
        </Panel>
        <Panel header="子应用2" key="3">
        </Panel>
    </Collapse>
}


