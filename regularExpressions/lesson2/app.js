
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




//String To Test
const str = 'grey?'

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