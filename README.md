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
https://console.cloud.google.com/  // google credentials
google oauth2 passport nodejs
How to Setup Node.js with TypeScript in 2023
TypeScript with Node.js
How To Use TypeScript With Express & Node
OAuth (Passport.js) Tutorial #3 - Settingup an Express App
Passport GoogleStrategy/FacebookStrategy “InternalOAuthError: Failed to obtain access token“ 解决方案

passport-oauth2/issues/59
```

.env
```
GOOGLE_CLIENT_ID = xx
GOOGLE_CLIENT_SECRET = xx
HTTP_PROXY = xx
```
1. 中国区需要设置代理 参见 passport-oauth2/issues/59 / googleStrategy._oauth2.setAgent(agent)
2. google credentials 设置GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET

process.env
    -- GOOGLE_CLIENT_ID
    -- GOOGLE_CLIENT_SECRET
    -- HTTP_PROXY
    -- MONGODB_URI
    -- 