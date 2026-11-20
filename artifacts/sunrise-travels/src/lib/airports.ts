export interface Airport {
  /** IATA code, e.g. LHR */
  code: string;
  /** City / metro area the airport serves */
  city: string;
  /** Full airport name */
  name: string;
  country: string;
}

/**
 * Airports offered in the flight search.
 *
 * Excluded on the agency's instruction, for every city in these places — do not
 * add their airports back:
 *   Iran, Iraq, Syria, Sudan, South Sudan, Cuba, Libya, North Korea, Venezuela,
 *   Crimea, Myanmar, Russia, Belarus, Kazakhstan, and the Donetsk, Luhansk,
 *   Kherson and Zaporizhzhia regions of Ukraine.
 *
 * Also excluded because the UK Air Safety List bans all of their airlines from
 * operating to, from or within the UK: Afghanistan, Armenia, Congo (Brazzaville),
 * DR Congo, Djibouti, Equatorial Guinea, Eritrea, Kyrgyzstan, Liberia, Nepal,
 * São Tomé and Príncipe, Sierra Leone.
 * Source: https://www.gov.uk/guidance/uk-air-safety-list (checked 20 Nov 2025).
 */
export const AIRPORTS: Airport[] = [
  // United Kingdom & Ireland
  { code: "LHR", city: "London", name: "Heathrow Airport", country: "United Kingdom" },
  { code: "LGW", city: "London", name: "Gatwick Airport", country: "United Kingdom" },
  { code: "STN", city: "London", name: "Stansted Airport", country: "United Kingdom" },
  { code: "LTN", city: "London", name: "Luton Airport", country: "United Kingdom" },
  { code: "LCY", city: "London", name: "City Airport", country: "United Kingdom" },
  { code: "SEN", city: "London", name: "Southend Airport", country: "United Kingdom" },
  { code: "MAN", city: "Manchester", name: "Manchester Airport", country: "United Kingdom" },
  { code: "BHX", city: "Birmingham", name: "Birmingham Airport", country: "United Kingdom" },
  { code: "NCL", city: "Newcastle", name: "Newcastle International Airport", country: "United Kingdom" },
  { code: "EDI", city: "Edinburgh", name: "Edinburgh Airport", country: "United Kingdom" },
  { code: "GLA", city: "Glasgow", name: "Glasgow Airport", country: "United Kingdom" },
  { code: "BRS", city: "Bristol", name: "Bristol Airport", country: "United Kingdom" },
  { code: "LPL", city: "Liverpool", name: "John Lennon Airport", country: "United Kingdom" },
  { code: "LBA", city: "Leeds", name: "Bradford Airport", country: "United Kingdom" },
  { code: "EMA", city: "East Midlands", name: "East Midlands Airport", country: "United Kingdom" },
  { code: "CWL", city: "Cardiff", name: "Cardiff Airport", country: "United Kingdom" },
  { code: "BFS", city: "Belfast", name: "Belfast International Airport", country: "United Kingdom" },
  { code: "BHD", city: "Belfast", name: "George Best City Airport", country: "United Kingdom" },
  { code: "DUB", city: "Dublin", name: "Dublin Airport", country: "Ireland" },
  { code: "SNN", city: "Shannon", name: "Shannon Airport", country: "Ireland" },
  { code: "ORK", city: "Cork", name: "Cork Airport", country: "Ireland" },

  // Pakistan
  { code: "ISB", city: "Islamabad", name: "Islamabad International Airport", country: "Pakistan" },
  { code: "LHE", city: "Lahore", name: "Allama Iqbal International Airport", country: "Pakistan" },
  { code: "KHI", city: "Karachi", name: "Jinnah International Airport", country: "Pakistan" },
  { code: "PEW", city: "Peshawar", name: "Bacha Khan International Airport", country: "Pakistan" },
  { code: "SKT", city: "Sialkot", name: "Sialkot International Airport", country: "Pakistan" },
  { code: "MUX", city: "Multan", name: "Multan International Airport", country: "Pakistan" },
  { code: "FSD", city: "Faisalabad", name: "Faisalabad International Airport", country: "Pakistan" },
  { code: "UET", city: "Quetta", name: "Quetta International Airport", country: "Pakistan" },

  // India
  { code: "DEL", city: "Delhi", name: "Indira Gandhi International Airport", country: "India" },
  { code: "BOM", city: "Mumbai", name: "Chhatrapati Shivaji Maharaj International Airport", country: "India" },
  { code: "BLR", city: "Bengaluru", name: "Kempegowda International Airport", country: "India" },
  { code: "MAA", city: "Chennai", name: "Chennai International Airport", country: "India" },
  { code: "HYD", city: "Hyderabad", name: "Rajiv Gandhi International Airport", country: "India" },
  { code: "CCU", city: "Kolkata", name: "Netaji Subhas Chandra Bose International Airport", country: "India" },
  { code: "COK", city: "Kochi", name: "Cochin International Airport", country: "India" },
  { code: "AMD", city: "Ahmedabad", name: "Sardar Vallabhbhai Patel International Airport", country: "India" },
  { code: "TRV", city: "Thiruvananthapuram", name: "Trivandrum International Airport", country: "India" },
  { code: "ATQ", city: "Amritsar", name: "Sri Guru Ram Dass Jee International Airport", country: "India" },
  { code: "LKO", city: "Lucknow", name: "Chaudhary Charan Singh International Airport", country: "India" },
  { code: "JAI", city: "Jaipur", name: "Jaipur International Airport", country: "India" },
  { code: "GOI", city: "Goa", name: "Dabolim Airport", country: "India" },
  { code: "PNQ", city: "Pune", name: "Pune Airport", country: "India" },
  { code: "IXC", city: "Chandigarh", name: "Chandigarh International Airport", country: "India" },

  // South Asia
  { code: "DAC", city: "Dhaka", name: "Hazrat Shahjalal International Airport", country: "Bangladesh" },
  { code: "CGP", city: "Chattogram", name: "Shah Amanat International Airport", country: "Bangladesh" },
  { code: "ZYL", city: "Sylhet", name: "Osmani International Airport", country: "Bangladesh" },
  { code: "CMB", city: "Colombo", name: "Bandaranaike International Airport", country: "Sri Lanka" },

  // Middle East
  { code: "DXB", city: "Dubai", name: "Dubai International Airport", country: "United Arab Emirates" },
  { code: "AUH", city: "Abu Dhabi", name: "Zayed International Airport", country: "United Arab Emirates" },
  { code: "SHJ", city: "Sharjah", name: "Sharjah International Airport", country: "United Arab Emirates" },
  { code: "DOH", city: "Doha", name: "Hamad International Airport", country: "Qatar" },
  { code: "JED", city: "Jeddah", name: "King Abdulaziz International Airport", country: "Saudi Arabia" },
  { code: "MED", city: "Medina", name: "Prince Mohammad bin Abdulaziz International Airport", country: "Saudi Arabia" },
  { code: "RUH", city: "Riyadh", name: "King Khalid International Airport", country: "Saudi Arabia" },
  { code: "DMM", city: "Dammam", name: "King Fahd International Airport", country: "Saudi Arabia" },
  { code: "KWI", city: "Kuwait City", name: "Kuwait International Airport", country: "Kuwait" },
  { code: "BAH", city: "Bahrain", name: "Bahrain International Airport", country: "Bahrain" },
  { code: "MCT", city: "Muscat", name: "Muscat International Airport", country: "Oman" },
  { code: "AMM", city: "Amman", name: "Queen Alia International Airport", country: "Jordan" },
  { code: "BEY", city: "Beirut", name: "Rafic Hariri International Airport", country: "Lebanon" },
  { code: "IST", city: "Istanbul", name: "Istanbul Airport", country: "Turkey" },
  { code: "SAW", city: "Istanbul", name: "Sabiha Gokcen Airport", country: "Turkey" },
  { code: "ADB", city: "Izmir", name: "Adnan Menderes Airport", country: "Turkey" },
  { code: "AYT", city: "Antalya", name: "Antalya Airport", country: "Turkey" },
  { code: "ESB", city: "Ankara", name: "Esenboga Airport", country: "Turkey" },
  { code: "TLV", city: "Tel Aviv", name: "Ben Gurion Airport", country: "Israel" },

  // Europe
  { code: "CDG", city: "Paris", name: "Charles de Gaulle Airport", country: "France" },
  { code: "ORY", city: "Paris", name: "Orly Airport", country: "France" },
  { code: "AMS", city: "Amsterdam", name: "Schiphol Airport", country: "Netherlands" },
  { code: "FRA", city: "Frankfurt", name: "Frankfurt Airport", country: "Germany" },
  { code: "MUC", city: "Munich", name: "Munich Airport", country: "Germany" },
  { code: "BER", city: "Berlin", name: "Brandenburg Airport", country: "Germany" },
  { code: "DUS", city: "Dusseldorf", name: "Dusseldorf Airport", country: "Germany" },
  { code: "HAM", city: "Hamburg", name: "Hamburg Airport", country: "Germany" },
  { code: "ZRH", city: "Zurich", name: "Zurich Airport", country: "Switzerland" },
  { code: "GVA", city: "Geneva", name: "Geneva Airport", country: "Switzerland" },
  { code: "VIE", city: "Vienna", name: "Vienna International Airport", country: "Austria" },
  { code: "BRU", city: "Brussels", name: "Brussels Airport", country: "Belgium" },
  { code: "MAD", city: "Madrid", name: "Adolfo Suarez Barajas Airport", country: "Spain" },
  { code: "BCN", city: "Barcelona", name: "El Prat Airport", country: "Spain" },
  { code: "LIS", city: "Lisbon", name: "Humberto Delgado Airport", country: "Portugal" },
  { code: "OPO", city: "Porto", name: "Francisco Sa Carneiro Airport", country: "Portugal" },
  { code: "FCO", city: "Rome", name: "Fiumicino Airport", country: "Italy" },
  { code: "MXP", city: "Milan", name: "Malpensa Airport", country: "Italy" },
  { code: "VCE", city: "Venice", name: "Marco Polo Airport", country: "Italy" },
  { code: "ATH", city: "Athens", name: "Eleftherios Venizelos Airport", country: "Greece" },
  { code: "CPH", city: "Copenhagen", name: "Copenhagen Airport", country: "Denmark" },
  { code: "ARN", city: "Stockholm", name: "Arlanda Airport", country: "Sweden" },
  { code: "OSL", city: "Oslo", name: "Gardermoen Airport", country: "Norway" },
  { code: "HEL", city: "Helsinki", name: "Helsinki Vantaa Airport", country: "Finland" },
  { code: "WAW", city: "Warsaw", name: "Chopin Airport", country: "Poland" },
  { code: "PRG", city: "Prague", name: "Vaclav Havel Airport", country: "Czech Republic" },
  { code: "BUD", city: "Budapest", name: "Ferenc Liszt International Airport", country: "Hungary" },
  { code: "KRK", city: "Krakow", name: "John Paul II International Airport", country: "Poland" },
  { code: "OTP", city: "Bucharest", name: "Henri Coanda International Airport", country: "Romania" },
  { code: "SOF", city: "Sofia", name: "Sofia Airport", country: "Bulgaria" },
  { code: "MLA", city: "Malta", name: "Malta International Airport", country: "Malta" },
  { code: "NCE", city: "Nice", name: "Cote d'Azur Airport", country: "France" },
  { code: "LYS", city: "Lyon", name: "Saint Exupery Airport", country: "France" },
  { code: "MRS", city: "Marseille", name: "Provence Airport", country: "France" },
  { code: "TFS", city: "Tenerife", name: "Tenerife South Airport", country: "Spain" },
  { code: "LPA", city: "Gran Canaria", name: "Gran Canaria Airport", country: "Spain" },
  { code: "ACE", city: "Lanzarote", name: "Lanzarote Airport", country: "Spain" },
  { code: "PMI", city: "Palma", name: "Palma de Mallorca Airport", country: "Spain" },
  { code: "AGP", city: "Malaga", name: "Malaga Airport", country: "Spain" },
  { code: "ALC", city: "Alicante", name: "Alicante Elche Airport", country: "Spain" },
  { code: "FAO", city: "Faro", name: "Faro Airport", country: "Portugal" },
  { code: "KEF", city: "Reykjavik", name: "Keflavik Airport", country: "Iceland" },

  // Africa
  { code: "CAI", city: "Cairo", name: "Cairo International Airport", country: "Egypt" },
  { code: "HRG", city: "Hurghada", name: "Hurghada International Airport", country: "Egypt" },
  { code: "SSH", city: "Sharm el-Sheikh", name: "Sharm el-Sheikh International Airport", country: "Egypt" },
  { code: "CMN", city: "Casablanca", name: "Mohammed V International Airport", country: "Morocco" },
  { code: "RAK", city: "Marrakesh", name: "Menara Airport", country: "Morocco" },
  { code: "TUN", city: "Tunis", name: "Carthage International Airport", country: "Tunisia" },
  { code: "ALG", city: "Algiers", name: "Houari Boumediene Airport", country: "Algeria" },
  { code: "ADD", city: "Addis Ababa", name: "Bole International Airport", country: "Ethiopia" },
  { code: "NBO", city: "Nairobi", name: "Jomo Kenyatta International Airport", country: "Kenya" },
  { code: "LOS", city: "Lagos", name: "Murtala Muhammed International Airport", country: "Nigeria" },
  { code: "ACC", city: "Accra", name: "Kotoka International Airport", country: "Ghana" },
  { code: "JNB", city: "Johannesburg", name: "O.R. Tambo International Airport", country: "South Africa" },
  { code: "CPT", city: "Cape Town", name: "Cape Town International Airport", country: "South Africa" },
  { code: "DUR", city: "Durban", name: "King Shaka International Airport", country: "South Africa" },
  { code: "MRU", city: "Mauritius", name: "Sir Seewoosagur Ramgoolam International Airport", country: "Mauritius" },
  { code: "SEZ", city: "Seychelles", name: "Seychelles International Airport", country: "Seychelles" },
  { code: "ZNZ", city: "Zanzibar", name: "Abeid Amani Karume International Airport", country: "Tanzania" },
  { code: "DAR", city: "Dar es Salaam", name: "Julius Nyerere International Airport", country: "Tanzania" },

  // Asia
  { code: "BKK", city: "Bangkok", name: "Suvarnabhumi Airport", country: "Thailand" },
  { code: "HKT", city: "Phuket", name: "Phuket International Airport", country: "Thailand" },
  { code: "KUL", city: "Kuala Lumpur", name: "Kuala Lumpur International Airport", country: "Malaysia" },
  { code: "SIN", city: "Singapore", name: "Changi Airport", country: "Singapore" },
  { code: "CGK", city: "Jakarta", name: "Soekarno Hatta International Airport", country: "Indonesia" },
  { code: "DPS", city: "Bali", name: "Ngurah Rai International Airport", country: "Indonesia" },
  { code: "MNL", city: "Manila", name: "Ninoy Aquino International Airport", country: "Philippines" },
  { code: "HKG", city: "Hong Kong", name: "Hong Kong International Airport", country: "Hong Kong" },
  { code: "PEK", city: "Beijing", name: "Capital International Airport", country: "China" },
  { code: "PVG", city: "Shanghai", name: "Pudong International Airport", country: "China" },
  { code: "CAN", city: "Guangzhou", name: "Baiyun International Airport", country: "China" },
  { code: "NRT", city: "Tokyo", name: "Narita International Airport", country: "Japan" },
  { code: "HND", city: "Tokyo", name: "Haneda Airport", country: "Japan" },
  { code: "KIX", city: "Osaka", name: "Kansai International Airport", country: "Japan" },
  { code: "ICN", city: "Seoul", name: "Incheon International Airport", country: "South Korea" },
  { code: "TPE", city: "Taipei", name: "Taoyuan International Airport", country: "Taiwan" },
  { code: "SGN", city: "Ho Chi Minh City", name: "Tan Son Nhat International Airport", country: "Vietnam" },
  { code: "HAN", city: "Hanoi", name: "Noi Bai International Airport", country: "Vietnam" },

  // Americas
  { code: "JFK", city: "New York", name: "John F. Kennedy International Airport", country: "United States" },
  { code: "EWR", city: "New York", name: "Newark Liberty International Airport", country: "United States" },
  { code: "BOS", city: "Boston", name: "Logan International Airport", country: "United States" },
  { code: "IAD", city: "Washington", name: "Dulles International Airport", country: "United States" },
  { code: "ORD", city: "Chicago", name: "O'Hare International Airport", country: "United States" },
  { code: "ATL", city: "Atlanta", name: "Hartsfield-Jackson International Airport", country: "United States" },
  { code: "MIA", city: "Miami", name: "Miami International Airport", country: "United States" },
  { code: "MCO", city: "Orlando", name: "Orlando International Airport", country: "United States" },
  { code: "LAX", city: "Los Angeles", name: "Los Angeles International Airport", country: "United States" },
  { code: "SFO", city: "San Francisco", name: "San Francisco International Airport", country: "United States" },
  { code: "SEA", city: "Seattle", name: "Seattle-Tacoma International Airport", country: "United States" },
  { code: "DFW", city: "Dallas", name: "Dallas Fort Worth International Airport", country: "United States" },
  { code: "IAH", city: "Houston", name: "George Bush Intercontinental Airport", country: "United States" },
  { code: "YYZ", city: "Toronto", name: "Pearson International Airport", country: "Canada" },
  { code: "YVR", city: "Vancouver", name: "Vancouver International Airport", country: "Canada" },
  { code: "YUL", city: "Montreal", name: "Pierre Elliott Trudeau International Airport", country: "Canada" },
  { code: "YYC", city: "Calgary", name: "Calgary International Airport", country: "Canada" },

  // Oceania
  { code: "SYD", city: "Sydney", name: "Kingsford Smith Airport", country: "Australia" },
  { code: "MEL", city: "Melbourne", name: "Melbourne Airport", country: "Australia" },
  { code: "BNE", city: "Brisbane", name: "Brisbane Airport", country: "Australia" },
  { code: "PER", city: "Perth", name: "Perth Airport", country: "Australia" },
  { code: "AKL", city: "Auckland", name: "Auckland Airport", country: "New Zealand" },
];

