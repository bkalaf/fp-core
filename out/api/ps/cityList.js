"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValue = exports.arrayConcat = exports.groupByCounty = exports.cities = exports.counties = void 0;
var promise_1 = require("./../../datastruct/promise");
var curry_1 = require("./../../fp/curry");
var flip_1 = require("./../../fp/flip");
var invertObj_1 = require("../../object/invertObj");
var table_1 = require("./../../auto/table");
var webdriverio_1 = require("webdriverio");
exports.counties = {
    AC: 'ALAMEDA COUNTY',
    CC: 'CONTRA COSTA COUNTY',
    FR: 'FRESNO COUNTY',
    LA: 'LOS ANGELES COUNTY',
    MA: 'MARIN COUNTY',
    MN: 'MONTEREY COUNTY',
    NP: 'NAPA COUNTY',
    OC: 'ORANGE COUNTY',
    RV: 'RIVERSIDE COUNTY',
    SA: 'SACRAMENTO COUNTY',
    SB: 'SAN BERNARDINO COUNTY',
    SC: 'SANTA CLARA COUNTY',
    SD: 'SAN DIEGO COUNTY',
    SJ: 'SAN JOAQUIN COUNTY',
    SM: 'SAN MATEO COUNTY',
    SO: 'SOLANO COUNTY',
    SN: 'SONOMA COUNTY',
    SR: 'SANTA BARBARA COUNTY',
    SZ: 'SANTA CRUZ COUNTY',
    VE: 'VENTURA COUNTY'
};
var soCal = ['LA', 'VE', 'SR', 'SD', 'SB', 'RV', 'OC'];
exports.cities = (_a = {
        Alameda: exports.counties.AC,
        Alhambra: exports.counties.LA
    },
    _a['Aliso Viejo'] = exports.counties.OC,
    _a.Anaheim = exports.counties.OC,
    _a.Antioch = exports.counties.CC,
    _a.Arcadia = exports.counties.LA,
    _a.Arleta = exports.counties.LA,
    _a.Artesia = exports.counties.LA,
    _a.Azusa = exports.counties.LA,
    _a['Baldwin Park'] = exports.counties.LA,
    _a.Belmont = exports.counties.SM,
    _a.Berkeley = exports.counties.AC,
    _a.Bloomington = exports.counties.SB,
    _a.Brea = exports.counties.OC,
    _a.Burbank = exports.counties.LA,
    _a.Burlingame = exports.counties.SM,
    _a.Calabasas = exports.counties.LA,
    _a.Campbell = exports.counties.SC,
    _a['Canoga Park'] = exports.counties.LA,
    _a.Carlsbad = exports.counties.SD,
    _a.Carmichael = exports.counties.SA,
    _a.Carson = exports.counties.LA,
    _a['Castro Valley'] = exports.counties.AC,
    _a['Chula Vista'] = exports.counties.SD,
    _a.Chatsworth = exports.counties.LA,
    _a['Citrus Heights'] = exports.counties.SA,
    _a['City of Industry'] = exports.counties.LA,
    _a.Concord = exports.counties.CC,
    _a.Corona = exports.counties.RV,
    _a['Costa Mesa'] = exports.counties.OC,
    _a.Colton = exports.counties.SB,
    _a['Culver City'] = exports.counties.LA,
    _a['Daly City'] = exports.counties.SM,
    _a.Cupertino = exports.counties.SC,
    _a['Del Rey Oakes'] = exports.counties.MN,
    _a['Diamond Bar'] = exports.counties.LA,
    _a.Downey = exports.counties.LA,
    _a.Duarte = exports.counties.LA,
    _a.Dublin = exports.counties.AC,
    _a['East Palo Alto'] = exports.counties.SM,
    _a['El Cajon'] = exports.counties.SD,
    _a['El Segundo'] = exports.counties.LA,
    _a.Emeryville = exports.counties.AC,
    _a.Fontana = exports.counties.SB,
    _a.Fairfield = exports.counties.SO,
    _a['Foster City'] = exports.counties.SM,
    _a['Fountain Valley'] = exports.counties.OC,
    _a.Fresno = exports.counties.FR,
    _a.Fremont = exports.counties.AC,
    _a.Fullerton = exports.counties.OC,
    _a.Gardena = exports.counties.LA,
    _a.Glendale = exports.counties.LA,
    _a.Goleta = exports.counties.SR,
    _a['Granada Hills'] = exports.counties.LA,
    _a.Hawthorne = exports.counties.LA,
    _a.Hayward = exports.counties.AC,
    _a['Huntington Beach'] = exports.counties.OC,
    _a['Huntington Park'] = exports.counties.LA,
    _a.Irvine = exports.counties.OC,
    _a.Inglewood = exports.counties.LA,
    _a.Irwindale = exports.counties.LA,
    _a['Harbor City'] = exports.counties.LA,
    _a['La Habra'] = exports.counties.OC,
    _a['La Mirada'] = exports.counties.LA,
    _a['La Puente'] = exports.counties.LA,
    _a['La Verne'] = exports.counties.LA,
    _a['Laguna Hills'] = exports.counties.OC,
    _a['Laguna Niguel'] = exports.counties.OC,
    _a['Laguna Woods'] = exports.counties.OC,
    _a['Lake Forest'] = exports.counties.OC,
    _a.Lennox = exports.counties.LA,
    _a.Livermore = exports.counties.AC,
    _a['Long Beach'] = exports.counties.LA,
    _a['Los Alamitos'] = exports.counties.LA,
    _a['Los Angeles'] = exports.counties.LA,
    _a['Los Gatos'] = exports.counties.SC,
    _a.Martinez = exports.counties.CC,
    _a['Mill Valley'] = exports.counties.MA,
    _a.Milipitas = exports.counties.CC,
    _a.Monrovia = exports.counties.LA,
    _a.Modesto = exports.counties.LA,
    _a.Montclair = exports.counties.SB,
    _a.Montebello = exports.counties.LA,
    _a['Monterey Park'] = exports.counties.LA,
    _a.Moorpark = exports.counties.LA,
    _a['Mountain View'] = exports.counties.SC,
    _a.Murrieta = exports.counties.RV,
    _a.Napa = exports.counties.NP,
    _a.Newark = exports.counties.AC,
    _a.Norco = exports.counties.RV,
    _a['North Highlands'] = exports.counties.SA,
    _a['North Hollywood'] = exports.counties.LA,
    _a.Northridge = exports.counties.LA,
    _a.Novato = exports.counties.MA,
    _a.Oakland = exports.counties.AC,
    _a.Oakley = exports.counties.CC,
    _a.Ontario = exports.counties.SB,
    _a.Orange = exports.counties.OC,
    _a.Oxnard = exports.counties.VE,
    _a.Pacheco = exports.counties.CC,
    _a.Pacoima = exports.counties.LA,
    _a['Palm Desert'] = exports.counties.RV,
    _a['Palm Springs'] = exports.counties.RV,
    _a.Palmdale = exports.counties.LA,
    _a['Panorama City'] = exports.counties.LA,
    _a.Pasadena = exports.counties.LA,
    _a.Petaluma = exports.counties.SN,
    _a['Pico Rivera'] = exports.counties.LA,
    _a.Pinole = exports.counties.CC,
    _a.Pittsburg = exports.counties.CC,
    _a['Pleasant Hill'] = exports.counties.CC,
    _a.Pleasanton = exports.counties.AC,
    _a.Pomona = exports.counties.LA,
    _a['Rancho Cordova'] = exports.counties.SA,
    _a['Rancho Mirage'] = exports.counties.RV,
    _a['Rancho Cucamonga'] = exports.counties.SB,
    _a.Redlands = exports.counties.SB,
    _a['Redwood City'] = exports.counties.SM,
    _a.Richmond = exports.counties.CC,
    _a.Riverside = exports.counties.RV,
    _a['Rowland Heights'] = exports.counties.LA,
    _a.Sacramento = exports.counties.SA,
    _a['San Carlos'] = exports.counties.SM,
    _a['San Diego'] = exports.counties.SD,
    _a['San Dimas'] = exports.counties.LA,
    _a['San Francisco'] = exports.counties.AC,
    _a['San Gabriel'] = exports.counties.LA,
    _a['San Jose'] = exports.counties.SC,
    _a['San Juan Capistrano'] = exports.counties.OC,
    _a['San Leandro'] = exports.counties.AC,
    _a['San Lorenzo'] = exports.counties.AC,
    _a['San Mateo'] = exports.counties.SM,
    _a['San Pablo'] = exports.counties.CC,
    _a['San Rafael'] = exports.counties.MA,
    _a['San Ramon'] = exports.counties.CC,
    _a['Sand City'] = exports.counties.MN,
    _a['Santa Ana'] = exports.counties.OC,
    _a['Santa Barbara'] = exports.counties.SR,
    _a['Santa Clara'] = exports.counties.SC,
    _a['Santa Clarita'] = exports.counties.LA,
    _a['Santa Cruz'] = exports.counties.SZ,
    _a['Santa Monica'] = exports.counties.LA,
    _a['Santa Rosa'] = exports.counties.SN,
    _a.Saugus = exports.counties.LA,
    _a['Sherman Oaks'] = exports.counties.LA,
    _a['Simi Valley'] = exports.counties.LA,
    _a['Solana Beach'] = exports.counties.SD,
    _a['South Gate'] = exports.counties.LA,
    _a['South San Francisco'] = exports.counties.SM,
    _a['Spring Valley'] = exports.counties.SD,
    _a.Stanton = exports.counties.OC,
    _a.Stockton = exports.counties.SJ,
    _a['Studio City'] = exports.counties.LA,
    _a['Sun Valley'] = exports.counties.LA,
    _a.Sunland = exports.counties.LA,
    _a.Sunnyvale = exports.counties.SC,
    _a.Sylmar = exports.counties.LA,
    _a.Tarzana = exports.counties.LA,
    _a.Torrance = exports.counties.LA,
    _a.Tracy = exports.counties.SJ,
    _a.Tujunga = exports.counties.LA,
    _a.Tustin = exports.counties.LA,
    _a['Union City'] = exports.counties.AC,
    _a.Upland = exports.counties.SB,
    _a.Valencia = exports.counties.LA,
    _a.Vallejo = exports.counties.SO,
    _a['Van Nuys'] = exports.counties.LA,
    _a.Venice = exports.counties.LA,
    _a.Ventura = exports.counties.VE,
    _a['Walnut Creek'] = exports.counties.CC,
    _a['West Covina'] = exports.counties.LA,
    _a['West Hollywood'] = exports.counties.LA,
    _a['West Sacramento'] = exports.counties.SA,
    _a['Westlake Village'] = exports.counties.LA,
    _a.Whittier = exports.counties.LA,
    _a.Westminster = exports.counties.LA,
    _a.Wilmington = exports.counties.LA,
    _a['Woodland Hills'] = exports.counties.LA,
    _a);
