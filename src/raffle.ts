import { BigInt } from "@graphprotocol/graph-ts"
import {
  Raffle,
  GameCalculating,
  GameEnded,
  GameStarted,
  OwnershipTransferred,
  PlayerAddedBalance,
  PlayerJoined
} from "../generated/Raffle/Raffle"
import { ExampleEntity } from "../generated/schema"

export function handleGameCalculating(event: GameCalculating): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.checkUpkeep(...)
  // - contract.getContractBalance(...)
  // - contract.getDepositedBalance(...)
  // - contract.getEntryFee(...)
  // - contract.getLastTimeStamp(...)
  // - contract.getLastWinner(...)
  // - contract.getRaffleState(...)
  // - contract.getTotalBalance(...)
  // - contract.getTotalPlayers(...)
  // - contract.owner(...)
}

export function handleGameEnded(event: GameEnded): void {}

export function handleGameStarted(event: GameStarted): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handlePlayerAddedBalance(event: PlayerAddedBalance): void {}

export function handlePlayerJoined(event: PlayerJoined): void {}
