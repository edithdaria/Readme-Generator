const generateMarkdown = require("./utils/generateMarkdown");
const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");


const questions = [
    {
        type: "input",
        name: "username",
        message: "GitHub Username: "
    },
    {
        type: "input",
        name: "title",
        message: "Title of your project: "
    },
    {
        type: "input",
        name: "description",
        message: "Description: "
    },
    {
        type: "input",
        name: "installation",
        message: "Installation: "
    },
    {
        type: "input",
        name: "usage",
        message: "Usage: "
    },
    {
        type: "list",
        name: "license",
        message: "License: ",
        choices: ["MIT", "GNU GPLv3"]
    },
    {
        type: "input",
        name: "contribute",
        message: "What are the requirements for contributing to this project: "
    },
    {
        type: "input",
        name: "test",
        message: "List of Tests: "
    },
    {
        type: "confirm",
        name: "includeProfilePicture",
        message: "Would you like Profile Picture to be displayed: ",
    },
    {
        type: "confirm",
        name: "includeEmail",
        message: "Provide Email: "
    },
    {
        type: "input",
        name: "email",
        message: "Email Address: ",
        when: function (res){
            return res.includeEmail;
        }
    }

];


init();

function promptUser() {
    return inquirer.prompt(questions);
}


function init() {
promptUser().then(function(a){
//console.log(a.includeProfilePicture);

    const data = {

        username: a.username,
        title: a.title,
        license: licenseBadge(a.license),
        description: a.description,
        installation: a.installation,
        usage: a.usage,
        contribute: a.contribute,
        test: a.test,
        profilePicture: profilePicture(a.includeProfilePicture, a.username),
        email: email(a.includeEmail, a.email)

    }

    

    const md = generateMarkdown(data);
    return writeToFile("README.md", md );
    
});

}

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err){
            console.log(err);
        }
        else {
        console.log("Successfully wrote readme file!");
        };
})
}


function licenseBadge(data){
    if(data === "MIT") {
        let badge = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
        //console.log(typeof badge);
        return badge;

    }
    else{
        return "[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
    }
}

function profilePicture(data, user){
    if (data === true) {
        return `![Repo Owner Image](https://avatars.githubusercontent.com/${user}?s=100)`;
    }
    
    else {
        return `[${user}](https://github.com/${user})`;
    }

}

function email(data, email){
    if (data === true) {
        return `or send an email to ${email}`;
    }
    
    else {
        return "";
    }

}



