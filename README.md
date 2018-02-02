# wallet.wizard
Code-breaker, Crown-maker, Eth-taker don't you mess around with we

So it goes like: 
* User makes request to buy Crown
* Browser logs Crown buy request details to Firebase RTD 
* Firebase HTTP listener passes Crown buy request # as encrypted argument to OPAC function
* OPAC function securely calls Oraclize to get Crown buy request # URL data
* Oraclize publishes private JSON result from Firebase HTTP to callback on OPAC and stores on Ethereum as verifiable web transaction (aka truth-at-the-time)
* OPAC validates internal logic and writes received data as events
* Firebase HTTP listeners copy received data from events into RTD
* Browser automatically updates data from RTD
* User gets confirmation of transaction
