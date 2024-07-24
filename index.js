import inquirer from "inquirer";
const res = await inquirer.prompt([{
        name: "userInput",
        type: "input",
        validate: (input) => {
            const num = parseInt(input, 10);
            if (isNaN(num)) {
                return "Please enter seconds in number";
            }
            else if (num > 60) {
                return "Please enter seconds less than or equal to 60";
            }
            else {
                return true;
            }
        }
    }]);
let userInput = parseInt(res.userInput);
function startTime(val) {
    const iniTime = new Date().getTime() + val * 1000;
    const intervalId = setInterval(() => {
        const currentTime = new Date().getTime();
        const timeDiff = (iniTime - currentTime) / 1000;
        if (timeDiff <= 0) {
            clearInterval(intervalId);
            console.log('Timer has expired');
            return;
        }
        const min = Math.floor(timeDiff / 60);
        const sec = Math.floor(timeDiff % 60);
        console.log(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`);
    }, 1000);
}
startTime(userInput);
