
let re;
//Literal Characters
re = /hello/
re = /hello/i

//Meta Charecter Symbols
re = /^h/i          //'^' Must Start With
re = /d$/i          //'$' Must End With
re = / world$/i
re = /^hello$/i     //'^, $' Must Started and end with 'Hello'
re = /^h.llo$/i     //'.' Match any one charectar
re = /h*llo/i       //'*' Match 0 or more times
re = /gra?e?y/i     //'?' Optional Character
re = /gra?e?y\?/i     //'\' Escape Character

// Brackets [] = Character Sets
re = /gr[ae]y/i     //Must be an A or E
re = /[GF]ray/i  //Must Be G or F
re =  /[^GF]ray/i
re = /[A-Z]ray/ //Any uppercase letter
re = /[A-Za-z]ray/ //Any letter any case
re = /[0-9]ray/ //Matches any digit

// Braces {} - Quantifiers
re = /Hel{2}o/i //Must have 2 L's
re = /Hel{2,4}o/i //Must have between 2-4 L's
re = /Hel{2,}o/i //Must have at least 2 L's

//Parenthesis () = Grouping
re = /([0-9]{3})/ //Whole group must match

//String To Test
const str = '3x3x3x'


//Log Results
const result = re.exec(str)
console.log(result)

function reTest(re, str) {
  if(re.test(str)){
    console.log(`${str} matches ${re.source}`)
  } else {
    console.log(`${str} does NOT match ${re.source}`)
  }
}

reTest(re, str)