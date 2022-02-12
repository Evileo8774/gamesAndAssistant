$(document).ready(function(){
    var SECONDS;
    var categories, seconds;
    var readyToStart = false, alreadyStarted = false, displayedArray = false;
    var music = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25"];
    var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    $("#start").click(function(){
        SECONDS = Number($("#seconds").val());
        const CATEGORIES = Number($("#categorie").val());
        categories = getCategories(CATEGORIES);
        seconds = SECONDS;
        alert("Appuyez sur S pour commencer le jeu\nAppuyez sur A pour afficher le tableau\nNote : Il est possible d'afficher le tableau puis d'appuyer sur S pour commencer la partie");
        readyToStart = true;
    });

    $(document).on('keypress', function(e){
        if(readyToStart == true && alreadyStarted == false){
            if(e.which == 83){ // S
                $("body").html("");
                init();
            }
            if(displayedArray == false){
                if(e.which == 65){ // A
                    $("body").html("");
                    displayedArray = true;
                    displayArray();
                }
            }
        }
        if(alreadyStarted == true){
            if(e.which == 13){
                startGame();
            }
        }
    });

    function init(){
        $("body").append("<div class='timer'></div><div class='letter'></div>");
        $(".timer").css({
            width: "50vw",
            height: "50vh",
            marginLeft: "50vw",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "500%"
        });
        $(".letter").css({
            width: "50vw",
            height: "50vh",
            marginLeft: "50vw",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "500%"
        });
        alert(categories);
        alreadyStarted = true;
        $(".timer").html("Appuyer sur 'Entrer' pour commencer");
    }

    function displayArray(){
        categories.push("Total");
        categories.unshift("Lettre");
        $("body").append("<table>");
        for(i = 0; i <= alphabet.length; i++){
            $("table").append("<tr class='tr"+i+"'>");
            for(j = 0; j < categories.length; j++){
                if(i == 0){
                    $(".tr"+i).append("<td class='td"+j+"'>"+categories[j]+"</td>");
                } else {
                    $(".tr"+i).append("<td class='td"+j+"'></td>");
                }
            }
            $("table").append("</tr>");
        }
        $("body").append("</table>");   
    }

    function startGame(){
        let int = getRandomArbitrary(0, alphabet.length-1);
        int = int.toFixed(0);
        $(".letter").html(alphabet[int]);
        alphabet.splice(int, 1);

        var timer = setInterval(function(){
            $(".timer").html(seconds);
            seconds--;
            if(seconds < 0){
                seconds = SECONDS;
                clearInterval(timer);
                console.log("finished");
                let int = getRandomArbitrary(0, music.length-1);
                int = Number(int.toFixed(0));
                var audio = new Audio("../data/music/"+music[int]+".mp3");
                music.splice(int, 1);
                audio.play();
                console.log(music, int);
                if(alphabet.length == 0){
                    $(".timer").html("Terminé !");
                    $(".letter").html("");
                    $(document).off();
                }
            }
        }, 1000);
    }

    function getCategories(C){
        var categoriesArray = ["Prénom fille", "Prénom garçon", "Pays/Ville", "Marque", "Personne Historique", "Personnage fictif", "Célébrité", "Film/Série", "Végétal", "Animal", "Métier", "Objet", "Anatomie", "Couleur", "Plat", "Minéraux", "Jeu de société/vidéo", "Mot de 4 lettres ou -", "Mot de + de 8 lettres", "Mot anglais", "Adjectif", "Verbe", "Matériel Scolaire", "Vêtement", "Infiniment grand", "Infiniment petit", "Mythologie", "Sport"];
        var chosenCategories = [];
        for(i = 0; i < C; i++){
            var int = getRandomArbitrary(0, categoriesArray.length-1);
            int = int.toFixed(0);
            var category = categoriesArray[int];
            categoriesArray.splice(int, 1);
            chosenCategories.push(category);
        }
        return chosenCategories;
    }

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
});