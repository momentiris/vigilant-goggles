export const regexes = [
	{
		trigger: 'ey',
		rx: /ai|ay|ey/gi,
		sub: 'ej',
	},
	{
		trigger: 'th',
		rx: /\bth/gi,
		sub: 't',
	},
	{
		trigger: 'ugh',
		rx: /ugh/gi,
		sub: 'f',
	},
	{
		trigger: 'ea',
		rx: /ea/gi,
		sub: 'ej',
	},
	{
		trigger: 'e-ending',
		rx: /\\b/gi,
		sub: '',
	},
	{
		trigger: 'eir',
		rx: /ei|ere|air/gi,
		sub: 'är',
	},
	{
		trigger: 'r',
		rx: /wr/gi,
		sub: 'r',
	},
	{
		trigger: 'ath_and_augh',
		rx: /ath|augh/gi,
		sub: 'äf',
	},
	{
		trigger: 'ake',
		rx: /ake/gi,
		sub: 'ejk',
	},
	{
		trigger: 'ee',
		rx: /ee/gi,
		sub: 'i',
	},
];
