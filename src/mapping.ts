
import { store, log, BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { Silo } from '../generated/schema';
import { NewSilo } from '../generated/SiloFactory/SiloFactory';

/*
  id: ID!
  name: String! 
  address: String! 
  symbol: String!
  assetAddress: String!
  bridgeAssetName: String!
  bridgeAssetAddr: String!
  marketSize: BigDecimal!
  totalBorrowed: BigDecimal!
  depositApy: BigDecimal!
  borrowApy: BigDecimal!
  oracle: String!
  borrowed: BigDecimal!
  available: BigDecimal!
*/

// event NewSilo(address indexed silo, address indexed asset, string name, string symbol);

export function handleSiloCreated(event: NewSilo): void {
  log.info('New Silo Market created event, name: {}', [event.params.name.toString()])
  let silo = new Silo(event.params.silo.toHex());
  silo.name = event.params.name;
  silo.address = event.params.silo.toHexString();
  silo.symbol = event.params.symbol;
  silo.assetAddress = event.params.asset.toHexString();
  silo.bridgeAssetName = 'ETH';
  silo.bridgeAssetAddr = '0x00E55830966aeCA7579f99e97e58Bb8b5150B034';  //KovanETH
  const defaultBigDec = new BigDecimal(new BigInt(0));
  silo.marketSize = defaultBigDec;
  silo.totalBorrowed = defaultBigDec;
  silo.depositApy = defaultBigDec;
  silo.borrowApy = defaultBigDec;
  silo.borrowed = defaultBigDec;
  silo.available = defaultBigDec;
  silo.save();
}

// export function handleSiloRemoved(event: SiloRemoved): void {
//   let silo = Silo.load(event.params.silo.toHex());

//   if (silo != null){
//     store.remove('Silo', silo.id);
//   }
// } 
