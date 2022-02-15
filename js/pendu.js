$(document).ready(function(){

    var chosenWord = "", hiddenWord = "", modifiedWord = "";

    word();

    function word(){
        let int = getRandomArbitrary(0, DATABASE.length-1);
        int = Number(int.toFixed(0));
        chosenWord = DATABASE[int];
        modifiedWord = chosenWord;
        for(i = 0; i < chosenWord.length; i++){
            switch(chosenWord[i]){
                case "-":
                    hiddenWord += "-";
                    break;
                case " ":
                    hiddenWord += " ";
                    break;
                case "'":
                    hiddenWord += "'";
                default:
                    hiddenWord += "_";
            }
        }
        for(i = 0; i < modifiedWord.length; i++){
            switch(modifiedWord[i]){
                case "à":
                case "â":
                case "ä":
                    modifiedWord = modifiedWord.substring(0, i) + "a" + modifiedWord.substring(i+1, modifiedWord.length);
                    break;
                case "é":
                case "è":
                case "ê":
                case "ë":
                    modifiedWord = modifiedWord.substring(0, i) + "e" + modifiedWord.substring(i+1, modifiedWord.length);
                    break;
                case "î":
                case "ï":
                    modifiedWord = modifiedWord.substring(0, i) + "i" + modifiedWord.substring(i+1, modifiedWord.length);
                    break;
                case "ù":
                case "û":
                case "ü":
                    modifiedWord = modifiedWord.substring(0, i) + "u" + modifiedWord.substring(i+1, modifiedWord.length);
                    break;
                case "ô":
                case "ö":
                    modifiedWord = modifiedWord.substring(0, i) + "o" + modifiedWord.substring(i+1, modifiedWord.length);
                    break;
            }
        }
        displayWord(hiddenWord);
    }

    $("td").on("click", function(){
        let letter = $(this).text();
        let found = false;
        for(i = 0; i < chosenWord.length; i++){
            if(letter == modifiedWord[i]){
                hiddenWord = hiddenWord.substring(0, i) + chosenWord[i] + hiddenWord.substring(i+1, hiddenWord.length);
                found = true;
            }
        }
        if(found == true) $(this).addClass("true");
        else $(this).addClass("false");
        displayWord(hiddenWord);
        wordFound();
    });

    function wordFound(){
        if(hiddenWord == chosenWord){
            alert("Bravo tu as gagné !");
            window.location.href = "pendu.html";
        }
    }

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    function displayWord(a){
        $(".word").html(a);
    }

    function strcmp(a, b) {
        a = a.toString(), b = b.toString();
        for (var i=0,n=Math.max(a.length, b.length); i<n && a.charAt(i) === b.charAt(i); ++i);
        if (i === n) return 0;
        return a.charAt(i) > b.charAt(i) ? -1 : 1;
    }
});