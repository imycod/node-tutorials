## setup 

```cmd
npm init -y
npm i typescript -D
npx tsc --init
```

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "NodeNext",                          
    "moduleResolution": "NodeNext",
    "sourceMap": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*"]
}
```

```json
{
  "main": "dist/index.js",
  "type": "module",
  "scripts": {
    "dev": "tsc -w && node ./dist/index.js",
    "build": "tsc"
  },
}
```

```cmd
npm run serve
tsc -w & node ./dist/index.js
```

----

referece:

```
How to Setup Node.js with TypeScript in 2023
TypeScript with Node.js
How To Use TypeScript With Express & Node
OAuth (Passport.js) Tutorial #3 - Settingup an Express App
```