$(document).ready(function(){
    var grid = new Array(6);
    for(i = 0; i < grid.length; i++) grid[i] = new Array(7);

    actualPlayer = true;

    

    
    $("section").html("<table>");
    for(y = 0; y < grid.length; y++){
        $("table").append("<tr class='tr"+y+"'>");
        for(x = 0; x < grid[y].length; x++){
            $(".tr"+y).append("<td class='"+y+x+"'></td>");
        }
        $("table").append("</tr>"); 
    }
    $("section").append("</table>");

    alert("Les rouges commencent !");
    
    
    function resetGrid(){
        for(y = 0; y < grid.length; y++){
            for(x = 0; x < grid[y].length; x++){
                if($("."+y+x).hasClass("filled")){
                    $("."+y+x).removeClass("filled");
                }
                if($("."+y+x).hasClass("red")){
                    $("."+y+x).removeClass("red");
                }
                if($("."+y+x).hasClass("yellow")){
                    $("."+y+x).removeClass("yellow");
                }
                $("."+y+x).css({background:"none"});
            }
        }
        if(actualPlayer == true){
            alert("Les rouges commencent !");
        } else {
            alert("Les jaunes commencent !");
        }
    }

    $("td").on("click", function(){
        let index = $(this).attr("class");
        index = Number(index.substr(1, 2));

        for(y = grid.length-1; y >= 0; y--){
            if($("."+y+index).hasClass("filled")){
                
            } else {
                if(actualPlayer == true){
                    $("."+y+index).css({background:"red"});
                    $("."+y+index).addClass("red");
                    actualPlayer = false;
                } else {
                    $("."+y+index).css({background:"yellow"});
                    $("."+y+index).addClass("yellow");
                    actualPlayer = true;
                }
                $("."+y+index).addClass("filled");
                verifyPos(y, index);
                break;
            }
        }
    });

    function verifyPos(y, x){
        //largeur
        let yellowCount = 0;
        let redCount = 0;
        for(i = 0; i < grid[y].length; i++){
            if($("."+y+i).hasClass("red")){
                redCount++;
                yellowCount = 0;
                verifVictory(redCount, "rouges");
            } else if($("."+y+i).hasClass("yellow")){
                yellowCount++;
                redCount = 0;
                verifVictory(yellowCount, "jaunes");
            } else {
                yellowCount = 0;
                redCount = 0;
            }
        }

        yellowCount = 0;
        redCount = 0;

        //hauteur

        for(i = 0; i < grid.length; i++){
            if($("."+i+x).hasClass("red")){
                redCount++;
                yellowCount = 0;
                verifVictory(redCount, "rouges");
            } else if($("."+i+x).hasClass("yellow")){
                yellowCount++;
                redCount = 0;
                verifVictory(yellowCount, "jaunes");
            } else {
                yellowCount = 0;
                redCount = 0;
            }
        }

        yellowCount = 0;
        redCount = 0;

        //diagonale
        
    }

    function verifVictory(count, color){
        if(count >= 4){
            alert("Les "+color+" gagnent !");
            if(confirm("Recommencer ?")){
                resetGrid();
            }
        }
    }


});