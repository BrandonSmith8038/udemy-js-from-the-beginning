// Listen for submit

document.getElementById('loan-form').addEventListener('submit', calculateResults)

function calculateResults(e){
	
	const amount = document.getElementById('amount')
	const interest = document.getElementById('interest')
	const years = document.getElementById('years')
	
	const monthlyPayment = document.getElementById('monthly-payment')
	const totalPayment = document.getElementById('total-payment')
	const totalInterest = document.getElementById('total-interest')
	
	const principal = parseFloat(amount.value)
	const calculatedInterest = parseFloat(interest.value / 100 / 12)
	const calculatedPayments = parseFloat(years.value * 12)
	
	//Comput Monthly Payments
	const x = Math.pow(1 + calculatedInterest, calculatedPayments)
	const monthly = (principal * x * calculatedInterest)/(x-1)
	
	if(isFinite(monthly)){
		monthlyPayment.value = monthly.toFixed(2)
		totalPayment.value = (monthly * calculatedPayments).toFixed(2)
		totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2)
	} else {
		
		
		showError('Please Check Your Numbers')
	}


	e.preventDefault()    
}

function showError(error){
	
	//Get Elements
	const card = document.querySelector('.card')
	const heading = document.querySelector('.heading')
	
	// Create a div
	const errorDiv = document.createElement('div')
	
	// Add Class
	errorDiv.className = 'alert alert-danger'
	
	//Create Text Node and Append To Div
	errorDiv.appendChild(document.createTextNode(error))
	
	//Insert error about heading
	card.insertBefore(errorDiv, heading)
	
	//Clear Error After 3 Seconds
	setTimeout(() => {
		document.querySelector('.alert').remove()
	}, 3000)
}