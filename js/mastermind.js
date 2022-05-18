$(document).ready(function(){
    const turn = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"];
    const colors = ["rgb(255, 0, 0)", "rgb(0, 128, 0)", "rgb(0, 255, 255)", "rgb(255, 255, 0)", "rgb(255, 165, 0)", "rgb(0, 0, 255)", "rgb(128, 0, 128)", "rgb(255, 0, 255)"];

    var colorsToFind = [];

    let actualTurn = 0;
    let tmpColor = "";
    let originalColor = "";


    initGame();

    function initGame(){
        for(i = 0; i < 5; i++){
            let number = getRandomInt(0, 8);
            colorsToFind.push(colors[number]);
        }
    }

    $(".colors div").on("click", function(){
        tmpColor = $(this).prop("classList");
    });

    $(".dot").mouseover(function(){
        originalColor = $(this).css("backgroundColor");
        if(tmpColor != "" && $(this).parent().index() == actualTurn){
            $(this).css({
                backgroundColor: tmpColor
            });
            $(this).on("click", function(){
                originalColor = tmpColor;
            });
        }

    }).mouseout(function(){
        if(tmpColor != ""){
            $(this).css({
                backgroundColor: originalColor
            });
        }
    });

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    $(".btnValider").on("click", function(){
        let getColors = [];
        for(i = 0; i < 5; i++){
            getColors.push($(".gameElement:eq("+actualTurn+")").children().eq(i).css("backgroundColor"));
        }
        actualTurn++;
        verifColors(getColors);
    });

    function verifColors(placedColors){
        let placement = [];
        for(i = 0; i < placedColors.length; i++){
            let exists = false;
            for(j = 0; j < colorsToFind.length; j++){
                if(placedColors[i] == colorsToFind[i]){
                    placement.push(2);
                    exists = true;
                    break;
                } else if(placedColors[i] == colorsToFind[j]){
                    placement.push(1);
                    exists = true;
                    break;
                }
            }
            if(exists == false){
                placement.push(0);
            } else {
                exists = false;
            }
        }
        
        let count = 0;
        for(i = 0; i < placement.length; i++){
            if(placement[i] == 2) count++;
        }
        displayResults(placement);
        if(count == 5){
            if(confirm("Vous avez gagné, recommencer ?")){
                window.location.href = "mastermind.html";
            } else {
                window.location.href = "../index.html";
            }
        }
    }

    function displayResults(placement){
        for(i = 0; i < placement.length; i++){
            console.log(placement[i])
            if(placement[i] == 0){
                $(".resultElement:eq("+(actualTurn-1)+")").children().eq(i).css({
                    backgroundColor: "red"
                });
            } else if(placement[i] == 1){
                $(".resultElement:eq("+(actualTurn-1)+")").children().eq(i).css({
                    backgroundColor: "white"
                });
            } else {
                $(".resultElement:eq("+(actualTurn-1)+")").children().eq(i).css({
                    backgroundColor: "green"
                });
            }
            
        }
    }
});