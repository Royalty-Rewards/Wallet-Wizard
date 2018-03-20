# Wallet Wizard
 A managed Ethereum account service hosted on the Google Firebase platform. Not a wallet.

So it goes like: 
* User signs in with Google account
* Firebase creates new Ethereum accounts for User
* Firebase shares public 0x address for User, but saves private keys privately.
* User sends Ether deposit to 0x address
* Ethereum blockchain validates transaction
* Firebase receives transaction receipt from 0x address *todo*
* Firebase shares receipt with User, and updates account with amount *test*

