import Web3 from 'web3';
import { providers } from './config';
import erc20Abi from '../abi/erc20.json';
import { ethers, BigNumberish } from 'ethers';

// Infura를 통해 Ethereum 네트워크에 연결
const web3 = new Web3(providers.infura);

export async function getEtherBalance(address: string): Promise<string> {
  try {
    const balance = await web3.eth.getBalance(address);
    return web3.utils.fromWei(balance, 'ether');
  } catch (error) {
    console.error('잔액 조회 중 오류 발생:', error);
    return '0';
  }
}

// usdt : 0xdAC17F958D2ee523a2206206994597C13D831ec7

// 토큰 잔액을 조회하는 함수
export async function getTokenBalance(
  tokenAddress: string,
  accountAddress: string,
) {
  const tokenContract = new web3.eth.Contract(erc20Abi, tokenAddress);
  const balance = (await tokenContract.methods
    .balanceOf(accountAddress)
    .call()) as BigNumberish;

  const balanceBigNumber = ethers.formatUnits(balance, 18);

  return balanceBigNumber;
}

export default web3;
