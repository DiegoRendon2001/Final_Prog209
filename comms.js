let gameArray = [];


let GameObject = function(pTitle, pReleased, pPros, pCons, pGenre, pRating)
{
    this.Title = pTitle;
    this.Released = pReleased;
    this.Pros = pPros;
    this.Cons = pCons;
    this.Genre = pGenre;
    this.Rating = pRating;
    this.ID = Math.random().toString(10).slice(9)
}


gameArray.push(new GameObject("Minecraft", 2009, "You can be Creative", "Can get boring after awhile", "Survival", 4.5));
gameArray.push(new GameObject("COD Vanguard", 2021, "Fast paced shooter", "Toxic community", "FPS",3.8));
gameArray.push(new GameObject("Elden Ring", 2022, "Huge game with so much to do", "Can be difficult for beginners", "Adventure", 4.8));
console.log(gameArray);


let selectedGenre = "not selected";

document.addEventListener("DOMContentLoaded", function ()
{
    createList();


    document.getElementById("buttonAdd").addEventListener("click", function ()
    {
        gameArray.push(new GameObject(document.getElementById("title").value, document.getElementById("released").value,
            document.getElementById("pros").value, document.getElementById("cons").value,document.getElementById("select-genre").value, document.getElementById("rate").value));
    });

    document.getElementById("buttonClear").addEventListener("click", function ()
    {
        document.getElementById("title").value = "";
        document.getElementById("released").value = "";
        document.getElementById("pros").value = "";
        document.getElementById("cons").value = "";
        document.getElementById("rate").value = "";
    });

    document.getElementById("select-genre").addEventListener("change", function ()
    {
        selectedGenre = $('#selected-genre').val();
    });

    document.getElementById("buttonSortTitle").addEventListener("click", function ()
    {
        gameArray.sort(dynamicSort("Title"));
        createList();
        document.location.href = "index.html#ListAll";
    });

    document.getElementById("buttonSortGenre").addEventListener("click", function ()
    {
        gameArray.sort(dynamicSort("Genre"));
        createList();
        document.location.href = "index.html#ListAll";
    });

    $(document).on("pagebeforeshow", "#ListAll", function (event)
    {
        createList();
    });

    $(document).on("pagebeforeshow", "#details", function (event)
    {
        let GameID = localStorage.getItem('parm');
        let game;
        console.log(gameArray);
        console.log(GameID);
        for (let i = 0; i < gameArray.length; i++) {
            if (gameArray[i].ID == GameID) {
                console.log("game assign")
                game = gameArray[i];
                document.getElementById("gameID").innerHTML = GameID;
                document.getElementById("gameRate").innerHTML = game.Rating;
                document.getElementById("gameTitle").innerHTML = game.Title;
            }
        }


    });

});


function createList()
{
    var theList = document.getElementById("myul");
    theList.innerHTML = "";

    
    gameArray.forEach(function (element, i) 
    {
       var myLi = document.createElement('li');
       myLi.classList.add('oneGame');
       myLi.innerHTML = element.ID + ":  " + element.Title + "  " + element.Genre + "  " + element.Rating;
       
       myLi.setAttribute("data-parm", element.ID);

       theList.appendChild(myLi);
    });

    var liList = document.getElementsByClassName("oneGame");
    let newGamewArray = Array.from(liList);
    
    newGamewArray.forEach(function (element,i)
    {
        element.addEventListener('click', function () 
        {
            var parm = this.getAttribute("data-parm");
            localStorage.setItem('parm', parm);
            document.location.href = "index.html#details";
        });
    });
};

function dynamicSort(property) 
{
    return function(a, b)
    {
        return a[property].localeCompare(b[property]);
    }
}