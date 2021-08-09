(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ct = {}));
}(this, (function (exports) { 'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);

      if (enumerableOnly) {
        symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }

      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var timezonesMap;
  function buildCountry(data, id) {
    var name = data.countries[id];
    if (!name) return null;
    var tzMap = getTimezonesMap(data);
    var timezones = tzMap[id] || [];
    return {
      id: id,
      name: name,
      timezones: timezones
    };
  }

  function getTimezonesMap(data) {
    if (!timezonesMap) timezonesMap = buildTimezonesMap(data);
    return timezonesMap;
  }

  function buildTimezonesMap(data) {
    return Object.keys(data.timezones).reduce(function (result, id) {
      var tz = data.timezones[id];
      var c = tz.c,
          a = tz.a;
      var aliasTz = data.timezones[a] || {};
      var countries = c || aliasTz.c;
      if (!countries) return result;
      countries.forEach(function (country) {
        if (!result[country]) result[country] = [];
        result[country].push(id);
      });
      return result;
    }, {});
  }

  function buildTimezone(data, name) {
    var timezone = data.timezones[name];
    if (!timezone) return null;
    var _timezone$a = timezone.a,
        aliasOf = _timezone$a === void 0 ? null : _timezone$a;
    var aliasTz = aliasOf ? data.timezones[aliasOf] : {};

    var tz = _objectSpread2(_objectSpread2({}, aliasTz), data.timezones[name]);

    var countries = tz.c || [];
    var utcOffset = tz.u;
    var dstOffset = Number.isInteger(tz.d) ? tz.d : utcOffset;
    return {
      name: name,
      countries: countries,
      utcOffset: utcOffset,
      utcOffsetStr: getOffsetStr(utcOffset),
      dstOffset: dstOffset,
      dstOffsetStr: getOffsetStr(dstOffset),
      aliasOf: aliasOf
    };
  }

  function getOffsetStr(offset) {
    var hours = Math.floor(offset / 60);
    var min = offset % 60;
    var sign = offset < 0 ? '-' : '+';
    return "".concat(sign).concat(getNumStr(hours), ":").concat(getNumStr(min));
  }

  function getNumStr(input) {
    var num = Math.abs(input);
    var prefix = num < 10 ? '0' : '';
    return "".concat(prefix).concat(num);
  }

  var countries$1 = {
  	AD: "Andorra",
  	AE: "United Arab Emirates",
  	AF: "Afghanistan",
  	AG: "Antigua and Barbuda",
  	AI: "Anguilla",
  	AL: "Albania",
  	AM: "Armenia",
  	AO: "Angola",
  	AQ: "Antarctica",
  	AR: "Argentina",
  	AS: "American Samoa",
  	AT: "Austria",
  	AU: "Australia",
  	AW: "Aruba",
  	AX: "Åland Islands",
  	AZ: "Azerbaijan",
  	BA: "Bosnia and Herzegovina",
  	BB: "Barbados",
  	BD: "Bangladesh",
  	BE: "Belgium",
  	BF: "Burkina Faso",
  	BG: "Bulgaria",
  	BH: "Bahrain",
  	BI: "Burundi",
  	BJ: "Benin",
  	BL: "Saint Barthélemy",
  	BM: "Bermuda",
  	BN: "Brunei",
  	BO: "Bolivia",
  	BQ: "Caribbean Netherlands",
  	BR: "Brazil",
  	BS: "Bahamas",
  	BT: "Bhutan",
  	BV: "Bouvet Island",
  	BW: "Botswana",
  	BY: "Belarus",
  	BZ: "Belize",
  	CA: "Canada",
  	CC: "Cocos Islands",
  	CD: "Democratic Republic of the Congo",
  	CF: "Central African Republic",
  	CG: "Republic of the Congo",
  	CH: "Switzerland",
  	CI: "Ivory Coast",
  	CK: "Cook Islands",
  	CL: "Chile",
  	CM: "Cameroon",
  	CN: "China",
  	CO: "Colombia",
  	CR: "Costa Rica",
  	CU: "Cuba",
  	CV: "Cabo Verde",
  	CW: "Curaçao",
  	CX: "Christmas Island",
  	CY: "Cyprus",
  	CZ: "Czechia",
  	DE: "Germany",
  	DJ: "Djibouti",
  	DK: "Denmark",
  	DM: "Dominica",
  	DO: "Dominican Republic",
  	DZ: "Algeria",
  	EC: "Ecuador",
  	EE: "Estonia",
  	EG: "Egypt",
  	EH: "Western Sahara",
  	ER: "Eritrea",
  	ES: "Spain",
  	ET: "Ethiopia",
  	FI: "Finland",
  	FJ: "Fiji",
  	FK: "Falkland Islands",
  	FM: "Micronesia",
  	FO: "Faroe Islands",
  	FR: "France",
  	GA: "Gabon",
  	GB: "United Kingdom",
  	GD: "Grenada",
  	GE: "Georgia",
  	GF: "French Guiana",
  	GG: "Guernsey",
  	GH: "Ghana",
  	GI: "Gibraltar",
  	GL: "Greenland",
  	GM: "Gambia",
  	GN: "Guinea",
  	GP: "Guadeloupe",
  	GQ: "Equatorial Guinea",
  	GR: "Greece",
  	GS: "South Georgia and the South Sandwich Islands",
  	GT: "Guatemala",
  	GU: "Guam",
  	GW: "Guinea-Bissau",
  	GY: "Guyana",
  	HK: "Hong Kong",
  	HM: "Heard Island and McDonald Islands",
  	HN: "Honduras",
  	HR: "Croatia",
  	HT: "Haiti",
  	HU: "Hungary",
  	ID: "Indonesia",
  	IE: "Ireland",
  	IL: "Israel",
  	IM: "Isle of Man",
  	IN: "India",
  	IO: "British Indian Ocean Territory",
  	IQ: "Iraq",
  	IR: "Iran",
  	IS: "Iceland",
  	IT: "Italy",
  	JE: "Jersey",
  	JM: "Jamaica",
  	JO: "Jordan",
  	JP: "Japan",
  	KE: "Kenya",
  	KG: "Kyrgyzstan",
  	KH: "Cambodia",
  	KI: "Kiribati",
  	KM: "Comoros",
  	KN: "Saint Kitts and Nevis",
  	KP: "North Korea",
  	KR: "South Korea",
  	KW: "Kuwait",
  	KY: "Cayman Islands",
  	KZ: "Kazakhstan",
  	LA: "Laos",
  	LB: "Lebanon",
  	LC: "Saint Lucia",
  	LI: "Liechtenstein",
  	LK: "Sri Lanka",
  	LR: "Liberia",
  	LS: "Lesotho",
  	LT: "Lithuania",
  	LU: "Luxembourg",
  	LV: "Latvia",
  	LY: "Libya",
  	MA: "Morocco",
  	MC: "Monaco",
  	MD: "Moldova",
  	ME: "Montenegro",
  	MF: "Saint Martin",
  	MG: "Madagascar",
  	MH: "Marshall Islands",
  	MK: "North Macedonia",
  	ML: "Mali",
  	MM: "Myanmar",
  	MN: "Mongolia",
  	MO: "Macao",
  	MP: "Northern Mariana Islands",
  	MQ: "Martinique",
  	MR: "Mauritania",
  	MS: "Montserrat",
  	MT: "Malta",
  	MU: "Mauritius",
  	MV: "Maldives",
  	MW: "Malawi",
  	MX: "Mexico",
  	MY: "Malaysia",
  	MZ: "Mozambique",
  	NA: "Namibia",
  	NC: "New Caledonia",
  	NE: "Niger",
  	NF: "Norfolk Island",
  	NG: "Nigeria",
  	NI: "Nicaragua",
  	NL: "Netherlands",
  	NO: "Norway",
  	NP: "Nepal",
  	NR: "Nauru",
  	NU: "Niue",
  	NZ: "New Zealand",
  	OM: "Oman",
  	PA: "Panama",
  	PE: "Peru",
  	PF: "French Polynesia",
  	PG: "Papua New Guinea",
  	PH: "Philippines",
  	PK: "Pakistan",
  	PL: "Poland",
  	PM: "Saint Pierre and Miquelon",
  	PN: "Pitcairn",
  	PR: "Puerto Rico",
  	PS: "Palestine",
  	PT: "Portugal",
  	PW: "Palau",
  	PY: "Paraguay",
  	QA: "Qatar",
  	RE: "Réunion",
  	RO: "Romania",
  	RS: "Serbia",
  	RU: "Russia",
  	RW: "Rwanda",
  	SA: "Saudi Arabia",
  	SB: "Solomon Islands",
  	SC: "Seychelles",
  	SD: "Sudan",
  	SE: "Sweden",
  	SG: "Singapore",
  	SH: "Saint Helena, Ascension and Tristan da Cunha",
  	SI: "Slovenia",
  	SJ: "Svalbard and Jan Mayen",
  	SK: "Slovakia",
  	SL: "Sierra Leone",
  	SM: "San Marino",
  	SN: "Senegal",
  	SO: "Somalia",
  	SR: "Suriname",
  	SS: "South Sudan",
  	ST: "Sao Tome and Principe",
  	SV: "El Salvador",
  	SX: "Sint Maarten",
  	SY: "Syria",
  	SZ: "Eswatini",
  	TC: "Turks and Caicos Islands",
  	TD: "Chad",
  	TF: "French Southern Territories",
  	TG: "Togo",
  	TH: "Thailand",
  	TJ: "Tajikistan",
  	TK: "Tokelau",
  	TL: "Timor-Leste",
  	TM: "Turkmenistan",
  	TN: "Tunisia",
  	TO: "Tonga",
  	TR: "Turkey",
  	TT: "Trinidad and Tobago",
  	TV: "Tuvalu",
  	TW: "Taiwan",
  	TZ: "Tanzania",
  	UA: "Ukraine",
  	UG: "Uganda",
  	UM: "United States Minor Outlying Islands",
  	US: "United States of America",
  	UY: "Uruguay",
  	UZ: "Uzbekistan",
  	VA: "Holy See",
  	VC: "Saint Vincent and the Grenadines",
  	VE: "Venezuela",
  	VG: "Virgin Islands (UK)",
  	VI: "Virgin Islands (US)",
  	VN: "Vietnam",
  	VU: "Vanuatu",
  	WF: "Wallis and Futuna",
  	WS: "Samoa",
  	YE: "Yemen",
  	YT: "Mayotte",
  	ZA: "South Africa",
  	ZM: "Zambia",
  	ZW: "Zimbabwe"
  };
  var timezones$1 = {
  	"Africa/Bamako": {
  		a: "Africa/Abidjan",
  		c: [
  			"ML"
  		]
  	},
  	"Africa/Banjul": {
  		a: "Africa/Abidjan",
  		c: [
  			"GM"
  		]
  	},
  	"Africa/Conakry": {
  		a: "Africa/Abidjan",
  		c: [
  			"GN"
  		]
  	},
  	"Africa/Dakar": {
  		a: "Africa/Abidjan",
  		c: [
  			"SN"
  		]
  	},
  	"Africa/Freetown": {
  		a: "Africa/Abidjan",
  		c: [
  			"SL"
  		]
  	},
  	"Africa/Lome": {
  		a: "Africa/Abidjan",
  		c: [
  			"TG"
  		]
  	},
  	"Africa/Nouakchott": {
  		a: "Africa/Abidjan",
  		c: [
  			"MR"
  		]
  	},
  	"Africa/Ouagadougou": {
  		a: "Africa/Abidjan",
  		c: [
  			"BF"
  		]
  	},
  	"Africa/Timbuktu": {
  		a: "Africa/Abidjan"
  	},
  	"Atlantic/St_Helena": {
  		a: "Africa/Abidjan",
  		c: [
  			"SH"
  		]
  	},
  	Egypt: {
  		a: "Africa/Cairo"
  	},
  	"Africa/Maseru": {
  		a: "Africa/Johannesburg",
  		c: [
  			"LS"
  		]
  	},
  	"Africa/Mbabane": {
  		a: "Africa/Johannesburg",
  		c: [
  			"SZ"
  		]
  	},
  	"Africa/Bangui": {
  		a: "Africa/Lagos",
  		c: [
  			"CF"
  		]
  	},
  	"Africa/Brazzaville": {
  		a: "Africa/Lagos",
  		c: [
  			"CG"
  		]
  	},
  	"Africa/Douala": {
  		a: "Africa/Lagos",
  		c: [
  			"CM"
  		]
  	},
  	"Africa/Kinshasa": {
  		a: "Africa/Lagos",
  		c: [
  			"CD"
  		]
  	},
  	"Africa/Libreville": {
  		a: "Africa/Lagos",
  		c: [
  			"GA"
  		]
  	},
  	"Africa/Luanda": {
  		a: "Africa/Lagos",
  		c: [
  			"AO"
  		]
  	},
  	"Africa/Malabo": {
  		a: "Africa/Lagos",
  		c: [
  			"GQ"
  		]
  	},
  	"Africa/Niamey": {
  		a: "Africa/Lagos",
  		c: [
  			"NE"
  		]
  	},
  	"Africa/Porto-Novo": {
  		a: "Africa/Lagos",
  		c: [
  			"BJ"
  		]
  	},
  	"Africa/Blantyre": {
  		a: "Africa/Maputo",
  		c: [
  			"MW"
  		]
  	},
  	"Africa/Bujumbura": {
  		a: "Africa/Maputo",
  		c: [
  			"BI"
  		]
  	},
  	"Africa/Gaborone": {
  		a: "Africa/Maputo",
  		c: [
  			"BW"
  		]
  	},
  	"Africa/Harare": {
  		a: "Africa/Maputo",
  		c: [
  			"ZW"
  		]
  	},
  	"Africa/Kigali": {
  		a: "Africa/Maputo",
  		c: [
  			"RW"
  		]
  	},
  	"Africa/Lubumbashi": {
  		a: "Africa/Maputo",
  		c: [
  			"CD"
  		]
  	},
  	"Africa/Lusaka": {
  		a: "Africa/Maputo",
  		c: [
  			"ZM"
  		]
  	},
  	"Africa/Addis_Ababa": {
  		a: "Africa/Nairobi",
  		c: [
  			"ET"
  		]
  	},
  	"Africa/Asmara": {
  		a: "Africa/Nairobi",
  		c: [
  			"ER"
  		]
  	},
  	"Africa/Asmera": {
  		a: "Africa/Nairobi"
  	},
  	"Africa/Dar_es_Salaam": {
  		a: "Africa/Nairobi",
  		c: [
  			"TZ"
  		]
  	},
  	"Africa/Djibouti": {
  		a: "Africa/Nairobi",
  		c: [
  			"DJ"
  		]
  	},
  	"Africa/Kampala": {
  		a: "Africa/Nairobi",
  		c: [
  			"UG"
  		]
  	},
  	"Africa/Mogadishu": {
  		a: "Africa/Nairobi",
  		c: [
  			"SO"
  		]
  	},
  	"Indian/Antananarivo": {
  		a: "Africa/Nairobi",
  		c: [
  			"MG"
  		]
  	},
  	"Indian/Comoro": {
  		a: "Africa/Nairobi",
  		c: [
  			"KM"
  		]
  	},
  	"Indian/Mayotte": {
  		a: "Africa/Nairobi",
  		c: [
  			"YT"
  		]
  	},
  	Libya: {
  		a: "Africa/Tripoli"
  	},
  	"America/Atka": {
  		a: "America/Adak"
  	},
  	"US/Aleutian": {
  		a: "America/Adak"
  	},
  	"US/Alaska": {
  		a: "America/Anchorage"
  	},
  	"America/Buenos_Aires": {
  		a: "America/Argentina/Buenos_Aires"
  	},
  	"America/Argentina/ComodRivadavia": {
  		a: "America/Argentina/Catamarca"
  	},
  	"America/Catamarca": {
  		a: "America/Argentina/Catamarca"
  	},
  	"America/Cordoba": {
  		a: "America/Argentina/Cordoba"
  	},
  	"America/Rosario": {
  		a: "America/Argentina/Cordoba"
  	},
  	"America/Jujuy": {
  		a: "America/Argentina/Jujuy"
  	},
  	"America/Mendoza": {
  		a: "America/Argentina/Mendoza"
  	},
  	"America/Coral_Harbour": {
  		a: "America/Atikokan"
  	},
  	"US/Central": {
  		a: "America/Chicago"
  	},
  	"America/Aruba": {
  		a: "America/Curacao",
  		c: [
  			"AW"
  		]
  	},
  	"America/Kralendijk": {
  		a: "America/Curacao",
  		c: [
  			"BQ"
  		]
  	},
  	"America/Lower_Princes": {
  		a: "America/Curacao",
  		c: [
  			"SX"
  		]
  	},
  	"America/Shiprock": {
  		a: "America/Denver"
  	},
  	Navajo: {
  		a: "America/Denver"
  	},
  	"US/Mountain": {
  		a: "America/Denver"
  	},
  	"US/Michigan": {
  		a: "America/Detroit"
  	},
  	"Canada/Mountain": {
  		a: "America/Edmonton"
  	},
  	"America/Indiana/Indianapolis": {
  		c: [
  			"US"
  		],
  		d: -240,
  		u: -300
  	},
  	"America/Nuuk": {
  		c: [
  			"GL"
  		],
  		d: -120,
  		u: -180
  	},
  	"Canada/Atlantic": {
  		a: "America/Halifax"
  	},
  	Cuba: {
  		a: "America/Havana"
  	},
  	"America/Knox_IN": {
  		a: "America/Indiana/Knox"
  	},
  	"US/Indiana-Starke": {
  		a: "America/Indiana/Knox"
  	},
  	Jamaica: {
  		a: "America/Jamaica"
  	},
  	"America/Louisville": {
  		a: "America/Kentucky/Louisville"
  	},
  	"US/Pacific": {
  		a: "America/Los_Angeles"
  	},
  	"Brazil/West": {
  		a: "America/Manaus"
  	},
  	"Mexico/BajaSur": {
  		a: "America/Mazatlan"
  	},
  	"Mexico/General": {
  		a: "America/Mexico_City"
  	},
  	"US/Eastern": {
  		a: "America/New_York"
  	},
  	"Brazil/DeNoronha": {
  		a: "America/Noronha"
  	},
  	"America/Cayman": {
  		a: "America/Panama",
  		c: [
  			"KY"
  		]
  	},
  	"US/Arizona": {
  		a: "America/Phoenix"
  	},
  	"America/Anguilla": {
  		a: "America/Port_of_Spain",
  		c: [
  			"AI"
  		]
  	},
  	"America/Antigua": {
  		a: "America/Port_of_Spain",
  		c: [
  			"AG"
  		]
  	},
  	"America/Dominica": {
  		a: "America/Port_of_Spain",
  		c: [
  			"DM"
  		]
  	},
  	"America/Grenada": {
  		a: "America/Port_of_Spain",
  		c: [
  			"GD"
  		]
  	},
  	"America/Guadeloupe": {
  		a: "America/Port_of_Spain",
  		c: [
  			"GP"
  		]
  	},
  	"America/Marigot": {
  		a: "America/Port_of_Spain",
  		c: [
  			"MF"
  		]
  	},
  	"America/Montserrat": {
  		a: "America/Port_of_Spain",
  		c: [
  			"MS"
  		]
  	},
  	"America/St_Barthelemy": {
  		a: "America/Port_of_Spain",
  		c: [
  			"BL"
  		]
  	},
  	"America/St_Kitts": {
  		a: "America/Port_of_Spain",
  		c: [
  			"KN"
  		]
  	},
  	"America/St_Lucia": {
  		a: "America/Port_of_Spain",
  		c: [
  			"LC"
  		]
  	},
  	"America/St_Thomas": {
  		a: "America/Port_of_Spain",
  		c: [
  			"VI"
  		]
  	},
  	"America/St_Vincent": {
  		a: "America/Port_of_Spain",
  		c: [
  			"VC"
  		]
  	},
  	"America/Tortola": {
  		a: "America/Port_of_Spain",
  		c: [
  			"VG"
  		]
  	},
  	"America/Virgin": {
  		a: "America/Port_of_Spain"
  	},
  	"Canada/Saskatchewan": {
  		a: "America/Regina"
  	},
  	"America/Porto_Acre": {
  		a: "America/Rio_Branco"
  	},
  	"Brazil/Acre": {
  		a: "America/Rio_Branco"
  	},
  	"Chile/Continental": {
  		a: "America/Santiago"
  	},
  	"Brazil/East": {
  		a: "America/Sao_Paulo"
  	},
  	"Canada/Newfoundland": {
  		a: "America/St_Johns"
  	},
  	"America/Ensenada": {
  		a: "America/Tijuana"
  	},
  	"America/Santa_Isabel": {
  		a: "America/Tijuana"
  	},
  	"Mexico/BajaNorte": {
  		a: "America/Tijuana"
  	},
  	"America/Montreal": {
  		a: "America/Toronto"
  	},
  	"Canada/Eastern": {
  		a: "America/Toronto"
  	},
  	"Canada/Pacific": {
  		a: "America/Vancouver"
  	},
  	"Canada/Yukon": {
  		a: "America/Whitehorse"
  	},
  	"Canada/Central": {
  		a: "America/Winnipeg"
  	},
  	"Asia/Ashkhabad": {
  		a: "Asia/Ashgabat"
  	},
  	"Asia/Phnom_Penh": {
  		a: "Asia/Bangkok",
  		c: [
  			"KH"
  		]
  	},
  	"Asia/Vientiane": {
  		a: "Asia/Bangkok",
  		c: [
  			"LA"
  		]
  	},
  	"Asia/Dacca": {
  		a: "Asia/Dhaka"
  	},
  	"Asia/Muscat": {
  		a: "Asia/Dubai",
  		c: [
  			"OM"
  		]
  	},
  	"Asia/Saigon": {
  		a: "Asia/Ho_Chi_Minh"
  	},
  	Hongkong: {
  		a: "Asia/Hong_Kong"
  	},
  	"Asia/Tel_Aviv": {
  		a: "Asia/Jerusalem"
  	},
  	Israel: {
  		a: "Asia/Jerusalem"
  	},
  	"Asia/Katmandu": {
  		a: "Asia/Kathmandu"
  	},
  	"Asia/Calcutta": {
  		a: "Asia/Kolkata"
  	},
  	"Asia/Singapore": {
  		a: "Asia/Kuala_Lumpur",
  		c: [
  			"SG"
  		]
  	},
  	"Asia/Macao": {
  		a: "Asia/Macau"
  	},
  	"Asia/Ujung_Pandang": {
  		a: "Asia/Makassar"
  	},
  	"Europe/Nicosia": {
  		a: "Asia/Nicosia"
  	},
  	"Asia/Bahrain": {
  		a: "Asia/Qatar",
  		c: [
  			"BH"
  		]
  	},
  	"Asia/Yangon": {
  		c: [
  			"MM"
  		],
  		u: 390
  	},
  	"Asia/Aden": {
  		a: "Asia/Riyadh",
  		c: [
  			"YE"
  		]
  	},
  	"Asia/Kuwait": {
  		a: "Asia/Riyadh",
  		c: [
  			"KW"
  		]
  	},
  	ROK: {
  		a: "Asia/Seoul"
  	},
  	"Asia/Chongqing": {
  		a: "Asia/Shanghai"
  	},
  	"Asia/Chungking": {
  		a: "Asia/Shanghai"
  	},
  	"Asia/Harbin": {
  		a: "Asia/Shanghai"
  	},
  	PRC: {
  		a: "Asia/Shanghai"
  	},
  	ROC: {
  		a: "Asia/Taipei"
  	},
  	Iran: {
  		a: "Asia/Tehran"
  	},
  	"Asia/Thimbu": {
  		a: "Asia/Thimphu"
  	},
  	Japan: {
  		a: "Asia/Tokyo"
  	},
  	"Asia/Ulan_Bator": {
  		a: "Asia/Ulaanbaatar"
  	},
  	"Asia/Kashgar": {
  		a: "Asia/Urumqi"
  	},
  	"Atlantic/Faeroe": {
  		a: "Atlantic/Faroe"
  	},
  	Iceland: {
  		a: "Atlantic/Reykjavik"
  	},
  	"Etc/GMT+2": {
  		a: "Atlantic/South_Georgia"
  	},
  	"Australia/South": {
  		a: "Australia/Adelaide"
  	},
  	"Australia/Queensland": {
  		a: "Australia/Brisbane"
  	},
  	"Australia/Yancowinna": {
  		a: "Australia/Broken_Hill"
  	},
  	"Australia/North": {
  		a: "Australia/Darwin"
  	},
  	"Australia/Currie": {
  		a: "Australia/Hobart"
  	},
  	"Australia/Tasmania": {
  		a: "Australia/Hobart"
  	},
  	"Australia/LHI": {
  		a: "Australia/Lord_Howe"
  	},
  	"Australia/Victoria": {
  		a: "Australia/Melbourne"
  	},
  	"Australia/West": {
  		a: "Australia/Perth"
  	},
  	"Australia/ACT": {
  		a: "Australia/Sydney"
  	},
  	"Australia/Canberra": {
  		a: "Australia/Sydney"
  	},
  	"Australia/NSW": {
  		a: "Australia/Sydney"
  	},
  	"Etc/GMT": {
  		a: "Etc/GMT-0"
  	},
  	"Etc/GMT+0": {
  		a: "Etc/GMT-0"
  	},
  	"Etc/GMT0": {
  		a: "Etc/GMT-0"
  	},
  	"Etc/Greenwich": {
  		a: "Etc/GMT-0"
  	},
  	GMT: {
  		a: "Etc/GMT-0"
  	},
  	"GMT+0": {
  		a: "Etc/GMT-0"
  	},
  	"GMT-0": {
  		a: "Etc/GMT-0"
  	},
  	GMT0: {
  		a: "Etc/GMT-0"
  	},
  	Greenwich: {
  		a: "Etc/GMT-0"
  	},
  	"Etc/UCT": {
  		a: "Etc/UTC"
  	},
  	"Etc/Universal": {
  		a: "Etc/UTC"
  	},
  	"Etc/Zulu": {
  		a: "Etc/UTC"
  	},
  	UCT: {
  		a: "Etc/UTC"
  	},
  	UTC: {
  		a: "Etc/UTC"
  	},
  	Universal: {
  		a: "Etc/UTC"
  	},
  	Zulu: {
  		a: "Etc/UTC"
  	},
  	"Europe/Ljubljana": {
  		a: "Europe/Belgrade",
  		c: [
  			"SI"
  		]
  	},
  	"Europe/Podgorica": {
  		a: "Europe/Belgrade",
  		c: [
  			"ME"
  		]
  	},
  	"Europe/Sarajevo": {
  		a: "Europe/Belgrade",
  		c: [
  			"BA"
  		]
  	},
  	"Europe/Skopje": {
  		a: "Europe/Belgrade",
  		c: [
  			"MK"
  		]
  	},
  	"Europe/Zagreb": {
  		a: "Europe/Belgrade",
  		c: [
  			"HR"
  		]
  	},
  	"Europe/Tiraspol": {
  		a: "Europe/Chisinau"
  	},
  	Eire: {
  		a: "Europe/Dublin"
  	},
  	"Europe/Mariehamn": {
  		a: "Europe/Helsinki",
  		c: [
  			"AX"
  		]
  	},
  	"Asia/Istanbul": {
  		a: "Europe/Istanbul"
  	},
  	Turkey: {
  		a: "Europe/Istanbul"
  	},
  	Portugal: {
  		a: "Europe/Lisbon"
  	},
  	"Europe/Belfast": {
  		a: "Europe/London"
  	},
  	"Europe/Guernsey": {
  		a: "Europe/London",
  		c: [
  			"GG"
  		]
  	},
  	"Europe/Isle_of_Man": {
  		a: "Europe/London",
  		c: [
  			"IM"
  		]
  	},
  	"Europe/Jersey": {
  		a: "Europe/London",
  		c: [
  			"JE"
  		]
  	},
  	GB: {
  		a: "Europe/London"
  	},
  	"GB-Eire": {
  		a: "Europe/London"
  	},
  	"Arctic/Longyearbyen": {
  		a: "Europe/Oslo",
  		c: [
  			"SJ"
  		]
  	},
  	"Atlantic/Jan_Mayen": {
  		a: "Europe/Oslo"
  	},
  	"Europe/Bratislava": {
  		a: "Europe/Prague",
  		c: [
  			"SK"
  		]
  	},
  	"Europe/San_Marino": {
  		a: "Europe/Rome",
  		c: [
  			"SM"
  		]
  	},
  	"Europe/Vatican": {
  		a: "Europe/Rome",
  		c: [
  			"VA"
  		]
  	},
  	Poland: {
  		a: "Europe/Warsaw"
  	},
  	"Europe/Busingen": {
  		a: "Europe/Zurich",
  		c: [
  			"DE"
  		]
  	},
  	"Europe/Vaduz": {
  		a: "Europe/Zurich",
  		c: [
  			"LI"
  		]
  	},
  	"Etc/GMT-7": {
  		a: "Indian/Christmas"
  	},
  	"Antarctica/McMurdo": {
  		a: "Pacific/Auckland",
  		c: [
  			"AQ"
  		]
  	},
  	"Antarctica/South_Pole": {
  		a: "Pacific/Auckland"
  	},
  	NZ: {
  		a: "Pacific/Auckland"
  	},
  	"NZ-CHAT": {
  		a: "Pacific/Chatham"
  	},
  	"Pacific/Truk": {
  		a: "Pacific/Chuuk"
  	},
  	"Pacific/Yap": {
  		a: "Pacific/Chuuk"
  	},
  	"Chile/EasterIsland": {
  		a: "Pacific/Easter"
  	},
  	"Pacific/Saipan": {
  		a: "Pacific/Guam",
  		c: [
  			"MP"
  		]
  	},
  	"Pacific/Johnston": {
  		a: "Pacific/Honolulu"
  	},
  	"US/Hawaii": {
  		a: "Pacific/Honolulu"
  	},
  	Kwajalein: {
  		a: "Pacific/Kwajalein"
  	},
  	"Pacific/Midway": {
  		a: "Pacific/Pago_Pago",
  		c: [
  			"UM"
  		]
  	},
  	"Pacific/Samoa": {
  		a: "Pacific/Pago_Pago"
  	},
  	"US/Samoa": {
  		a: "Pacific/Pago_Pago"
  	},
  	"Etc/GMT-9": {
  		a: "Pacific/Palau"
  	},
  	"Pacific/Ponape": {
  		a: "Pacific/Pohnpei"
  	},
  	"Etc/GMT-10": {
  		a: "Pacific/Port_Moresby"
  	},
  	"Etc/GMT-12": {
  		a: "Pacific/Tarawa"
  	},
  	"Pacific/Funafuti": {
  		a: "Pacific/Tarawa",
  		c: [
  			"TV"
  		]
  	},
  	"Pacific/Wake": {
  		a: "Pacific/Tarawa",
  		c: [
  			"UM"
  		]
  	},
  	"Pacific/Wallis": {
  		a: "Pacific/Tarawa",
  		c: [
  			"WF"
  		]
  	},
  	"Africa/Abidjan": {
  		u: 0,
  		c: [
  			"CI"
  		]
  	},
  	"Africa/Accra": {
  		u: 0,
  		c: [
  			"GH"
  		]
  	},
  	"Africa/Nairobi": {
  		u: 180,
  		c: [
  			"KE",
  			"DJ",
  			"ER",
  			"ET",
  			"KM",
  			"MG",
  			"SO",
  			"TZ",
  			"UG",
  			"YT"
  		]
  	},
  	"Africa/Algiers": {
  		u: 60,
  		c: [
  			"DZ"
  		]
  	},
  	"Africa/Lagos": {
  		u: 60,
  		c: [
  			"NG",
  			"AO",
  			"BJ",
  			"CD",
  			"CF",
  			"CG",
  			"CM",
  			"GA",
  			"GQ",
  			"NE"
  		]
  	},
  	"Africa/Bissau": {
  		u: 0,
  		c: [
  			"GW"
  		]
  	},
  	"Africa/Maputo": {
  		u: 120,
  		c: [
  			"MZ",
  			"BI",
  			"BW",
  			"CD",
  			"MW",
  			"RW",
  			"ZM",
  			"ZW"
  		]
  	},
  	"Africa/Cairo": {
  		u: 120,
  		c: [
  			"EG"
  		]
  	},
  	"Africa/Casablanca": {
  		u: 0,
  		d: 60,
  		c: [
  			"MA"
  		]
  	},
  	"Africa/Ceuta": {
  		u: 60,
  		d: 120,
  		c: [
  			"ES"
  		]
  	},
  	"Africa/El_Aaiun": {
  		u: 0,
  		d: 60,
  		c: [
  			"EH"
  		]
  	},
  	"Africa/Johannesburg": {
  		u: 120,
  		c: [
  			"ZA",
  			"LS",
  			"SZ"
  		]
  	},
  	"Africa/Juba": {
  		u: 120,
  		c: [
  			"SS"
  		]
  	},
  	"Africa/Khartoum": {
  		u: 120,
  		c: [
  			"SD"
  		]
  	},
  	"Africa/Monrovia": {
  		u: 0,
  		c: [
  			"LR"
  		]
  	},
  	"Africa/Ndjamena": {
  		u: 60,
  		c: [
  			"TD"
  		]
  	},
  	"Africa/Sao_Tome": {
  		u: 0,
  		c: [
  			"ST"
  		]
  	},
  	"Africa/Tripoli": {
  		u: 120,
  		c: [
  			"LY"
  		]
  	},
  	"Africa/Tunis": {
  		u: 60,
  		c: [
  			"TN"
  		]
  	},
  	"Africa/Windhoek": {
  		u: 120,
  		c: [
  			"NA"
  		]
  	},
  	"America/Adak": {
  		u: -600,
  		d: -540,
  		c: [
  			"US"
  		]
  	},
  	"America/Anchorage": {
  		u: -540,
  		d: -480,
  		c: [
  			"US"
  		]
  	},
  	"America/Port_of_Spain": {
  		u: -240,
  		c: [
  			"TT"
  		]
  	},
  	"America/Araguaina": {
  		u: -180,
  		c: [
  			"BR"
  		]
  	},
  	"America/Argentina/Buenos_Aires": {
  		u: -180,
  		c: [
  			"AR"
  		]
  	},
  	"America/Argentina/Catamarca": {
  		u: -180,
  		c: [
  			"AR"
  		]
  	},
  	"America/Argentina/Cordoba": {
  		u: -180,
  		c: [
  			"AR"
  		]
  	},
  	"America/Argentina/Jujuy": {
  		u: -180,
  		c: [
  			"AR"
  		]
  	},
  	"America/Argentina/La_Rioja": {
  		u: -180,
  		c: [
  			"AR"
  		]
  	},
  	"America/Argentina/Mendoza": {
  		u: -180,
  		c: [
  			"AR"
  		]
  	},
  	"America/Argentina/Rio_Gallegos": {
  		u: -180,
  		c: [
  			"AR"
  		]
  	},
  	"America/Argentina/Salta": {
  		u: -180,
  		c: [
  			"AR"
  		]
  	},
  	"America/Argentina/San_Juan": {
  		u: -180,
  		c: [
  			"AR"
  		]
  	},
  	"America/Argentina/San_Luis": {
  		u: -180,
  		c: [
  			"AR"
  		]
  	},
  	"America/Argentina/Tucuman": {
  		u: -180,
  		c: [
  			"AR"
  		]
  	},
  	"America/Argentina/Ushuaia": {
  		u: -180,
  		c: [
  			"AR"
  		]
  	},
  	"America/Curacao": {
  		u: -240,
  		c: [
  			"CW"
  		]
  	},
  	"America/Asuncion": {
  		u: -240,
  		d: -180,
  		c: [
  			"PY"
  		]
  	},
  	"America/Atikokan": {
  		u: -300,
  		c: [
  			"CA"
  		]
  	},
  	"America/Bahia_Banderas": {
  		u: -360,
  		d: -300,
  		c: [
  			"MX"
  		]
  	},
  	"America/Bahia": {
  		u: -180,
  		c: [
  			"BR"
  		]
  	},
  	"America/Barbados": {
  		u: -240,
  		c: [
  			"BB"
  		]
  	},
  	"America/Belem": {
  		u: -180,
  		c: [
  			"BR"
  		]
  	},
  	"America/Belize": {
  		u: -360,
  		c: [
  			"BZ"
  		]
  	},
  	"America/Blanc-Sablon": {
  		u: -240,
  		c: [
  			"CA"
  		]
  	},
  	"America/Boa_Vista": {
  		u: -240,
  		c: [
  			"BR"
  		]
  	},
  	"America/Bogota": {
  		u: -300,
  		c: [
  			"CO"
  		]
  	},
  	"America/Boise": {
  		u: -420,
  		d: -360,
  		c: [
  			"US"
  		]
  	},
  	"America/Cambridge_Bay": {
  		u: -420,
  		d: -360,
  		c: [
  			"CA"
  		]
  	},
  	"America/Campo_Grande": {
  		u: -240,
  		c: [
  			"BR"
  		]
  	},
  	"America/Cancun": {
  		u: -300,
  		c: [
  			"MX"
  		]
  	},
  	"America/Caracas": {
  		u: -240,
  		c: [
  			"VE"
  		]
  	},
  	"America/Cayenne": {
  		u: -180,
  		c: [
  			"GF"
  		]
  	},
  	"America/Panama": {
  		u: -300,
  		c: [
  			"PA"
  		]
  	},
  	"America/Chicago": {
  		u: -360,
  		d: -300,
  		c: [
  			"US"
  		]
  	},
  	"America/Chihuahua": {
  		u: -420,
  		d: -360,
  		c: [
  			"MX"
  		]
  	},
  	"America/Costa_Rica": {
  		u: -360,
  		c: [
  			"CR"
  		]
  	},
  	"America/Creston": {
  		u: -420,
  		c: [
  			"CA"
  		]
  	},
  	"America/Cuiaba": {
  		u: -240,
  		c: [
  			"BR"
  		]
  	},
  	"America/Danmarkshavn": {
  		u: 0,
  		c: [
  			"GL"
  		]
  	},
  	"America/Dawson_Creek": {
  		u: -420,
  		c: [
  			"CA"
  		]
  	},
  	"America/Dawson": {
  		u: -420,
  		c: [
  			"CA"
  		]
  	},
  	"America/Denver": {
  		u: -420,
  		d: -360,
  		c: [
  			"US"
  		]
  	},
  	"America/Detroit": {
  		u: -300,
  		d: -240,
  		c: [
  			"US"
  		]
  	},
  	"America/Edmonton": {
  		u: -420,
  		d: -360,
  		c: [
  			"CA"
  		]
  	},
  	"America/Eirunepe": {
  		u: -300,
  		c: [
  			"BR"
  		]
  	},
  	"America/El_Salvador": {
  		u: -360,
  		c: [
  			"SV"
  		]
  	},
  	"America/Tijuana": {
  		u: -480,
  		d: -420,
  		c: [
  			"MX"
  		]
  	},
  	"America/Fort_Nelson": {
  		u: -420,
  		c: [
  			"CA"
  		]
  	},
  	"America/Fortaleza": {
  		u: -180,
  		c: [
  			"BR"
  		]
  	},
  	"America/Glace_Bay": {
  		u: -240,
  		d: -180,
  		c: [
  			"CA"
  		]
  	},
  	"America/Goose_Bay": {
  		u: -240,
  		d: -180,
  		c: [
  			"CA"
  		]
  	},
  	"America/Grand_Turk": {
  		u: -300,
  		d: -240,
  		c: [
  			"TC"
  		]
  	},
  	"America/Guatemala": {
  		u: -360,
  		c: [
  			"GT"
  		]
  	},
  	"America/Guayaquil": {
  		u: -300,
  		c: [
  			"EC"
  		]
  	},
  	"America/Guyana": {
  		u: -240,
  		c: [
  			"GY"
  		]
  	},
  	"America/Halifax": {
  		u: -240,
  		d: -180,
  		c: [
  			"CA"
  		]
  	},
  	"America/Havana": {
  		u: -300,
  		d: -240,
  		c: [
  			"CU"
  		]
  	},
  	"America/Hermosillo": {
  		u: -420,
  		c: [
  			"MX"
  		]
  	},
  	"America/Indiana/Knox": {
  		u: -360,
  		d: -300,
  		c: [
  			"US"
  		]
  	},
  	"America/Indiana/Marengo": {
  		u: -300,
  		d: -240,
  		c: [
  			"US"
  		]
  	},
  	"America/Indiana/Petersburg": {
  		u: -300,
  		d: -240,
  		c: [
  			"US"
  		]
  	},
  	"America/Indiana/Tell_City": {
  		u: -360,
  		d: -300,
  		c: [
  			"US"
  		]
  	},
  	"America/Indiana/Vevay": {
  		u: -300,
  		d: -240,
  		c: [
  			"US"
  		]
  	},
  	"America/Indiana/Vincennes": {
  		u: -300,
  		d: -240,
  		c: [
  			"US"
  		]
  	},
  	"America/Indiana/Winamac": {
  		u: -300,
  		d: -240,
  		c: [
  			"US"
  		]
  	},
  	"America/Inuvik": {
  		u: -420,
  		d: -360,
  		c: [
  			"CA"
  		]
  	},
  	"America/Iqaluit": {
  		u: -300,
  		d: -240,
  		c: [
  			"CA"
  		]
  	},
  	"America/Jamaica": {
  		u: -300,
  		c: [
  			"JM"
  		]
  	},
  	"America/Juneau": {
  		u: -540,
  		d: -480,
  		c: [
  			"US"
  		]
  	},
  	"America/Kentucky/Louisville": {
  		u: -300,
  		d: -240,
  		c: [
  			"US"
  		]
  	},
  	"America/Kentucky/Monticello": {
  		u: -300,
  		d: -240,
  		c: [
  			"US"
  		]
  	},
  	"America/La_Paz": {
  		u: -240,
  		c: [
  			"BO"
  		]
  	},
  	"America/Lima": {
  		u: -300,
  		c: [
  			"PE"
  		]
  	},
  	"America/Los_Angeles": {
  		u: -480,
  		d: -420,
  		c: [
  			"US"
  		]
  	},
  	"America/Maceio": {
  		u: -180,
  		c: [
  			"BR"
  		]
  	},
  	"America/Managua": {
  		u: -360,
  		c: [
  			"NI"
  		]
  	},
  	"America/Manaus": {
  		u: -240,
  		c: [
  			"BR"
  		]
  	},
  	"America/Martinique": {
  		u: -240,
  		c: [
  			"MQ"
  		]
  	},
  	"America/Matamoros": {
  		u: -360,
  		d: -300,
  		c: [
  			"MX"
  		]
  	},
  	"America/Mazatlan": {
  		u: -420,
  		d: -360,
  		c: [
  			"MX"
  		]
  	},
  	"America/Menominee": {
  		u: -360,
  		d: -300,
  		c: [
  			"US"
  		]
  	},
  	"America/Merida": {
  		u: -360,
  		d: -300,
  		c: [
  			"MX"
  		]
  	},
  	"America/Metlakatla": {
  		u: -540,
  		d: -480,
  		c: [
  			"US"
  		]
  	},
  	"America/Mexico_City": {
  		u: -360,
  		d: -300,
  		c: [
  			"MX"
  		]
  	},
  	"America/Miquelon": {
  		u: -180,
  		d: -120,
  		c: [
  			"PM"
  		]
  	},
  	"America/Moncton": {
  		u: -240,
  		d: -180,
  		c: [
  			"CA"
  		]
  	},
  	"America/Monterrey": {
  		u: -360,
  		d: -300,
  		c: [
  			"MX"
  		]
  	},
  	"America/Montevideo": {
  		u: -180,
  		c: [
  			"UY"
  		]
  	},
  	"America/Toronto": {
  		u: -300,
  		d: -240,
  		c: [
  			"CA"
  		]
  	},
  	"America/Nassau": {
  		u: -300,
  		d: -240,
  		c: [
  			"BS"
  		]
  	},
  	"America/New_York": {
  		u: -300,
  		d: -240,
  		c: [
  			"US"
  		]
  	},
  	"America/Nipigon": {
  		u: -300,
  		d: -240,
  		c: [
  			"CA"
  		]
  	},
  	"America/Nome": {
  		u: -540,
  		d: -480,
  		c: [
  			"US"
  		]
  	},
  	"America/Noronha": {
  		u: -120,
  		c: [
  			"BR"
  		]
  	},
  	"America/North_Dakota/Beulah": {
  		u: -360,
  		d: -300,
  		c: [
  			"US"
  		]
  	},
  	"America/North_Dakota/Center": {
  		u: -360,
  		d: -300,
  		c: [
  			"US"
  		]
  	},
  	"America/North_Dakota/New_Salem": {
  		u: -360,
  		d: -300,
  		c: [
  			"US"
  		]
  	},
  	"America/Ojinaga": {
  		u: -420,
  		d: -360,
  		c: [
  			"MX"
  		]
  	},
  	"America/Pangnirtung": {
  		u: -300,
  		d: -240,
  		c: [
  			"CA"
  		]
  	},
  	"America/Paramaribo": {
  		u: -180,
  		c: [
  			"SR"
  		]
  	},
  	"America/Phoenix": {
  		u: -420,
  		c: [
  			"US"
  		]
  	},
  	"America/Port-au-Prince": {
  		u: -300,
  		d: -240,
  		c: [
  			"HT"
  		]
  	},
  	"America/Rio_Branco": {
  		u: -300,
  		c: [
  			"BR"
  		]
  	},
  	"America/Porto_Velho": {
  		u: -240,
  		c: [
  			"BR"
  		]
  	},
  	"America/Puerto_Rico": {
  		u: -240,
  		c: [
  			"PR"
  		]
  	},
  	"America/Punta_Arenas": {
  		u: -180,
  		c: [
  			"CL"
  		]
  	},
  	"America/Rainy_River": {
  		u: -360,
  		d: -300,
  		c: [
  			"CA"
  		]
  	},
  	"America/Rankin_Inlet": {
  		u: -360,
  		d: -300,
  		c: [
  			"CA"
  		]
  	},
  	"America/Recife": {
  		u: -180,
  		c: [
  			"BR"
  		]
  	},
  	"America/Regina": {
  		u: -360,
  		c: [
  			"CA"
  		]
  	},
  	"America/Resolute": {
  		u: -360,
  		d: -300,
  		c: [
  			"CA"
  		]
  	},
  	"America/Santarem": {
  		u: -180,
  		c: [
  			"BR"
  		]
  	},
  	"America/Santiago": {
  		u: -240,
  		d: -180,
  		c: [
  			"CL"
  		]
  	},
  	"America/Santo_Domingo": {
  		u: -240,
  		c: [
  			"DO"
  		]
  	},
  	"America/Sao_Paulo": {
  		u: -180,
  		c: [
  			"BR"
  		]
  	},
  	"America/Scoresbysund": {
  		u: -60,
  		d: 0,
  		c: [
  			"GL"
  		]
  	},
  	"America/Sitka": {
  		u: -540,
  		d: -480,
  		c: [
  			"US"
  		]
  	},
  	"America/St_Johns": {
  		u: -210,
  		d: -150,
  		c: [
  			"CA"
  		]
  	},
  	"America/Swift_Current": {
  		u: -360,
  		c: [
  			"CA"
  		]
  	},
  	"America/Tegucigalpa": {
  		u: -360,
  		c: [
  			"HN"
  		]
  	},
  	"America/Thule": {
  		u: -240,
  		d: -180,
  		c: [
  			"GL"
  		]
  	},
  	"America/Thunder_Bay": {
  		u: -300,
  		d: -240,
  		c: [
  			"CA"
  		]
  	},
  	"America/Vancouver": {
  		u: -480,
  		d: -420,
  		c: [
  			"CA"
  		]
  	},
  	"America/Whitehorse": {
  		u: -420,
  		c: [
  			"CA"
  		]
  	},
  	"America/Winnipeg": {
  		u: -360,
  		d: -300,
  		c: [
  			"CA"
  		]
  	},
  	"America/Yakutat": {
  		u: -540,
  		d: -480,
  		c: [
  			"US"
  		]
  	},
  	"America/Yellowknife": {
  		u: -420,
  		d: -360,
  		c: [
  			"CA"
  		]
  	},
  	"Antarctica/Casey": {
  		u: 660,
  		c: [
  			"AQ"
  		]
  	},
  	"Antarctica/Davis": {
  		u: 420,
  		c: [
  			"AQ"
  		]
  	},
  	"Antarctica/DumontDUrville": {
  		u: 600,
  		c: [
  			"AQ"
  		]
  	},
  	"Antarctica/Macquarie": {
  		u: 600,
  		d: 660,
  		c: [
  			"AU"
  		]
  	},
  	"Antarctica/Mawson": {
  		u: 300,
  		c: [
  			"AQ"
  		]
  	},
  	"Pacific/Auckland": {
  		u: 720,
  		d: 780,
  		c: [
  			"NZ",
  			"AQ"
  		]
  	},
  	"Antarctica/Palmer": {
  		u: -180,
  		c: [
  			"AQ"
  		]
  	},
  	"Antarctica/Rothera": {
  		u: -180,
  		c: [
  			"AQ"
  		]
  	},
  	"Antarctica/Syowa": {
  		u: 180,
  		c: [
  			"AQ"
  		]
  	},
  	"Antarctica/Troll": {
  		u: 0,
  		d: 120,
  		c: [
  			"AQ"
  		]
  	},
  	"Antarctica/Vostok": {
  		u: 360,
  		c: [
  			"AQ"
  		]
  	},
  	"Europe/Oslo": {
  		u: 60,
  		d: 120,
  		c: [
  			"NO",
  			"BV"
  		]
  	},
  	"Asia/Riyadh": {
  		u: 180,
  		c: [
  			"SA"
  		]
  	},
  	"Asia/Almaty": {
  		u: 360,
  		c: [
  			"KZ"
  		]
  	},
  	"Asia/Amman": {
  		u: 120,
  		d: 180,
  		c: [
  			"JO"
  		]
  	},
  	"Asia/Anadyr": {
  		u: 720,
  		c: [
  			"RU"
  		]
  	},
  	"Asia/Aqtau": {
  		u: 300,
  		c: [
  			"KZ"
  		]
  	},
  	"Asia/Aqtobe": {
  		u: 300,
  		c: [
  			"KZ"
  		]
  	},
  	"Asia/Ashgabat": {
  		u: 300,
  		c: [
  			"TM"
  		]
  	},
  	"Asia/Atyrau": {
  		u: 300,
  		c: [
  			"KZ"
  		]
  	},
  	"Asia/Baghdad": {
  		u: 180,
  		c: [
  			"IQ"
  		]
  	},
  	"Asia/Qatar": {
  		u: 180,
  		c: [
  			"QA",
  			"BH"
  		]
  	},
  	"Asia/Baku": {
  		u: 240,
  		c: [
  			"AZ"
  		]
  	},
  	"Asia/Bangkok": {
  		u: 420,
  		c: [
  			"TH"
  		]
  	},
  	"Asia/Barnaul": {
  		u: 420,
  		c: [
  			"RU"
  		]
  	},
  	"Asia/Beirut": {
  		u: 120,
  		d: 180,
  		c: [
  			"LB"
  		]
  	},
  	"Asia/Bishkek": {
  		u: 360,
  		c: [
  			"KG"
  		]
  	},
  	"Asia/Brunei": {
  		u: 480,
  		c: [
  			"BN"
  		]
  	},
  	"Asia/Kolkata": {
  		u: 330,
  		c: [
  			"IN"
  		]
  	},
  	"Asia/Chita": {
  		u: 540,
  		c: [
  			"RU"
  		]
  	},
  	"Asia/Choibalsan": {
  		u: 480,
  		c: [
  			"MN"
  		]
  	},
  	"Asia/Shanghai": {
  		u: 480,
  		c: [
  			"CN"
  		]
  	},
  	"Asia/Colombo": {
  		u: 330,
  		c: [
  			"LK"
  		]
  	},
  	"Asia/Dhaka": {
  		u: 360,
  		c: [
  			"BD"
  		]
  	},
  	"Asia/Damascus": {
  		u: 120,
  		d: 180,
  		c: [
  			"SY"
  		]
  	},
  	"Asia/Dili": {
  		u: 540,
  		c: [
  			"TL"
  		]
  	},
  	"Asia/Dubai": {
  		u: 240,
  		c: [
  			"AE"
  		]
  	},
  	"Asia/Dushanbe": {
  		u: 300,
  		c: [
  			"TJ"
  		]
  	},
  	"Asia/Famagusta": {
  		u: 120,
  		d: 180,
  		c: [
  			"CY"
  		]
  	},
  	"Asia/Gaza": {
  		u: 120,
  		d: 180,
  		c: [
  			"PS"
  		]
  	},
  	"Asia/Hebron": {
  		u: 120,
  		d: 180,
  		c: [
  			"PS"
  		]
  	},
  	"Asia/Ho_Chi_Minh": {
  		u: 420,
  		c: [
  			"VN"
  		]
  	},
  	"Asia/Hong_Kong": {
  		u: 480,
  		c: [
  			"HK"
  		]
  	},
  	"Asia/Hovd": {
  		u: 420,
  		c: [
  			"MN"
  		]
  	},
  	"Asia/Irkutsk": {
  		u: 480,
  		c: [
  			"RU"
  		]
  	},
  	"Europe/Istanbul": {
  		u: 180,
  		c: [
  			"TR"
  		]
  	},
  	"Asia/Jakarta": {
  		u: 420,
  		c: [
  			"ID"
  		]
  	},
  	"Asia/Jayapura": {
  		u: 540,
  		c: [
  			"ID"
  		]
  	},
  	"Asia/Jerusalem": {
  		u: 120,
  		d: 180,
  		c: [
  			"IL"
  		]
  	},
  	"Asia/Kabul": {
  		u: 270,
  		c: [
  			"AF"
  		]
  	},
  	"Asia/Kamchatka": {
  		u: 720,
  		c: [
  			"RU"
  		]
  	},
  	"Asia/Karachi": {
  		u: 300,
  		c: [
  			"PK"
  		]
  	},
  	"Asia/Urumqi": {
  		u: 360,
  		c: [
  			"CN"
  		]
  	},
  	"Asia/Kathmandu": {
  		u: 345,
  		c: [
  			"NP"
  		]
  	},
  	"Asia/Khandyga": {
  		u: 540,
  		c: [
  			"RU"
  		]
  	},
  	"Asia/Krasnoyarsk": {
  		u: 420,
  		c: [
  			"RU"
  		]
  	},
  	"Asia/Kuala_Lumpur": {
  		u: 480,
  		c: [
  			"MY"
  		]
  	},
  	"Asia/Kuching": {
  		u: 480,
  		c: [
  			"MY"
  		]
  	},
  	"Asia/Macau": {
  		u: 480,
  		c: [
  			"MO"
  		]
  	},
  	"Asia/Magadan": {
  		u: 660,
  		c: [
  			"RU"
  		]
  	},
  	"Asia/Makassar": {
  		u: 480,
  		c: [
  			"ID"
  		]
  	},
  	"Asia/Manila": {
  		u: 480,
  		c: [
  			"PH"
  		]
  	},
  	"Asia/Nicosia": {
  		u: 120,
  		d: 180,
  		c: [
  			"CY"
  		]
  	},
  	"Asia/Novokuznetsk": {
  		u: 420,
  		c: [
  			"RU"
  		]
  	},
  	"Asia/Novosibirsk": {
  		u: 420,
  		c: [
  			"RU"
  		]
  	},
  	"Asia/Omsk": {
  		u: 360,
  		c: [
  			"RU"
  		]
  	},
  	"Asia/Oral": {
  		u: 300,
  		c: [
  			"KZ"
  		]
  	},
  	"Asia/Pontianak": {
  		u: 420,
  		c: [
  			"ID"
  		]
  	},
  	"Asia/Pyongyang": {
  		u: 540,
  		c: [
  			"KP"
  		]
  	},
  	"Asia/Qostanay": {
  		u: 360,
  		c: [
  			"KZ"
  		]
  	},
  	"Asia/Qyzylorda": {
  		u: 300,
  		c: [
  			"KZ"
  		]
  	},
  	"Asia/Sakhalin": {
  		u: 660,
  		c: [
  			"RU"
  		]
  	},
  	"Asia/Samarkand": {
  		u: 300,
  		c: [
  			"UZ"
  		]
  	},
  	"Asia/Seoul": {
  		u: 540,
  		c: [
  			"KR"
  		]
  	},
  	"Asia/Srednekolymsk": {
  		u: 660,
  		c: [
  			"RU"
  		]
  	},
  	"Asia/Taipei": {
  		u: 480,
  		c: [
  			"TW"
  		]
  	},
  	"Asia/Tashkent": {
  		u: 300,
  		c: [
  			"UZ"
  		]
  	},
  	"Asia/Tbilisi": {
  		u: 240,
  		c: [
  			"GE"
  		]
  	},
  	"Asia/Tehran": {
  		u: 210,
  		d: 270,
  		c: [
  			"IR"
  		]
  	},
  	"Asia/Thimphu": {
  		u: 360,
  		c: [
  			"BT"
  		]
  	},
  	"Asia/Tokyo": {
  		u: 540,
  		c: [
  			"JP"
  		]
  	},
  	"Asia/Tomsk": {
  		u: 420,
  		c: [
  			"RU"
  		]
  	},
  	"Asia/Ulaanbaatar": {
  		u: 480,
  		c: [
  			"MN"
  		]
  	},
  	"Asia/Ust-Nera": {
  		u: 600,
  		c: [
  			"RU"
  		]
  	},
  	"Asia/Vladivostok": {
  		u: 600,
  		c: [
  			"RU"
  		]
  	},
  	"Asia/Yakutsk": {
  		u: 540,
  		c: [
  			"RU"
  		]
  	},
  	"Asia/Yekaterinburg": {
  		u: 300,
  		c: [
  			"RU"
  		]
  	},
  	"Asia/Yerevan": {
  		u: 240,
  		c: [
  			"AM"
  		]
  	},
  	"Atlantic/Azores": {
  		u: -60,
  		d: 0,
  		c: [
  			"PT"
  		]
  	},
  	"Atlantic/Bermuda": {
  		u: -240,
  		d: -180,
  		c: [
  			"BM"
  		]
  	},
  	"Atlantic/Canary": {
  		u: 0,
  		d: 60,
  		c: [
  			"ES"
  		]
  	},
  	"Atlantic/Cape_Verde": {
  		u: -60,
  		c: [
  			"CV"
  		]
  	},
  	"Atlantic/Faroe": {
  		u: 0,
  		d: 60,
  		c: [
  			"FO"
  		]
  	},
  	"Atlantic/Madeira": {
  		u: 0,
  		d: 60,
  		c: [
  			"PT"
  		]
  	},
  	"Atlantic/Reykjavik": {
  		u: 0,
  		c: [
  			"IS"
  		]
  	},
  	"Atlantic/South_Georgia": {
  		u: -120,
  		c: [
  			"GS"
  		]
  	},
  	"Atlantic/Stanley": {
  		u: -180,
  		c: [
  			"FK"
  		]
  	},
  	"Australia/Sydney": {
  		u: 600,
  		d: 660,
  		c: [
  			"AU"
  		]
  	},
  	"Australia/Adelaide": {
  		u: 570,
  		d: 630,
  		c: [
  			"AU"
  		]
  	},
  	"Australia/Brisbane": {
  		u: 600,
  		c: [
  			"AU"
  		]
  	},
  	"Australia/Broken_Hill": {
  		u: 570,
  		d: 630,
  		c: [
  			"AU"
  		]
  	},
  	"Australia/Hobart": {
  		u: 600,
  		d: 660,
  		c: [
  			"AU"
  		]
  	},
  	"Australia/Darwin": {
  		u: 570,
  		c: [
  			"AU"
  		]
  	},
  	"Australia/Eucla": {
  		u: 525,
  		c: [
  			"AU"
  		]
  	},
  	"Australia/Lord_Howe": {
  		u: 630,
  		d: 660,
  		c: [
  			"AU"
  		]
  	},
  	"Australia/Lindeman": {
  		u: 600,
  		c: [
  			"AU"
  		]
  	},
  	"Australia/Melbourne": {
  		u: 600,
  		d: 660,
  		c: [
  			"AU"
  		]
  	},
  	"Australia/Perth": {
  		u: 480,
  		c: [
  			"AU"
  		]
  	},
  	CET: {
  		u: 60,
  		d: 120
  	},
  	"Pacific/Easter": {
  		u: -360,
  		d: -300,
  		c: [
  			"CL"
  		]
  	},
  	CST6CDT: {
  		u: -360,
  		d: -300
  	},
  	EET: {
  		u: 120,
  		d: 180
  	},
  	"Europe/Dublin": {
  		u: 0,
  		d: 60,
  		c: [
  			"IE"
  		]
  	},
  	EST: {
  		u: -300
  	},
  	EST5EDT: {
  		u: -300,
  		d: -240
  	},
  	"Etc/GMT-0": {
  		u: 0
  	},
  	"Etc/GMT-1": {
  		u: 60
  	},
  	"Pacific/Port_Moresby": {
  		u: 600,
  		c: [
  			"PG"
  		]
  	},
  	"Etc/GMT-11": {
  		u: 660
  	},
  	"Pacific/Tarawa": {
  		u: 720,
  		c: [
  			"KI"
  		]
  	},
  	"Etc/GMT-13": {
  		u: 780
  	},
  	"Etc/GMT-14": {
  		u: 840
  	},
  	"Etc/GMT-2": {
  		u: 120
  	},
  	"Etc/GMT-3": {
  		u: 180
  	},
  	"Etc/GMT-4": {
  		u: 240
  	},
  	"Etc/GMT-5": {
  		u: 300
  	},
  	"Etc/GMT-6": {
  		u: 360
  	},
  	"Indian/Christmas": {
  		u: 420,
  		c: [
  			"CX"
  		]
  	},
  	"Etc/GMT-8": {
  		u: 480
  	},
  	"Pacific/Palau": {
  		u: 540,
  		c: [
  			"PW"
  		]
  	},
  	"Etc/GMT+1": {
  		u: -60
  	},
  	"Etc/GMT+10": {
  		u: -600
  	},
  	"Etc/GMT+11": {
  		u: -660
  	},
  	"Etc/GMT+12": {
  		u: -720
  	},
  	"Etc/GMT+3": {
  		u: -180
  	},
  	"Etc/GMT+4": {
  		u: -240
  	},
  	"Etc/GMT+5": {
  		u: -300
  	},
  	"Etc/GMT+6": {
  		u: -360
  	},
  	"Etc/GMT+7": {
  		u: -420
  	},
  	"Etc/GMT+8": {
  		u: -480
  	},
  	"Etc/GMT+9": {
  		u: -540
  	},
  	"Etc/UTC": {
  		u: 0
  	},
  	"Europe/Amsterdam": {
  		u: 60,
  		d: 120,
  		c: [
  			"NL"
  		]
  	},
  	"Europe/Andorra": {
  		u: 60,
  		d: 120,
  		c: [
  			"AD"
  		]
  	},
  	"Europe/Astrakhan": {
  		u: 240,
  		c: [
  			"RU"
  		]
  	},
  	"Europe/Athens": {
  		u: 120,
  		d: 180,
  		c: [
  			"GR"
  		]
  	},
  	"Europe/London": {
  		u: 0,
  		d: 60,
  		c: [
  			"GB",
  			"GG",
  			"IM",
  			"JE"
  		]
  	},
  	"Europe/Belgrade": {
  		u: 60,
  		d: 120,
  		c: [
  			"RS",
  			"BA",
  			"HR",
  			"ME",
  			"MK",
  			"SI"
  		]
  	},
  	"Europe/Berlin": {
  		u: 60,
  		d: 120,
  		c: [
  			"DE"
  		]
  	},
  	"Europe/Prague": {
  		u: 60,
  		d: 120,
  		c: [
  			"CZ",
  			"SK"
  		]
  	},
  	"Europe/Brussels": {
  		u: 60,
  		d: 120,
  		c: [
  			"BE"
  		]
  	},
  	"Europe/Bucharest": {
  		u: 120,
  		d: 180,
  		c: [
  			"RO"
  		]
  	},
  	"Europe/Budapest": {
  		u: 60,
  		d: 120,
  		c: [
  			"HU"
  		]
  	},
  	"Europe/Zurich": {
  		u: 60,
  		d: 120,
  		c: [
  			"CH",
  			"DE",
  			"LI"
  		]
  	},
  	"Europe/Chisinau": {
  		u: 120,
  		d: 180,
  		c: [
  			"MD"
  		]
  	},
  	"Europe/Copenhagen": {
  		u: 60,
  		d: 120,
  		c: [
  			"DK"
  		]
  	},
  	"Europe/Gibraltar": {
  		u: 60,
  		d: 120,
  		c: [
  			"GI"
  		]
  	},
  	"Europe/Helsinki": {
  		u: 120,
  		d: 180,
  		c: [
  			"FI",
  			"AX"
  		]
  	},
  	"Europe/Kaliningrad": {
  		u: 120,
  		c: [
  			"RU"
  		]
  	},
  	"Europe/Kiev": {
  		u: 120,
  		d: 180,
  		c: [
  			"UA"
  		]
  	},
  	"Europe/Kirov": {
  		u: 180,
  		c: [
  			"RU"
  		]
  	},
  	"Europe/Lisbon": {
  		u: 0,
  		d: 60,
  		c: [
  			"PT"
  		]
  	},
  	"Europe/Luxembourg": {
  		u: 60,
  		d: 120,
  		c: [
  			"LU"
  		]
  	},
  	"Europe/Madrid": {
  		u: 60,
  		d: 120,
  		c: [
  			"ES"
  		]
  	},
  	"Europe/Malta": {
  		u: 60,
  		d: 120,
  		c: [
  			"MT"
  		]
  	},
  	"Europe/Minsk": {
  		u: 180,
  		c: [
  			"BY"
  		]
  	},
  	"Europe/Monaco": {
  		u: 60,
  		d: 120,
  		c: [
  			"MC"
  		]
  	},
  	"Europe/Moscow": {
  		u: 180,
  		c: [
  			"RU"
  		]
  	},
  	"Europe/Paris": {
  		u: 60,
  		d: 120,
  		c: [
  			"FR"
  		]
  	},
  	"Europe/Riga": {
  		u: 120,
  		d: 180,
  		c: [
  			"LV"
  		]
  	},
  	"Europe/Rome": {
  		u: 60,
  		d: 120,
  		c: [
  			"IT",
  			"SM",
  			"VA"
  		]
  	},
  	"Europe/Samara": {
  		u: 240,
  		c: [
  			"RU"
  		]
  	},
  	"Europe/Saratov": {
  		u: 240,
  		c: [
  			"RU"
  		]
  	},
  	"Europe/Simferopol": {
  		u: 180,
  		c: [
  			"RU",
  			"UA"
  		]
  	},
  	"Europe/Sofia": {
  		u: 120,
  		d: 180,
  		c: [
  			"BG"
  		]
  	},
  	"Europe/Stockholm": {
  		u: 60,
  		d: 120,
  		c: [
  			"SE"
  		]
  	},
  	"Europe/Tallinn": {
  		u: 120,
  		d: 180,
  		c: [
  			"EE"
  		]
  	},
  	"Europe/Tirane": {
  		u: 60,
  		d: 120,
  		c: [
  			"AL"
  		]
  	},
  	"Europe/Ulyanovsk": {
  		u: 240,
  		c: [
  			"RU"
  		]
  	},
  	"Europe/Uzhgorod": {
  		u: 120,
  		d: 180,
  		c: [
  			"UA"
  		]
  	},
  	"Europe/Vienna": {
  		u: 60,
  		d: 120,
  		c: [
  			"AT"
  		]
  	},
  	"Europe/Vilnius": {
  		u: 120,
  		d: 180,
  		c: [
  			"LT"
  		]
  	},
  	"Europe/Volgograd": {
  		u: 180,
  		c: [
  			"RU"
  		]
  	},
  	"Europe/Warsaw": {
  		u: 60,
  		d: 120,
  		c: [
  			"PL"
  		]
  	},
  	"Europe/Zaporozhye": {
  		u: 120,
  		d: 180,
  		c: [
  			"UA"
  		]
  	},
  	HST: {
  		u: -600
  	},
  	"Indian/Chagos": {
  		u: 360,
  		c: [
  			"IO"
  		]
  	},
  	"Indian/Cocos": {
  		u: 390,
  		c: [
  			"CC"
  		]
  	},
  	"Indian/Kerguelen": {
  		u: 300,
  		c: [
  			"TF",
  			"HM"
  		]
  	},
  	"Indian/Mahe": {
  		u: 240,
  		c: [
  			"SC"
  		]
  	},
  	"Indian/Maldives": {
  		u: 300,
  		c: [
  			"MV"
  		]
  	},
  	"Indian/Mauritius": {
  		u: 240,
  		c: [
  			"MU"
  		]
  	},
  	"Indian/Reunion": {
  		u: 240,
  		c: [
  			"RE"
  		]
  	},
  	"Pacific/Kwajalein": {
  		u: 720,
  		c: [
  			"MH"
  		]
  	},
  	MET: {
  		u: 60,
  		d: 120
  	},
  	MST: {
  		u: -420
  	},
  	MST7MDT: {
  		u: -420,
  		d: -360
  	},
  	"Pacific/Chatham": {
  		u: 765,
  		d: 825,
  		c: [
  			"NZ"
  		]
  	},
  	"Pacific/Apia": {
  		u: 780,
  		d: 840,
  		c: [
  			"WS"
  		]
  	},
  	"Pacific/Bougainville": {
  		u: 660,
  		c: [
  			"PG"
  		]
  	},
  	"Pacific/Chuuk": {
  		u: 600,
  		c: [
  			"FM"
  		]
  	},
  	"Pacific/Efate": {
  		u: 660,
  		c: [
  			"VU"
  		]
  	},
  	"Pacific/Enderbury": {
  		u: 780,
  		c: [
  			"KI"
  		]
  	},
  	"Pacific/Fakaofo": {
  		u: 780,
  		c: [
  			"TK"
  		]
  	},
  	"Pacific/Fiji": {
  		u: 720,
  		d: 780,
  		c: [
  			"FJ"
  		]
  	},
  	"Pacific/Galapagos": {
  		u: -360,
  		c: [
  			"EC"
  		]
  	},
  	"Pacific/Gambier": {
  		u: -540,
  		c: [
  			"PF"
  		]
  	},
  	"Pacific/Guadalcanal": {
  		u: 660,
  		c: [
  			"SB"
  		]
  	},
  	"Pacific/Guam": {
  		u: 600,
  		c: [
  			"GU",
  			"MP"
  		]
  	},
  	"Pacific/Honolulu": {
  		u: -600,
  		c: [
  			"US",
  			"UM"
  		]
  	},
  	"Pacific/Kiritimati": {
  		u: 840,
  		c: [
  			"KI"
  		]
  	},
  	"Pacific/Kosrae": {
  		u: 660,
  		c: [
  			"FM"
  		]
  	},
  	"Pacific/Majuro": {
  		u: 720,
  		c: [
  			"MH"
  		]
  	},
  	"Pacific/Marquesas": {
  		u: -570,
  		c: [
  			"PF"
  		]
  	},
  	"Pacific/Pago_Pago": {
  		u: -660,
  		c: [
  			"AS",
  			"UM"
  		]
  	},
  	"Pacific/Nauru": {
  		u: 720,
  		c: [
  			"NR"
  		]
  	},
  	"Pacific/Niue": {
  		u: -660,
  		c: [
  			"NU"
  		]
  	},
  	"Pacific/Norfolk": {
  		u: 660,
  		d: 720,
  		c: [
  			"NF"
  		]
  	},
  	"Pacific/Noumea": {
  		u: 660,
  		c: [
  			"NC"
  		]
  	},
  	"Pacific/Pitcairn": {
  		u: -480,
  		c: [
  			"PN"
  		]
  	},
  	"Pacific/Pohnpei": {
  		u: 660,
  		c: [
  			"FM"
  		]
  	},
  	"Pacific/Rarotonga": {
  		u: -600,
  		c: [
  			"CK"
  		]
  	},
  	"Pacific/Tahiti": {
  		u: -600,
  		c: [
  			"PF"
  		]
  	},
  	"Pacific/Tongatapu": {
  		u: 780,
  		c: [
  			"TO"
  		]
  	},
  	PST8PDT: {
  		u: -480,
  		d: -420
  	},
  	WET: {
  		u: 0,
  		d: 60
  	}
  };
  var data = {
  	countries: countries$1,
  	timezones: timezones$1
  };

  var totalCountries = Object.keys(data.countries).length;
  var totalTimezones = Object.keys(data.timezones).length;
  var countries = {};
  var timezones = {};
  var memoizedCountries = 0;
  var memoizedTimezones = 0;
  function getAllCountries() {
    if (totalCountries !== memoizedCountries) Object.keys(data.countries).forEach(getCountry);
    return _objectSpread2({}, countries);
  }
  function getAllTimezones() {
    if (totalTimezones !== memoizedTimezones) Object.keys(data.timezones).forEach(getTimezone);
    return _objectSpread2({}, timezones);
  }
  function getCountry(id) {
    if (!countries[id]) memoizeCountry(buildCountry(data, id));
    return countries[id] ? _objectSpread2({}, countries[id]) : null;
  }

  function memoizeCountry(country) {
    if (!country) return;
    countries[country.id] = country;
    memoizedCountries = Object.keys(countries).length;
  }

  function getTimezone(name) {
    if (!timezones[name]) memoizeTimezone(buildTimezone(data, name));
    return timezones[name] ? _objectSpread2({}, timezones[name]) : null;
  }

  function memoizeTimezone(timezone) {
    if (!timezone) return;
    timezones[timezone.name] = timezone;
    memoizedTimezones = Object.keys(timezone).length;
  }

  function getCountriesForTimezone(tzName) {
    var timezone = getTimezone(tzName) || {};
    var countries = timezone.countries || [];
    return countries.map(getCountry);
  }
  function getCountryForTimezone(tzName) {
    var _getCountriesForTimez = getCountriesForTimezone(tzName),
        _getCountriesForTimez2 = _slicedToArray(_getCountriesForTimez, 1),
        main = _getCountriesForTimez2[0];

    return main || null;
  }
  function getTimezonesForCountry(countryId) {
    var country = getCountry(countryId);
    if (!country) return null;
    var _country$timezones = country.timezones,
        timezones = _country$timezones === void 0 ? [] : _country$timezones;
    return timezones.map(getTimezone);
  }

  exports.getAllCountries = getAllCountries;
  exports.getAllTimezones = getAllTimezones;
  exports.getCountriesForTimezone = getCountriesForTimezone;
  exports.getCountry = getCountry;
  exports.getCountryForTimezone = getCountryForTimezone;
  exports.getTimezone = getTimezone;
  exports.getTimezonesForCountry = getTimezonesForCountry;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.js.map
