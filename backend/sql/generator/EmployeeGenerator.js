// Some OG pokes
const POKEMON_CSV = "Bulbasaur,Ivysaur,Venusaur,Charmander,Charmeleon,Charizard,Squirtle,Wartortle,Blastoise,Caterpie,Metapod,Butterfree,Weedle,Kakuna,Beedrill,Pidgey,Pidgeotto,Pidgeot,Rattata,Raticate,Spearow,Fearow,Ekans,Arbok,Pikachu,Raichu,Sandshrew,Sandslash,Nidoran,Nidorina,Nidoqueen,Nidoran,Nidorino,Nidoking,Clefairy,Clefable,Vulpix,Ninetales,Jigglypuff,Wigglytuff,Zubat,Golbat,Oddish,Gloom,Vileplume,Paras,Parasect,Venonat,Venomoth,Diglett,Dugtrio,Meowth,Persian,Psyduck,Golduck,Mankey,Primeape,Growlithe,Arcanine,Poliwag,Poliwhirl,Poliwrath,Abra,Kadabra,Alakazam,Machop,Machoke,Machamp,Bellsprout,Weepinbell,Victreebel,Tentacool,Tentacruel,Geodude,Graveler,Golem,Ponyta,Rapidash,Slowpoke,Slowbro,Magnemite,Magneton,Farfetchd,Doduo,Dodrio,Seel,Dewgong,Grimer,Muk,Shellder,Cloyster,Gastly,Haunter,Gengar,Onix,Drowzee,Hypno,Krabby,Kingler,Voltorb,Electrode,Exeggcute,Exeggutor,Cubone,Marowak,Hitmonlee,Hitmonchan,Lickitung,Koffing,Weezing,Rhyhorn,Rhydon,Chansey,Tangela,Kangaskhan,Horsea,Seadra,Goldeen,Seaking,Staryu,Starmie,Mr. Mime,Scyther,Jynx,Electabuzz,Magmar,Pinsir,Tauros,Magikarp,Gyarados,Lapras,Ditto,Eevee,Vaporeon,Jolteon,Flareon,Porygon,Omanyte,Omastar,Kabuto,Kabutops,Aerodactyl,Snorlax,Articuno,Zapdos,Moltres,Dratini,Dragonair,Dragonite,Mewtwo,Mew";
const DEPARTMENTS = ["Management", "Customer Service", "IT", "Marketing", "Finance", "HR"]
const pokemon = POKEMON_CSV.split(',')

// Some uniqueness assurances
const takenEmails = {}
let emailIndex = 1
const takenIcbcEmployeeIds = {}

function randomPokemon() {
  const index = Math.floor(Math.random() * pokemon.length);
  return pokemon[index];
}

function randomDepartment() {
  const index = Math.floor(Math.random() * DEPARTMENTS.length);
  return DEPARTMENTS[index];
}

function generate(sql, numEmployees = 5000) {
  for (let i = 1; i <= numEmployees; ++i) {
    const StaffId = i
    const FirstName = randomPokemon()
    const LastName = Math.random() < 0.1 ? `Mc${randomPokemon()}` : randomPokemon()

    // ICBC Employee Id is last name + first initial + random number. Uniqueness ensured.
    let ICBCEmployeeId;
    do {
      ICBCEmployeeId = `${LastName.toUpperCase()}${FirstName[0]}.${Math.floor(Math.random() * numEmployees)}`
    } while (takenIcbcEmployeeIds[ICBCEmployeeId]);
    takenIcbcEmployeeIds[ICBCEmployeeId] = true

    // Email is ensured to be unique in case two employees have the same first and last name
    let Email = `${FirstName}.${LastName}@icbc.com`;
    if (takenEmails[Email]) {
      Email = `${FirstName}.${LastName}${emailIndex++}@icbc.com`;
    }
    takenEmails[Email] = true
    Email = Email.toLowerCase()

    const Department = randomDepartment()
    sql.script += `INSERT INTO user (StaffId, ICBCEmployeeId, Email,FirstName,LastName,Department,Valid) VALUES (${StaffId}, '${ICBCEmployeeId}', '${Email}', '${FirstName}', '${LastName}', '${Department}', 1);\n`
  }
}

module.exports = { generate }