import Test from "./share/components/Test";
import styls from './App.module.scss';
import RootnetUi from "./share/components/RootnetUI";

export default function App(){
    return <div className={styls.entry}>
        <Test/>
        <RootnetUi/>
    </div>
}
