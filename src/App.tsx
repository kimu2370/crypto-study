import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { getEtherBalance, getTokenBalance } from './utils/web3';
import { createToken, initDB, readTokens } from './apis/db';
import { IToken } from './entities/token';
import { ConnectWallet } from './components/ConnectWallet';

initDB();

function App() {
  const [addresses, setAddresses] = useState({ target: '', account: '' });
  const [newToken, setNewToken] = useState({ name: '', address: '' });
  const [balanceOf, setBalanceOf] = useState('');
  const [tokens, setTokens] = useState<IToken[]>([]);
  const [myEth, setMyEth] = useState('');
  // 토큰 목록을 불러오는 함수
  const loadTokens = async () => {
    try {
      const fetchedTokens = await readTokens();
      setTokens(fetchedTokens);
    } catch (error) {
      console.error('Failed to fetch tokens:', error);
    }
  };

  useEffect(() => {
    loadTokens();
    (async () => {
      const balance = await getEtherBalance(
        '0xc7D97b52efCE1c47814ba8983b6528938e1aeE5C',
      );
      setMyEth(balance);
    })();
  }, []);

  // 계산: 토큰 잔액 조회
  const fetchTokenBalance = async (target: string, account: string) => {
    try {
      return await getTokenBalance(target, account);
    } catch (error) {
      console.error('잔액 조회 실패:', error);
      alert('잔액 조회에 실패했습니다.');
    }
  };

  // 액션: 잔액 체크 및 상태 업데이트
  const handleCheckBalance = async () => {
    if (!addresses.account || !addresses.target) {
      alert('토큰 또는 계정 주소를 입력하지 않았습니다.');
      return;
    }
    const balance = await fetchTokenBalance(
      addresses.target,
      addresses.account,
    );
    if (balance) setBalanceOf(balance);
  };

  const handleAddToken = async () => {
    await createToken({
      name: newToken.name,
      address: newToken.address,
    });
    await loadTokens();
  };

  return (
    <>
      <ConnectWallet />
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h3>My ETH: {myEth}</h3>
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
      <div>
        <button onClick={handleCheckBalance}>잔액 조회</button>
      </div>
      <br />
      <div>
        <label>토큰 이름: </label>
        <input
          type="text"
          value={newToken.name}
          onChange={(e) =>
            setNewToken((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </div>
      <div>
        <label>토큰 주소: </label>
        <input
          type="text"
          value={newToken.address}
          onChange={(e) =>
            setNewToken((prev) => ({ ...prev, address: e.target.value }))
          }
        />
      </div>
      <ul>
        {tokens.map((token) => (
          <li key={token.address}>{token.name}</li>
        ))}
      </ul>
      <div>
        <button onClick={handleAddToken}>토큰 추가</button>
      </div>
      <div>{balanceOf && <p>잔액: {balanceOf} ETH</p>}</div>
      <ul></ul>
    </>
  );
}

export default App;
