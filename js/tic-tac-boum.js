$(document).ready(function(){
    var seconds, SECONDS;
    var turns;
    var readyToStart = false;
    var syllabe = ["la", "li", "le", "lu", "lé", "lo", "lou", "loi", "ra", "ri", "re", "ru", "ré", "ro", "rou", "roi", "ma", "mi", "me", "mu", "mé", "mo", "mou", "moi", "pa", "pi", "pe", "pu", "pé", "po", "pou", "poi", "ta", "ti", "te", "tu", "té", "to", "tou", "toi", "na", "ni", "ne", "nu", "né", "no", "nou", "noi", "da", "di", "de", "du", "dé", "do", "dou", "doi", "ba", "bi", "be", "bu", "bé", "bo", "bou", "boi", "cha", "chi", "che", "chu", "ché", "cho", "chou", "choi"];

    $("#start").click(function(){
        SECONDS = Number($("#seconds").val());
        const TURNS = Number($("#turn").val());
        seconds = SECONDS;
        turns = TURNS;
        alert("Pour commencer, appuyez sur 'Entrer'");
        readyToStart = true;

    });

    $(document).on('keypress', function(e){
        if(readyToStart == true){
            if(e.which == 13){
                $("body").html("");
                init();
            }
        }
    });

    function init(){
        $("body").html("<div class='letter'></div>");
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

        startGame();
    }

    function startGame(){
        let int = getRandomArbitrary(0, syllabe.length-1);
        int = int.toFixed(0);
        $(".letter").html(syllabe[int]);
        syllabe.splice(int, 1);

        var timer = setInterval(function(){
            seconds--;
            if(seconds <= 0){
                seconds = SECONDS;
                clearInterval(timer);
                console.log("finished");
                var audio = new Audio("../data/boom/boom.mp3");
                audio.play();
                turns--;
                if(turns == 0){
                    $(".letter").html("FINI !");
                    $(document).off();
                }
            }
        }, 1000);
    }

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
});