$(document).ready(function(){
    $("#tweet-text").on("input", function(){ 
        let characters = $(this).val()
        let charactersLength = characters.length
        let charactersRemaining = 140 - charactersLength
        console.log(charactersRemaining);
        $(".counter").text(charactersRemaining)
        if (charactersRemaining < 0){
            $(".counter").css({
                color: "red"
            })
        } else {
            $(".counter").css({
                color: "black"
            })
        }
        
    })
})