const POPULAR_CODES = [
  "LHR", "LGW", "MAN", "BHX", "STN", "ISB", "LHE", "KHI", "DXB", "DOH",
  "IST", "JED", "DEL", "BOM", "DAC", "JFK",
];

/** What the form stores and shows for a selected airport, e.g. "London (LHR)". */
export function airportLabel(airport: Airport) {
  return `${airport.city} (${airport.code})`;
}

export function isAirportLabel(value: string) {
  return AIRPORTS.some((airport) => airportLabel(airport) === value);
}

/** Airports shown before the user types anything. */
export const POPULAR_AIRPORTS: Airport[] = POPULAR_CODES
  .map((code) => AIRPORTS.find((airport) => airport.code === code))
  .filter((airport): airport is Airport => Boolean(airport));

/**
 * Search by code, city, airport name or country. Codes and city prefixes rank
 * first so typing "LHR" or "lond" puts the expected airports at the top.
 */
export function searchAirports(query: string, limit = 50): Airport[] {
  const q = query.trim().toLowerCase();
  if (!q) return POPULAR_AIRPORTS;
  const tokens = q.split(/\s+/);

  const scored: { airport: Airport; score: number }[] = [];
  for (const airport of AIRPORTS) {
    const haystack = `${airport.code} ${airport.city} ${airport.name} ${airport.country}`.toLowerCase();
    if (!tokens.every((token) => haystack.includes(token))) continue;
    const code = airport.code.toLowerCase();
    const city = airport.city.toLowerCase();
    const name = airport.name.toLowerCase();
    let score = 3;
    if (code === q) score = 0;
    else if (code.startsWith(q)) score = 1;
    else if (city.startsWith(q) || name.startsWith(q)) score = 2;
    scored.push({ airport, score });
  }

  return scored
    .sort((a, b) => a.score - b.score || a.airport.city.localeCompare(b.airport.city))
    .slice(0, limit)
    .map(({ airport }) => airport);
}