exports.groupByCounty = invertObj_1.invertObj(exports.cities);
function arrayConcat(left, right) {
    return __spreadArrays(left, right);
}
exports.arrayConcat = arrayConcat;
function getValue(obj) {
    return function (name) {
        return obj[name];
    };
}
exports.getValue = getValue;
var filteredCities = Object.keys(exports.groupByCounty).filter(function (n) {
    var result = soCal.map(function (nme) { return exports.counties[nme]; }).includes(n);
    return result;
})
    .map(getValue(exports.groupByCounty))
    .reduce(function (pv, cv) { return arrayConcat(pv, cv); }, []);
console.log(filteredCities);
var b = function () { return webdriverio_1.remote({
    capabilities: {
        browserName: 'chrome'
    }
}); };
var pp = flip_1.flip(curry_1.curry(table_1.processPage));
var pp2 = function (s) { return promise_1.PromiseOp.chain(pp(s))(b()); };
var reducer = function (pv, cv) { return __awaiter(void 0, void 0, void 0, function () {
    var p, c;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, pv];
            case 1:
                p = _a.sent();
                return [4 /*yield*/, cv];
            case 2:
                c = _a.sent();
                return [2 /*return*/, __spreadArrays(p, c)];
        }
    });
}); };
// filteredCities.map(pp2).reduce(reducer);
// [ 'San Diego' ].map(pp2).reduce(reducer);
//# sourceMappingURL=cityList.js.map