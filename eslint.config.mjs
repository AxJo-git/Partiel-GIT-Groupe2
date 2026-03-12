import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default [ 
 { 
   // On ajoute .jsx pour ton frontend React
   files: ["**/*.{js,mjs,cjs,jsx}"],    
   languageOptions: {        
       // On combine les globals Browser (front) et Node (back)
       globals: {
         ...globals.node,
         ...globals.browser
       },       
       ecmaVersion: "latest",       
       // C'EST ICI : On change pour "module"
       sourceType: "module" ,
       parserOptions: {
         ecmaFeatures: {
           jsx: true
         }
       },
   },    
   rules: { 
     "no-unused-vars": ["error", { "varsIgnorePattern": "React" }],
     "react/react-in-jsx-scope": "off", // Si tu utilises le plugin React
     "indent": ["error", 2], 
     "quotes": ["error", "single"], 
     "semi": ["error", "always"], 
     //"no-console": "warn", 
     //"no-unused-vars": "error"
     // 1. On passe les console en 'off' pour ne plus avoir de warnings
     'no-console': 'off', 
     // 2. On dit à 'no-unused-vars' d'ignorer la variable 'React'
     'no-unused-vars': ['error', { 'varsIgnorePattern': 'React' }]
     //'argsIgnorePattern': '^_',    // On ignore les arguments commençant par _
     //'caughtErrorsIgnorePattern': '^_'

   } 
 }, 
 js.configs.recommended 
];