/*async function myFunc(){
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('World'), 3000)
  })
  
  const error = false;
  
  if(!error){
    const res = await promise
  } else {
    await Promise.reject(new Error('Something Went Wrong'))
  }
  
  const res = await promise
  return res
}

myFunc()
  .then(res => console.log(res))*/
  
async function getUsers(){
  //Await response of the fetch call
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  //Await Only Proceede once it is resolved
  const data = await response.json()
  //Only proccede once second promise is resolved
  return data
}

getUsers()
  .then(users => console.log(users))