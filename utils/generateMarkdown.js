function generateMarkdown(data) {
  return `
  
# ${data.title}

${data.license}

## Description
${data.description}

## Table Of Contents
* [Installation](#Installation)
* [Usage](#Usage)
* [Contributing](#Contributing)
* [Test](#Test)
* [Questions](#Questions)

## Installation
${data.installation}

## Usage
${data.usage}

## Contribute
${data.contribute}

## Test
${data.test}

## Questions
[![Repo Owner Image]${data.profilePicture}]
Email: ${data.email}

`;
}

module.exports = generateMarkdown;
