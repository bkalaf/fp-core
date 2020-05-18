import { IAuctionDetails } from 'src/auto/IAuctionDetails';
import { PromiseOp } from './../../datastruct/promise';
import { curry } from './../../fp/curry';
import { flip } from './../../fp/flip';
import { invertObj } from '../../object/invertObj';
import { processPage } from './../../auto/table';
import { remote } from 'webdriverio';

export type KeyedType<V> = { [P in keyof typeof counties]: V };

export const counties = {
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
}

const soCal = [ 'LA', 'VE', 'SR', 'SD', 'SB', 'RV', 'OC']

export const cities = {
    Alameda: counties.AC,
    Alhambra: counties.LA,
    ['Aliso Viejo']: counties.OC, 
    Anaheim: counties.OC, 
    Antioch: counties.CC,
    Arcadia: counties.LA,
    Arleta: counties.LA, 
    Artesia: counties.LA,
    Azusa: counties.LA,
    ['Baldwin Park']: counties.LA, 
    Belmont: counties.SM, 
    Berkeley: counties.AC,
    Bloomington: counties.SB, 
    Brea: counties.OC, 
    Burbank: counties.LA,
    Burlingame: counties.SM,
    Calabasas: counties.LA,
    Campbell: counties.SC,
    ['Canoga Park']: counties.LA,
    Carlsbad: counties.SD,
    Carmichael: counties.SA, 
    Carson: counties.LA,
    ['Castro Valley']: counties.AC,
    ['Chula Vista']: counties.SD,
    Chatsworth: counties.LA,
    ['Citrus Heights']: counties.SA,
    ['City of Industry']: counties.LA,
    Concord: counties.CC,
    Corona: counties.RV,
    ['Costa Mesa']: counties.OC,
    Colton: counties.SB, 
    ['Culver City']: counties.LA,
    ['Daly City']: counties.SM,
    Cupertino: counties.SC,
    ['Del Rey Oakes']: counties.MN,
    ['Diamond Bar']: counties.LA,
    Downey: counties.LA,
    Duarte: counties.LA,
    Dublin: counties.AC,
    ['East Palo Alto']: counties.SM,
    ['El Cajon']: counties.SD,
    ['El Segundo']: counties.LA,
    Emeryville: counties.AC,
    Fontana: counties.SB,
    Fairfield: counties.SO,
    ['Foster City']: counties.SM,
    ['Fountain Valley']: counties.OC,
    Fresno: counties.FR,
    Fremont: counties.AC,
    Fullerton: counties.OC,
    Gardena: counties.LA,
    Glendale: counties.LA,
    Goleta: counties.SR,
    ['Granada Hills']: counties.LA,
    Hawthorne: counties.LA,
    Hayward: counties.AC,
    ['Huntington Beach']: counties.OC,
    ['Huntington Park']: counties.LA,
    Irvine: counties.OC,
    Inglewood: counties.LA,
    Irwindale: counties.LA,
    ['Harbor City']: counties.LA,
    ['La Habra']: counties.OC,
    ['La Mirada']: counties.LA,
    ['La Puente']: counties.LA,
    ['La Verne']: counties.LA,
    ['Laguna Hills']: counties.OC,
    ['Laguna Niguel']: counties.OC,
    ['Laguna Woods']: counties.OC, 
    ['Lake Forest']: counties.OC,
    Lennox: counties.LA,
    Livermore: counties.AC,
    ['Long Beach']: counties.LA,
    ['Los Alamitos']: counties.LA, 
    ['Los Angeles']: counties.LA,
    ['Los Gatos']: counties.SC,
    Martinez: counties.CC, 
    ['Mill Valley']: counties.MA,
    Milipitas: counties.CC,
    Monrovia: counties.LA,  
    Modesto: counties.LA,   
    Montclair: counties.SB,
    Montebello: counties.LA,
    ['Monterey Park']: counties.LA,
    Moorpark: counties.LA,
    ['Mountain View']: counties.SC,
    Murrieta: counties.RV,
    Napa: counties.NP,
    Newark: counties.AC,
    Norco: counties.RV,
    ['North Highlands']: counties.SA,
    ['North Hollywood']: counties.LA,
    Northridge: counties.LA,
    Novato: counties.MA,
    Oakland: counties.AC,
    Oakley: counties.CC,
    Ontario: counties.SB,
    Orange: counties.OC,
    Oxnard: counties.VE,
    Pacheco: counties.CC,
    Pacoima: counties.LA,
    ['Palm Desert']: counties.RV,
    ['Palm Springs']: counties.RV,
    Palmdale: counties.LA,
    ['Panorama City']: counties.LA,
    Pasadena: counties.LA,
    Petaluma: counties.SN,
    ['Pico Rivera']: counties.LA,
    Pinole: counties.CC,
    Pittsburg: counties.CC,
    ['Pleasant Hill']: counties.CC,
    Pleasanton: counties.AC,
    Pomona: counties.LA,
    ['Rancho Cordova']: counties.SA,
    ['Rancho Mirage']: counties.RV,
    ['Rancho Cucamonga']: counties.SB,
    Redlands: counties.SB,
    ['Redwood City']: counties.SM,
    Richmond: counties.CC,
    Riverside: counties.RV,
    ['Rowland Heights']: counties.LA,
    Sacramento: counties.SA,
    ['San Carlos']: counties.SM,
    ['San Diego']: counties.SD,
    ['San Dimas']: counties.LA,
    ['San Francisco']: counties.AC,
    ['San Gabriel']: counties.LA,
    ['San Jose']: counties.SC,
    ['San Juan Capistrano']: counties.OC,   
    ['San Leandro']: counties.AC,
    ['San Lorenzo']: counties.AC,
    ['San Mateo']: counties.SM,
    ['San Pablo']: counties.CC,
    ['San Rafael']: counties.MA,
    ['San Ramon']: counties.CC,
    ['Sand City']: counties.MN,
    ['Santa Ana']: counties.OC,
    ['Santa Barbara']: counties.SR,
    ['Santa Clara']: counties.SC,
    ['Santa Clarita']: counties.LA,
    ['Santa Cruz']: counties.SZ,
    ['Santa Monica']: counties.LA,
    ['Santa Rosa']: counties.SN,
    Saugus: counties.LA,
    ['Sherman Oaks']: counties.LA,
    ['Simi Valley']: counties.LA,
    ['Solana Beach']: counties.SD,
    ['South Gate']: counties.LA,
    ['South San Francisco']: counties.SM,
    ['Spring Valley']: counties.SD,
    Stanton: counties.OC,
    Stockton: counties.SJ,
    ['Studio City']: counties.LA,
    ['Sun Valley']: counties.LA,    
    Sunland: counties.LA,
    Sunnyvale: counties.SC,
    Sylmar: counties.LA,
    Tarzana: counties.LA,
    Torrance: counties.LA,
    Tracy: counties.SJ,
    Tujunga: counties.LA,      
    Tustin: counties.LA,
    ['Union City']: counties.AC,
    Upland: counties.SB,
    Valencia: counties.LA,
    Vallejo: counties.SO,
    ['Van Nuys']: counties.LA,
    Venice: counties.LA, 
    Ventura: counties.VE,
    ['Walnut Creek']: counties.CC,
    ['West Covina']: counties.LA,
    ['West Hollywood']: counties.LA,
    ['West Sacramento']: counties.SA,
    ['Westlake Village']: counties.LA,
    Whittier: counties.LA,
    Westminster: counties.LA,
    Wilmington: counties.LA,
    ['Woodland Hills']: counties.LA
}

export const groupByCounty = invertObj(cities);

export function arrayConcat<T>(left: T[], right: T[]) {
    return [...left, ...right];
}
export function getValue<T>(obj: KeyedObject<T>) {
    return function(name: string) {
        return obj[name];
    }
}

const filteredCities = Object.keys(groupByCounty).filter(n => {
    const result = soCal.map(nme => (counties as KeyedObject<string>)[nme]).includes(n);
    return result;
})
    .map(getValue(groupByCounty))
.reduce((pv, cv) => arrayConcat(pv, cv), [])

console.log(filteredCities);


const b = () => (remote({
	capabilities: {
		browserName: 'chrome'
	}
}) as any) as Promise<WebdriverIO.BrowserObject>;
const pp = flip(curry(processPage));

const pp2 = (s: string) => PromiseOp.chain(pp(s))(b())
const reducer = async (pv: Promise<IAuctionDetails[]>, cv: Promise<IAuctionDetails[]>) => {
    const p = await pv;
    const c = await cv;
    return [...p, ...c];
};
// filteredCities.map(pp2).reduce(reducer);
// [ 'San Diego' ].map(pp2).reduce(reducer);