/* istanbul ignore file */
/* eslint-disable no-eq-null */
import { Network, Web3Provider } from '@ethersproject/providers';
import { defineReadOnly } from '@ethersproject/properties';

// Extending Web3Provider and adds a static network detection function
export class StaticWeb3Provider extends Web3Provider {
  // Copied from StaticJsonRpcProvider: https://github.com/ethers-io/ethers.js/blob/ce8f1e4015c0f27bf178238770b1325136e3351a/packages/providers/src.ts/url-json-rpc-provider.ts#L28
  async detectNetwork(): Promise<Network> {
    let { network } = this;
    if (network == null) {
      network = await super.detectNetwork();
      // If still not set, set it
      if (this._network == null) {
        // A static network does not support "any"
        defineReadOnly(this, '_network', network);

        this.emit('network', network, null);
      }
    }
    return network;
  }
}
