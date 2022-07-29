import Test from "./share/components/Test";
import styls from './App.module.scss'

export default function App(){
    return <div className={styls.entry}>
        <Test/>
    </div>
}
