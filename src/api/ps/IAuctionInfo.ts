import { IAuctionDate, IPropertyDetails, IRenterDetails } from './auctions';

import { IAuctionDetails } from './../../types/IAuctionDetails';

export interface IAuctionInfo extends Omit<IAuctionDetails, 'auctionDate' | 'contents' | 'customerName' | 'propertyName'> {
    auctionDate: IAuctionDate;
    contents: string[];
    customerName: IRenterDetails;
    propertyName: IPropertyDetails;
    propertyCity: string;
}
