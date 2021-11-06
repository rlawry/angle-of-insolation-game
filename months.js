document.addEventListener("DOMContentLoaded", function(){
    var buttons = document.querySelectorAll(".btn").length;

    for (var i = 0; i < buttons ; i++) {
        document.querySelectorAll(".btn")[i].addEventListener("click", function() {
            checkDirection(this);
        });
    }
    document.getElementById("monthButton").addEventListener("click", function() {
        makeMonth();
    })
});

var baseNames = [["January", 1],["February", 1],["March", 1], ["April", 1], ["May",1], ["June", "max"], ["July", -1], ["August",-1], ["September",-1], ["October",-1], ["November",-1], ["December","min"]];
var monthNames = [["January", 1],["February", 1],["March", 1], ["April", 1], ["May",1], ["June", "max"], ["July", -1], ["August",-1], ["September",-1], ["October",-1], ["November",-1], ["December","min"]];
var handicap1 = ["December","min"]
var handicap2 = ["June","max"];

var previousMonth, monthNumber;
previousMonth = 0;
monthNumber = 0;
var handicap = 0;

var winCount = 0;
var newCreated = false;

function makeMonth(){
    if(newCreated==false){
        while(previousMonth == monthNumber){
            monthNumber = Math.floor(Math.random()*(monthNames.length));
        }
        var monthObject = document.getElementById("month");
        monthObject.innerHTML = monthNames[monthNumber][0];
        previousMonth = monthNumber;
        newCreated = true;
        document.getElementById("answer").innerHTML = "Make a selection!";
    }
    else if(newCreated == true){
        document.getElementById("answer").innerHTML = "Cheater.  Pick a direction first.";
    }
}

function checkDirection(e){
    if(newCreated == true){
        if(e.value==monthNames[monthNumber][1]){
            document.getElementById("answer").innerHTML = "Correct";
            document.getElementById("answer").classList.remove("lose-class");
            newCreated = false;
            winCount++;
            if(handicap>5&&monthNames[monthNumber][1]==1){
                monthNames = monthNames.slice(0,baseNames.length);
                document.getElementById("answer").innerHTML = "Finally correct! You missed this one " + handicap + " times.";
                handicap = 0;
            }
        }
        else if(e.value!=monthNames[monthNumber][1]){
            document.getElementById("answer").innerHTML = "No points. Go to the next month.";
            document.getElementById("answer").classList.add("lose-class");
            newCreated = false;
            if(winCount>0){winCount--;}
            if(monthNames[monthNumber][1]=="min"||monthNames[monthNumber][1]=="max"){
                monthNames.push(handicap1);
                monthNames.push(handicap2);
                handicap++;
            }
        }
        document.getElementById("points").innerHTML = winCount;
    }
    else if(newCreated == false){
        document.getElementById("answer").innerHTML = "You already guessed. Move to the next month.";
    }
    console.log(handicap);
}
