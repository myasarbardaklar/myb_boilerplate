const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  sansSerif: ['Oswald', ...defaultTheme.fontFamily.sans],
  serif: ['Times New Roman', ...defaultTheme.fontFamily.serif],
  monospace: ['monospace', ...defaultTheme.fontFamily.mono],
  cursive: ['Charm', 'cursive']
};
