$(document).ready(function(){
    let startingPlayer = 1;
    let player = startingPlayer;
    let turn = 0;
    gameStart();

    function gameStart(){
        if(startingPlayer == 1){
            alert("Le joueur X commence");
        } else {
            alert("Le joueur O commence");
        }
    }

    $("td").on("click", function(){
        if($(this).text() == ""){
            var clickedId = $(this).attr('id');
            turn++;
            if(player == 1){
                $("#"+clickedId).html("X");
                $("#"+clickedId).addClass("X");
                player = 2;
            } else {
                $("#"+clickedId).html("O");
                $("#"+clickedId).addClass("O");
                player = 1;
            }

            winner();
        }
    });

    function winner(){
        //vérif lignes
        for(i = 0; i < 3; i++){
            let row;
            if(i == 0) row = "t";
            else if(i == 1) row = "m";
            else row = "b";

            if($("#"+row+"1").text() == $("#"+row+"2").text() && $("#"+row+"1").text() == $("#"+row+"3").text() &&  $("#"+row+"3").text() != "") endGame($("#"+row+"1").text());
        }

        //vérif colonnes
        for(i = 1; i <= 3; i++){
            if($("#t"+i).text() == $("#m"+i).text() && $("#m"+i).text() == $("#b"+i).text() &&  $("#b"+i).text() != "") endGame($("#t"+i).text());
        }

        //vérif diagonales
        if($("#t1").text() == $("#m2").text() && $("#m2").text() == $("#b3").text() && $("#t1").text() != "") endGame($("#t1").text());
        else if($("#t3").text() == $("#m2").text() && $("#m2").text() == $("#b1").text() && $("#t3").text() != "") endGame($("#t3").text());
    }

    function endGame(winner){
        setTimeout(function(){
            if(confirm(winner+" a gagné !\nrecommencer ?")){
                if(startingPlayer == 1){
                    startingPlayer = 2;
                } else {
                    startingPlayer = 1;
                }
                $("td").html("");
                $("td").removeClass("X");
                $("td").removeClass("O");
            } else {
                window.location.href = "../index.html";
            }
        }, 10);
    }
});