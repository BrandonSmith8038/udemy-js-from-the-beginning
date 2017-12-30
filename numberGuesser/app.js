//Game Values
let min = 1,
		max = 10,
		winningNum = 2,
		guessesLeft = 3
		
//UI Elements
const game = document.querySelector('#game'),
			minNum = document.querySelector('.min-num'),
			maxNum = document.querySelector('.max-num'),
			guessBtn = document.querySelector('#guess-btn'),
			guessInput = document.querySelector('#guess-input'),
			message = document.querySelector('.message')
			
//Assign Min and max

minNum.textContent = min;
maxNum.textContent = max;

// Listen for button click
guessBtn.addEventListener('click', () => {
	let guess = parseInt(guessInput.value)

	if(isNaN(guess) || guess < min || guess > max){
		setMessage(`Please enter a number between ${min} and ${max}`, 'red')
	}
	
	if(guess === winningNum){
		//Disable Input
		guessInput.disabled = true
		guessInput.style.borderColor = 'green'
		guessInput.style.borderWidth = '2px'
		setMessage(`${winningNum} IS CORRECT! YOU WIN!!!`, 'green')
	} else {
		
	}
	
})

//Set Message
function setMessage(msg, color){
	message.style.color = color
	message.textContent = msg
}