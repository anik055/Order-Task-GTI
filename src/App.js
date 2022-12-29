
import './App.css';
import Item from './Components/Item';
import Login from './Components/Login';
import Order from './Components/order';
import Pay from './Components/payment';
import Failed from './Components/payment/Failed';
// import Failed from './Components/payment/Failed';
import Successful from './Components/payment/Successful';

function App() {
  return (
    <div className="App">
      <Login />
      <Pay />
      <Item />
      <Order />
      <Successful />

    </div>
  );
}

export default App;
