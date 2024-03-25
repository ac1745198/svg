const fs = require('fs');
const inquirer = require('inquirer');
const open = require('open');

// Function to prompt user for text input (up to three characters)
async function promptForText() {
    const userInput = await inquirer.prompt({
        type: 'input',
        name: 'text',
        message: 'Enter up to three characters:',
        validate: input => input.length <= 3 || 'Please enter up to three characters.'
    });

    return userInput.text;
}

// Function to prompt user for text color
async function promptForTextColor() {
    const userInput = await inquirer.prompt({
        type: 'input',
        name: 'color',
        message: 'Enter text color (keyword or hexadecimal):'
    });

    return userInput.color;
}

// Function to prompt user to choose a shape
async function promptForShape() {
    const userInput = await inquirer.prompt({
        type: 'list',
        name: 'shape',
        message: 'Choose a shape:',
        choices: ['circle', 'triangle', 'square']
    });

    return userInput.shape;
}

// Function to prompt user for shape color
async function promptForShapeColor() {
    const userInput = await inquirer.prompt({
        type: 'input',
        name: 'color',
        message: 'Enter shape color (keyword or hexadecimal):'
    });

    return userInput.color;
}

// Function to generate SVG content based on user input
function generateSVG(text, textColor, shape, shapeColor) {
    return `
        <svg width="300" height="200">
            <rect width="100%" height="100%" fill="${shapeColor}"/>
            <text x="50%" y="50%" text-anchor="middle" alignment-baseline="middle" fill="${textColor}">${text}</text>
        </svg>`;
}

// Function to create SVG file
function createSVGFile(svgContent) {
    fs.writeFileSync('logo.svg', svgContent);
    console.log('Generated logo.svg');
}

// Function to open SVG file in a browser
function openInBrowser() {
    open('logo.svg').then(() => {
        console.log('Opened logo.svg in browser');
    }).catch(error => {
        console.error('Error opening file in browser:', error);
    });
}

// Main function to orchestrate the process
async function main() {
    try {
        // Prompt user for input
        const text = await promptForText();
        const textColor = await promptForTextColor();
        const shape = await promptForShape();
        const shapeColor = await promptForShapeColor();

        // Generate SVG content
        const svgContent = generateSVG(text, textColor, shape, shapeColor);

        // Create SVG file
        createSVGFile(svgContent);

        // Open SVG file in browser
        openInBrowser();
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// Run the application
main();
