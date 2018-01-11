let re = ''
re = /hello/ //Looking for hello
re = /hello/i //i = case insensitive
//re = /hello/g //g = looks for all instances

/*console.log(re)
console.log(re.source)*/

// exec() - Returns the result in an array if match or null if no result
/*const result = re.exec('hello world')
console.log(result)
console.log(result[0])
console.log(result.index)
console.log(result.input)*/

//Test() Returns true or false
// const result = re.test('Hello')
// console.log(result)

//match() - Return result array or null
/*const str = 'Hello There'
const result = str.match(re)
console.log(result)*/

//search() = Returns index of the first match if not found returns -1
/*const str = 'Hello There'
const result = str.search(re)
console.log(result)*/

//Replace() - Return new string with some or all matches of a pattern
const str = 'Hello There'
const newStr = str.replace(re, 'Hi')
console.log(str)
console.log(newStr)