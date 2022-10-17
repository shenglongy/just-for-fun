const isProduction = process.env.NODE_ENV === "production";
module.exports = {
  plugins: [
    require("postcss-preset-env"),
    require("tailwindcss")("./tailwind.config.js"),
    require("autoprefixer"),
    ...(isProduction
      ? [
          require("cssnano")({
            preset: "default",
          }),
        ]
      : []),
  ],
};
