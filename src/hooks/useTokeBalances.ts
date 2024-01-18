import { getTokenBalance } from '../utils/web3';

const useTokenBalances = async (
  targetAddress: string,
  accountAddress: string,
) => {
  const balance = await getTokenBalance(targetAddress, accountAddress);
  return balance;
};

export default useTokenBalances;
