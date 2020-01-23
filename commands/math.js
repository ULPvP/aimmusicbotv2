module.exports = {
	name: 'math',
	description: '數學計算機',
	cooldown: 2,
	execute(client, message, args, tools) {

const math = require('mathjs');
const algebra = require('algebra.js');
const prefix = process.env.PREFIX
const token = process.env.TOKEN

var Equation = algebra.Equation;

const Discord = require('discord.js');

const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!')
})

function calcSplit(str) {
    return str.split(`${prefix}calc`)[1];
}


client.on('message', message => {

    try {

        if (message.content.startsWith(`${prefix}calc`)) {

            var equation = calcSplit(message.content);

            var eString = "";

            eString = equation.toString();


            if (message.content.includes('x') && message.content.includes('y') && message.content.includes('=')) {

                var expr1 = algebra.parse(eString.substring(0, equation.indexOf('=')));
                var expr2 = algebra.parse(equation.split('=')[1]);

                var eq = new Equation(expr1, expr2);

                var tempX = eq.solveFor('x');
                var tempY = eq.solveFor('y');

                var answerX = tempX.toString();
                var answerY = tempY.toString();

                message.channel.send("x = " + answerX + ", y = " + answerY);


            }

            else if (message.content.includes('x') == true && message.content.includes('y') == false && message.content.includes('=') == true) {

                var expr1 = algebra.parse(eString.substring(0, equation.indexOf('=')));
                var expr2 = algebra.parse(equation.split('=')[1]);

                var eq = new Equation(expr1, expr2);

                var temp = eq.solveFor('x');

                var answer = temp.toString();

                message.channel.send("x = " + answer);

            }

            else if (message.content.includes('y') == true && message.content.includes('x') == false && message.content.includes('=') == true) {

                var expr1 = algebra.parse(eString.substring(0, equation.indexOf('=')));
                var expr2 = algebra.parse(equation.split('=')[1]);

                var eq = new Equation(expr1, expr2);

                var temp = eq.solveFor('y');

                var answer = temp.toString();

                message.channel.send("y = " + answer);

            }

            else if (message.content.includes("help")){

                message.channel.send(
                    "1. 將^用作指數，即2的3次冪為'2 ^ 3'\n" +
                    "2. 使用sqrt（）來找到數字的平方根：F，即9的平方根就是sqrt（9）\n" +         //
                    "3. 要求解非數字變量，必須使用'x'或'y'\n" +
                    "4. 使用log（）作為對數：，log（5）\n" +
                    "5. 用e表示歐拉數例如，5e\n" +
                    "6. 示例1：!calc sqrt（（24）+（25/5））\n" +
                    "7. 示例2：!calc 2x + 3pi = 7\n" +
                    "8. 示例3：!calc 3 / 4x + 5/7 = 3y-12/3" 
                )

            }

            else {

                var answer = math.evaluate(equation);
                message.channel.send(answer);

            }
        }

    }

    catch (err) {
        console.error(err);
        message.channel.send("指令無效,要看有什麽指令,請打ul!calc help");
    }



})
