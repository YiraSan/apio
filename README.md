<div align="center">
  A powerful library for creating bilateral socket connections<br><br>
  <a href="https://www.npmjs.com/package/apio-utils">
    <img src="https://img.shields.io/npm/v/apio-utils?style=for-the-badge" alt="Version" />
  </a> 
  <a href="https://www.npmjs.com/package/apio-utils">
    <img src="https://img.shields.io/npm/dt/apio-utils?style=for-the-badge" alt="Downloads" />
  </a>
  <br />
</div>

# Contents Table

- [Introduction](#introduction)
- [Usage](#usage)
  - [Client](#client)
  - [Server](#server)
- [Our future](#our-future)

## Introduction

What is Apio ? 🤔 <br>
Apio is a powerful library to create easly any type of api, in a few minutes. <br>
Made in TypeScript, Apio is easily usable in any context of JavaScript, in TypeScript web, node.js web, classic node.js, or classic javascript! <br>
Install, import, create. That's easy. 

## Usage

TypeScript : 

```ts
import { Something... } from 'apio-utils';
```

NodeJS : 

```js
const { Something... } = require('apio-utils');
```

***

### Client

Object `Client` is the client api.

|Parameter|Type|Description|
|:-|:-|:-|
|config|[ClientConfig](#)|The configuration of the client|

TypeScript :

```ts
import { Client, ClientConfig } from 'apio-utils';

const config: ClientConfig = new ClientConfig({ port: 1000 });
const client: Client = new Client(config);
```

JavaScript :

```js
const { Client, ClientConfig } = require('apio-utils');

const config = new ClientConfig({ port: 1000 });
const client = new Client(config);
```

### .call(key: string, ...args?: any)
Call a request on the server.

- `key` : string [\*]
- `...args` : any

***

### Server

Object `Server` is the server api.

|Parameter|Type|Description|
|:-|:-|:-|
|config|[ClientConfig](#)|The configuration of the server|
|authContext|[Authentification](#)?|The authentification context of the server|

TypeScript :

```ts
import { Server, ServerConfig } from 'apio-utils';

const config: ServerConfig = new ServerConfig({ port: 1000 });
const server: Server = new Server(config);
```

JavaScript :

```js
const { Server, ServerConfig } = require('apio-utils');

const config = new ServerConfig({ port: 1000 });
const server = new Server(config);
```

### .register(...req: Request)
Register a request in the server.

- `...req` : Request [\*]

### .unregister(...req: Request)
Unregister a request in the server.

- `...req` : Request [\*]

### .users: User[]
Return array of connected users.

***

## Our Future

In writing.
