const { join } = require('path');
const { readFileSync, writeFileSync } = require('fs');
const djsDocs = JSON.parse(readFileSync(join(__dirname, '../interfaces/docs.json')).toString());

const djs = {};

djs.classes = djsDocs.classes.reduce((p, c) => {
	if (c.events instanceof Array) {
		c.events = c.events.reduce((p, c) => {
			p[c.name] = c;
			return p;
		}, {});
	}
	p[c.name] = c;
	return p;
}, {});

djs.interfaces = djsDocs.interfaces.reduce((p, c) => {
	p[c.name] = c;
	return p;
}, {});

djs.typedefs = djsDocs.typedefs.reduce((p, c) => {
	p[c.name] = c;
	return p;
}, {});

djs.externals = djsDocs.externals.reduce((p, c) => {
	p[c.name] = c;
	return p;
}, {});

writeFileSync(join(__dirname, '../interfaces/djs.json'), JSON.stringify(djs));