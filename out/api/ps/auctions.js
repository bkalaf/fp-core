"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.columnMapping = exports.TABLE_START = exports.CITY_VALUE = exports.STATE_VALUE = exports.SUBMIT_BUTTON = exports.CITY_DDL = exports.STATE_DDL = exports.AUCTION_URL = void 0;
var compose_1 = require("../../fp/compose");
var identity_1 = require("../../fp/identity");
exports.AUCTION_URL = 'https://www.publicstorageauctions.com/';
exports.STATE_DDL = 'ddlState';
exports.CITY_DDL = 'ddlCity';
exports.SUBMIT_BUTTON = 'btnSubmit';
exports.STATE_VALUE = 'CA';
exports.CITY_VALUE = 'San Diego';
exports.TABLE_START = "dgAuctionDetails_ctl";
function asColumnDef(browser, suffix, index, converter) {
    if (index === void 0) { index = 0; }
    if (converter === void 0) { converter = identity_1.identity; }
    return { suffix: suffix, index: index, browser: browser, converter: converter };
}
var newDate = function (x) { return new Date(x); };
exports.columnMapping = function (b) { return ({
    customerName: asColumnDef(b, '_Label1'),
    auctionDate: asColumnDef(b, '_Label3', 0, compose_1.composeL(newDate, Date.parse)),
    propertyName: asColumnDef(b, '_Label4'),
    propertyAddress: asColumnDef(b, '_Label5'),
    propertyState: asColumnDef(b, '_Label6'),
    propertyZip: asColumnDef(b, '_Label7'),
    propertyPhone: asColumnDef(b, '_Label9'),
    contents: asColumnDef(b, '_Label7', 1)
}); };
//# sourceMappingURL=auctions.js.map