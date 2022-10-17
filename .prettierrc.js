module.exports = {
  printWidth: 120,
  tabWidth: 2,
  semi: true,
  trailingComma: "all",
  singleQuote: false,
  tailwindConfig: "./tailwind.config.js",
  plugins: [require("prettier-plugin-tailwindcss")],
};
