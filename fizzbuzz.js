//Normal Method
const fizzbuzz = () =>{
    //to store the fizzbuzz value
    let word = "";
    for( let i = 1 ; i <= 100 ; i++ ){
        //if remainder is 0 then word is appeneded with fizz
        if( i % 3 == 0 ){
            word += "fizz"
        }
        //if remainder is 0 then word is appeneded with buzz
        if( i % 5 == 0){
            word += "buzz"
        }
        
        console.log( word || i )
        word = ""
    }
}

fizzbuzz()

//----------------------------------//

//Generator Function
function* fizzbuzzGenerator() {
    for (let i = 1; i <= 100; i++) {
        let word = "";
        
        if (i % 3 === 0) {
            word += "fizz";
        }
        if (i % 5 === 0) {
            word += "buzz";
        }
        
        yield word || i;
    }
}

const generator = fizzbuzzGenerator();
for (const value of generator) {
    console.log(value);
}

//----------------------------------//

//Recursive Function
function fizzbuzzRecursive(number = 1) {
    if (number <= 100) {
        let word = "";
        
        if (number % 3 === 0) {
            word += "fizz";
        }
        if (number % 5 === 0) {
            word += "buzz";
        }
        
        console.log(word || number);
        
        fizzbuzzRecursive(number + 1);
    }
}

fizzbuzzRecursive();
