
import { store, log, BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { Silo } from '../generated/schema';
import { SiloCreated, SiloRemoved, SiloFactory } from '../generated/SiloFactory/SiloFactory';

/*
type Silo @entity {
  id: ID!
  name: String! 
  address: String! 
  marketSize: BigDecimal!
  totalBorrowed: BigDecimal!
  depositApy: BigDecimal!
  borrowApy: BigDecimal!
  ---
  oracle: String!
  borrowed: BigDecimal!
  available: BigDecimal!
}
*/


export function handleSiloCreated(event: SiloCreated): void {
  log.info('New Silo Market created event, name: {}', [event.params.name.toString()])
  let silo = new Silo(event.params.silo.toHex());
  silo.name = event.params.name;
  silo.address = event.params.silo.toHexString();
  const defaultBigDec = new BigDecimal(new BigInt(0));
  silo.marketSize = defaultBigDec;
  silo.totalBorrowed = defaultBigDec;
  silo.depositApy = defaultBigDec;
  silo.borrowApy = defaultBigDec;
  silo.save();
}

export function handleSiloRemoved(event: SiloRemoved): void {
  let silo = Silo.load(event.params.silo.toHex());

  if (silo != null){
    store.remove('Silo', silo.id);
  }
} 
