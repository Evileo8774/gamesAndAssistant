$(document).ready(function(){
    $(".petit-bac").on("click", function(){window.location.href = "html/petit-bac.html";});
    $(".puissance-4").on("click", function(){window.location.href = "html/puissance-4.html";});
    $(".tic-tac-boum").on("click", function(){window.location.href = "html/tic-tac-boum.html";});
    $(".pendu").on("click", function(){window.location.href = "html/pendu.html";});
    $(".ttc").on("click", function(){window.location.href = "html/tictactoe.html";});
    $(".mastermind").on("click", function(){window.location.href = "html/mastermind.html";});

    $(function(){
        var nav = $("nav");
        $(window).scroll(function(){
            var scroll = $(window).scrollTop();
            if(scroll >= 60){
                nav.css({top: "0"});
            } else {
                nav.css({top: "50px"});
            }
        })
    })







});