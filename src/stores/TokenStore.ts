import Store from './store';
import { IToken } from '../entities/token';
import { createToken, deleteToken, readTokens } from '../apis/db';

export type TokenSnapshot = {
  token: IToken[];
};

export default class TokenStore extends Store<TokenSnapshot> {
  tokens: IToken[] = [];

  constructor() {
    super();
    this.takeSnapshot();
  }

  addToken = async (token: IToken) => {
    await createToken(token);
    await this.update();
  };

  getTokens = async () => await readTokens();

  deleteToken = async (id: number) => await deleteToken(id);

  private update = async () => {
    await this.takeSnapshot();
    this.publish();
  };

  private takeSnapshot = async () => {
    await readTokens();
  };
}
