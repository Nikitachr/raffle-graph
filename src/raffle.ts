import { GameEnded } from "../generated/Raffle/Raffle"
import { UserHistory } from '../generated/schema';

export function handleGameEnded(event: GameEnded): void {
  const entity = new UserHistory(event.transaction.hash.toString() + event.transactionLogIndex.toString())
  entity.player = event.params.winner;
  entity.amount = event.params.amount;
  entity.save();
}
