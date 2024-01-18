import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { getTokenBalance } from './utils/web3';

function App() {
  const [addresses, setAddresses] = useState({
    target: '',
    account: '',
  });
  const [balanceOf, setBalanceOf] = useState('');

  const handleCheckBalance = async () => {
    if (!addresses.account || !addresses.target) {
      alert('토큰 또는 계정 주소를 입력하지 않았습니다.');
      return;
    }
    const balance = await getTokenBalance(addresses.target, addresses.account);
    console.log(balance);
    setBalanceOf(balance);
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div>
        <label>토큰 주소: </label>
        <input
          type="text"
          value={addresses.target}
          onChange={(e) =>
            setAddresses((prev) => ({ ...prev, target: e.target.value }))
          }
        />
      </div>
      <div>
        <label>계정 주소: </label>
        <input
          type="text"
          value={addresses.account}
          onChange={(e) =>
            setAddresses((prev) => ({ ...prev, account: e.target.value }))
          }
        />
      </div>
      <br />
      <button onClick={handleCheckBalance}>잔액 조회</button>
      <div>{balanceOf && <p>잔액: {balanceOf} ETH</p>}</div>
    </>
  );
}

export default App;
