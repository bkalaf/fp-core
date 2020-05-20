"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xformDetails = exports.parseInfo = exports.parsePropertyName = exports.parseCustomerName = exports.parseContents = exports.parseChain = exports.tupleMap = exports.columnMapping = exports.SUCCESSFUL_INDICATOR = exports.UNSUCCESSFUL_INDICATOR = exports.TABLE_START = exports.CITY_VALUE = exports.STATE_VALUE = exports.SUBMIT_BUTTON = exports.CITY_DDL = exports.STATE_DDL = exports.AUCTION_URL = void 0;
var compose_1 = require("../../fp/compose");
var identity_1 = require("../../fp/identity");
var objMerge_1 = require("../../auto/objMerge");
var append_1 = require("../../text/append");
var text_1 = require("../../text");
exports.AUCTION_URL = 'https://www.publicstorageauctions.com/';
exports.STATE_DDL = 'ddlState';
exports.CITY_DDL = 'ddlCity';
exports.SUBMIT_BUTTON = 'btnSubmit';
exports.STATE_VALUE = 'CA';
exports.CITY_VALUE = 'San Diego';
exports.TABLE_START = "dgAuctionDetails_ctl";
exports.UNSUCCESSFUL_INDICATOR = 'searchmessage';
exports.SUCCESSFUL_INDICATOR = [exports.TABLE_START, "02", "_Label1"].join("");
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
function tupleMap(_a, _b) {
    var f = _a[0], g = _a[1];
    var x = _b[0], y = _b[1];
    return [f(x), g(y)];
}
exports.tupleMap = tupleMap;
function parseChain(preprocess, splitter, postprocess) {
    return compose_1.composeL(function (x) { return x.map(postprocess); }, compose_1.composeL(splitter, preprocess));
}
exports.parseChain = parseChain;
function parseContents(auctionDetails, key) {
    var preprocess = append_1.remove('\n');
    var splitter = text_1.splitAt(',');
    var postprocess = append_1.remove(' ');
    return parseChain(preprocess, splitter, postprocess)(auctionDetails[key]);
}
exports.parseContents = parseContents;
function parseCustomerName(auctionDetails, key) {
    var _a = parseChain(identity_1.identity, text_1.splitAt(' - '), append_1.remove('Unit #'))(auctionDetails[key]), renterName = _a[0], unitNumber = _a[1];
    return { renterName: renterName, unitNumber: unitNumber };
}
exports.parseCustomerName = parseCustomerName;
function parsePropertyName(auctionDetails, key) {
    var converters = [function (x) { return Number.parseInt(x); }, identity_1.identity];
    var strings = text_1.splitAt(" - ")(auctionDetails[key]);
    var _a = tupleMap(converters, strings), facilityNumber = _a[0], facilityLongName = _a[1];
    return { facilityLongName: facilityLongName, facilityNumber: facilityNumber };
}
exports.parsePropertyName = parsePropertyName;
function parseInfo(input, name, func) {
    var _a;
    return _a = {}, _a[name] = func(input, name), _a;
}
exports.parseInfo = parseInfo;
function xformDetails(details, cityName) {
    var parsed = [parseInfo(details, 'contents', parseContents),
        parseInfo(details, 'customerName', parseCustomerName),
        parseInfo(details, 'propertyName', parsePropertyName),
        { auctionDate: {
                iso: Date.parse(details.auctionDate),
                date: new Date(Date.parse(details.auctionDate)).toDateString(),
                time: new Date(Date.parse(details.auctionDate)).toTimeString()
            } },
        { propertyCity: cityName }];
    return parsed.reduce(objMerge_1.objMerge, details);
}
exports.xformDetails = xformDetails;
//# sourceMappingURL=auctions.js.map