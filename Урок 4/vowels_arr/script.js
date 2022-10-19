let usersTextString = prompt("Введите строку:");

function vowelsForEach(usersTextString){
    usersTextString = usersTextString.toLowerCase();

    let vowelCounter = 0;
    const vowelLetters = "аеёиоуыэюя";

    let usersTextArray = usersTextString.split("");

    usersTextArray.forEach( (letter) => {
        if (vowelLetters.includes(letter)) vowelCounter++;} );
    
    return vowelCounter;
}

function vowelsFilter(usersTextString){
    usersTextString = usersTextString.toLowerCase();

    const vowelLetters = "аеёиоуыэюя";
    let usersTextArray = usersTextString.split("");

    let newArray = usersTextArray.filter( letter => {
        return vowelLetters.includes(letter)} );

    return newArray.length;
};

function vowelsReduce(usersTextString){
    usersTextString = usersTextString.toLowerCase();
    const vowelLetters = "аеёиоуыэюя";
    let usersTextArray = usersTextString.split("");

    
    let counter = usersTextArray.reduce( (previousValue, currentValue) => { 
        if ( vowelLetters.includes(currentValue) ) 
            previousValue++; 
        return previousValue; 
    }, 0);
    return counter;
};

alert(  "forEach: " + vowelsForEach(usersTextString) + 
        "\nfilter: " + vowelsFilter(usersTextString) + 
        "\nreduce:" + vowelsReduce(usersTextString));