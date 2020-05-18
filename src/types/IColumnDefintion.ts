import { IAuctionDetails } from './IAuctionDetails';
import { Maybe } from "../datastruct/maybe";

export interface IColumnDefintion {
    id: string;
    name: keyof IAuctionDetails;
    index: Maybe<number>;
}
