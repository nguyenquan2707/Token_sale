# Token_sale

1. truffle migrate
2. truffle console

3. DappToken.deployed().then(function(i){ token = i;}) 

4. token.totalSupply().then((i){totalSupply = i;})

   token.name() = "DappToken"

    token.symbol() = "DAT"




5. totalSupply.toNumber() = 1000000

6. truffle test: to test

7. web3.eth.getAccounts(): to get all accounts

[
  '0xEd86D2C87a42Bf3031aBB85b210a9946b82E8B94',

  '0xbF6AaD669Dc721196b1BdA011d524c2374D6aB3b',
  
  '0x0F5847F661D4B4f1680B4CE0a4d749a4AeF9689F',
  
  '0x94A8d2C111545993EEe9B6A9333a7f57263BFF7d',
  
  '0x04FdB0af8D0794A0960308D9F676Ee6b99bcF336',
  
  '0xdD53e28Af88d6112CaE80135dAcaf677984d9be1',
  
  '0x673FE9F9813d1ad4b40f4a810A525A3F5Ae141AB',
  
  '0x1C8d4793cf7C08E437D3F5aC158DE99884ae808E',
  
  '0x39cbc3F2A4D46e1d3BDb0E01F09302397E2c080D',
  
  '0x2803d6a6A382A5340319CA35723dC832b590520E' ]

8. get specific address 
    let address1 = web3.eth.getAccounts().then(f => f[1])

9. test approve, transfer, allowance function in development console:

  token.transfer("0xbF6AaD669Dc721196b1BdA011d524c2374D6aB3b", 1)

   token.approve("0xbF6AaD669Dc721196b1BdA011d524c2374D6aB3b", 1)

   
   token.allowance("0xEd86D2C87a42Bf3031aBB85b210a9946b82E8B94","0xbF6AaD669Dc721196b1BdA011d524c2374D6aB3b") = <BN: 1>

10. transfer 100 Tokens from accounts[0] to accounts[2]
    token.transfer("0x0F5847F661D4B4f1680B4CE0a4d749a4AeF9689F", 100, {from: "0xEd86D2C87a42Bf3031aBB85b210a9946b82E8B94"})

11. approve accounts[4] to spending 10 tokens from accounts[2]

 ```token.approve("0x04FdB0af8D0794A0960308D9F676Ee6b99bcF336", 10, {from:"0x0F5847F661D4B4f1680B4CE0a4d749a4AeF9689F"})```

12. delegated transfer from accounts[0] for accounts[4] to spending 10 tokens to accounts[3]

token.transferFrom("0x0F5847F661D4B4f1680B4CE0a4d749a4AeF9689F","0x94A8d2C111545993EEe9B6A9333a7f57263BFF7d",10, {from:"0x04FdB0af8D0794A0960308D9F676Ee6b99bcF336"})

13. check allowance from accounts[2] and accounts[4]
  token.allowance("0x0F5847F661D4B4f1680B4CE0a4d749a4AeF9689F","0x04FdB0af8D0794A0960308D9F676Ee6b99bcF336") = <BN: 0>

