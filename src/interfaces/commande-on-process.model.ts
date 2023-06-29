import { SimpleCommande } from "./simple-commande.model";

export interface CommandOnProcess {
  accessMethod: "itself" | "service";
  numberOfPerson: number;
  tips: number;
  totalPrice: number;
  reduction: any[];
  openingTime: string;
  sendNoteEmail: string;
  sendNoteWithDetail: boolean;
  allCommands: Array<SimpleCommande>;
  listMenuRunningIds: string[] ;
  listMenuRunningIdsWithStep: string ;
}
