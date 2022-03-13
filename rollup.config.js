import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import replace from "@rollup/plugin-replace";
import dotenv from "rollup-plugin-dotenv";
import image from "@rollup/plugin-image";
import babel from "@rollup/plugin-babel";
import scss from "rollup-plugin-scss";

const target = process.env.APP_DEV ? "development" : "production";

export default {
  input: "src/index.js",
  output: {
    file: "public/app.js",
  },
  plugins: [
    resolve({
      extensions: [".js"],
      browser: true,
    }),
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify(target),
    }),
    babel({
      babelHelpers: "bundled",
      presets: ["@babel/preset-react"],
    }),
    commonjs(),
    scss(target === "production" && { outputStyle: "compressed" }),
    image(),
    dotenv(),
    target === "production" && terser(),
  ],
};
