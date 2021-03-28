// SERVER =>

const { Server, ServerConfig, Request, Authentification, RolePermission } = require("./src");

// creating the server :

var config = new ServerConfig()
    .setPort(1000)
    .setTimeout(1500)
    .setAuthentification(true);
var authContext = new Authentification() // Create Context for authentification !
var server = new Server(config, authContext); // Add an authContext only if you have enable the authentification

// CLASSIC REQUEST

var helloworld = new Request("try", (data) => {
    console.log("hello world!")
    data.response()
})

server.register(helloworld) // register request !

// USERS & ROLES !

var rolePermission = new RolePermission().addPermission("*") // give all permission to the role !

authContext.setRole("admin", rolePermission); // create role admin

authContext.setUser("root", { // create a new user !
    "password": "root",
    "role": "admin"
})

// The server is ready to be used !

// CLIENT =>

const { Client, ClientConfig } = require('./src');

var config = new ClientConfig({ // ANOTHER WAY TO SET CONFIG /!\ The address is by default on "127.0.0.1" /!\ And username and password on "root, root" /!\
    "port": 1000,
    "timeout": 2000,
    "authentification": true,
    "login": { // Use only if authentification is true !
        "username": "root",
        "password": "root"
    }
})

var client = new Client(config)

client.call("try"); // console.log("hello world!") on the server !