#! /usr/bin/env node

import inquirer from "inquirer";
import { differenceInSeconds } from 'date-fns';

// Prompt the user to enter a countdown time in seconds
const res = await inquirer.prompt([{
    name: "userInput",
    type: "input",
    message: "Enter countdown time in seconds (≤ 60):",
    validate: (input) => {
        const num = parseInt(input, 10);
        // Validate if the input is a number
        if (isNaN(num)) {
            return "Please enter seconds as a number";
        } else if (num > 60) {
            // Ensure the input is less than or equal to 60 seconds
            return "Please enter seconds less than or equal to 60";
        } else {
            return true;
        }
    }
}]);

// Convert the user input to a number
let userInput = parseInt(res.userInput, 10);

// Function to start the countdown timer
function startTime(val: number) {
    // Calculate the end time by adding the countdown duration (in milliseconds) to the current time
    const iniTime = new Date().getTime() + val * 1000;
    
    // Set an interval to update the countdown every second
    const intervalId = setInterval(() => {
        // Get the current time
        const currentTime = new Date().getTime();
        // Calculate the remaining time
        const timeDiff = (iniTime - currentTime) / 1000;

        // If the time is up, clear the interval and notify the user
        if (timeDiff <= 0) {
            clearInterval(intervalId);
            console.log('Timer has expired');
            return;
        }

        // Calculate minutes and seconds from the remaining time
        const min = Math.floor(timeDiff / 60);
        const sec = Math.floor(timeDiff % 60);
        // Display the remaining time in MM:SS format
        console.log(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`);
    }, 1000);
}

// Start the countdown timer with the user input
startTime(userInput);
