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
			
//Clear The Input
guessInput.value = ''
			
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
	
		//Game Over Won
		gameOver(true,`${winningNum} IS CORRECT! YOU WIN!!!`, 'Play Again')
		
	} else {
		guessesLeft -= 1
		
		if(guessesLeft === 0){
		
			//Game Over Lost
			gameOver(false, `GAME OVER, YOU LOST. THE CORRECT NUMBER WAS ${winningNum}`, 'Play Again')

		} else {
			//Game Continues Answer Wrong
			
			//Change Border Color
			guessInput.style.borderColor = 'red'
			
			//Clear The Input
			guessInput.value = ''
			
			//Tell user Its the wrong number
			setMessage(`GUESS IS NOT CORRECT. ${guessesLeft} GUESSES LEFT`, 'red')
		}
	}
	
})

//Set Message
function setMessage(msg, color){
	message.style.color = color
	message.textContent = msg
}

function gameOver(won, msg, btnMsg){
	
	let color = won ? 'green' : 'red' 
	
	guessInput.disabled = true
	guessInput.style.borderColor = color
	guessInput.style.borderWidth = '2px'
	setMessage(msg, color)
	guessBtn.setAttribute('value', btnMsg)
	guessInput.value = ''
}

