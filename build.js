const fs = require('fs');

const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const postcssCustomProperties = require('postcss-custom-properties');
const postcssCalc = require('postcss-calc');
const csso = require('csso');

const source = fs.readFileSync('./source/main.css');
const processResult = postcss()
	.use(postcssCustomProperties())
	.use(postcssCalc())
	.use(autoprefixer())
	.process(source);

processResult.warnings().forEach((warning) => console.warn(warning.toString()));
fs.writeFileSync('./build/main.css', csso.minify(processResult.css).css);
