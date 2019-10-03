# Browser extension for save data in Bitcoin blockchain

You should to setup bitcoin.conf like this

```
testnet=1
server=1
rpcbind=127.0.0.1
rpcallowip=127.0.0.1
rpcuser=rpc_btc_test
rpcpassword=rpc_btc_password_test
txindex=1

[test]
rpcport=18332
limitancestorcount=1000
limitdescedantcount=1000
walletrejectlongchains=0

```
