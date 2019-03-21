import * as lib from './produseElements.js';


var Produse= [];
var Comments=[];
var firstUpdate=true;

var Filter={
    "tip" : -1,
    "curent": -1,
    "pentru": -1,
    "inStoc": 1,
    "prom":-1,
    "nou":-1,
    "resigilat":-1,
    "pret": 1000
}

class Produs{
    constructor(nume,caption,source,pret,discount,inStoc,resigilat,nou,tip,curent,pentru)
    {
        this.HTMLelement=null;
        this.id=null;
        this.fav=false;
        this.cart=false;
        this.onPage=true;
        this.selected=false;
        this.popup=false;
        this.inPosition=0; //For how many updates has it been in position
        //Info
        this.nume=nume;
        this.caption=caption;
        this.source=source;
        this.pret=pret;
        this.discount=discount;
        this.inStoc=inStoc;
        this.resigilat=resigilat;
        this.nou=nou;
        this.tip=tip;
        this.curent=curent;
        this.pentru=pentru;
    }
}

function getTemplateByID(ID)
{
    for(var i=0;i<Produse.length;i++)
    {
        if(Produse[i].id==ID)
                return Produse[i];    
    }
}

function loadProduse(){
    var  httpObj = new XMLHttpRequest();
    var ProduseJSON;
    httpObj.onreadystatechange = function()
    { 
        if (httpObj.readyState == 4)
            if (httpObj.status == 200)
                {
                    ProduseJSON=JSON.parse(httpObj.responseText);
                    for(var i=0;i<ProduseJSON.length;i++)
                    {
                        Produse.push(new Produs(ProduseJSON[i].produs.nume,
                                               ProduseJSON[i].produs.caption,
                                               ProduseJSON[i].produs.source,
                                               ProduseJSON[i].produs.pret,
                                               ProduseJSON[i].produs.discount,
                                               ProduseJSON[i].produs.inStoc,
                                               ProduseJSON[i].produs.resigilat,
                                               ProduseJSON[i].produs.nou,
                                               ProduseJSON[i].produs.tip,
                                               ProduseJSON[i].produs.curent,
                                               ProduseJSON[i].produs.pentru));
                    }
                    for(var i=0;i<Produse.length;i++)
                    { 
                        Produse[i].id="produs"+i;
                        Produse[i].HTMLelement=createProduct(Produse[i]);
    
                    }
                    finishedLoading();
                }

    }
    httpObj.open('GET', "Scripts/produse.json", true);
    httpObj.send(); 
}
function createProduct(template)
{
    var img = document.createElement("img");
    img.src = template.source;

    var nume = document.createElement("p");
    nume.innerHTML = template.nume;

    var caption = document.createElement("p");
    caption.innerHTML = template.caption;

    var pret = document.createElement("p");
    pret.innerHTML = template.pret;

    var cartBttn = document.createElement("button");
    cartBttn.type="button";
    cartBttn.innerHTML="Add to Cart";
    cartBttn.classList.add("addToCart");

    var favBttn = document.createElement("button");
    favBttn.type="button";
    favBttn.innerHTML="Add to Fav";
    favBttn.id="favBttn"+template.id;
    favBttn.classList.add("addToFav");

    var removeBttn = document.createElement("button");
    removeBttn.type="button";
    removeBttn.innerHTML="Remove";
    removeBttn.style.display="none";
    removeBttn.id="remBttn"+template.id;

    var produsHTML = document.createElement("div");
    produsHTML.classList.add("produs");
    produsHTML.id=template.id;

    produsHTML.appendChild(img);
    produsHTML.appendChild(nume);
    produsHTML.appendChild(caption);
    produsHTML.appendChild(pret);
    produsHTML.appendChild(cartBttn);

    favBttn.parent=produsHTML;
    favBttn.addEventListener("click",function(event){
        event.stopPropagation();
        addToFav(this.parent);
    });

    removeBttn.parent=produsHTML;
    removeBttn.addEventListener("click",function(event){    
        event.stopPropagation();
        removeFromFav(this.parent);
    });

    cartBttn.parent=produsHTML;
    cartBttn.addEventListener("click",function(event){
        event.stopPropagation();
    })

    produsHTML.appendChild(favBttn);
    produsHTML.appendChild(removeBttn);

    produsHTML.addEventListener("click",function(event){ //Element selected
        onProdusClick(this);
        event.stopPropagation();
    });
    produsHTML.addEventListener("mouseenter",function(event){
        var time;
        var latestX,latestY;
        event.stopPropagation();
        this.addEventListener("mousemove",function(e){
            e.stopPropagation();
            latestX=e.offsetX;
            latestY=e.offsetY;
        });
        if(!getTemplateByID(this.id).popup)
        {
            time=setTimeout(createPopup,1000,this);
            getTemplateByID(this.id).popup=true;
        }
        function createPopup(produs){
            var container=document.createElement("div");
            container.style.position="absolute";
            container.style.width="200px";
            container.style.height="100px";
            container.style.top=latestY+"px";
            container.style.left=latestX+"px";
            container.style.zIndex="200";
            container.classList.add("popup");
            var template=getTemplateByID(produs.id);
            var text=document.createTextNode(
                "In Stoc: " + template.inStoc + 
                "\nPromotie: "+ template.discount +
                "\nResigilat: "+template.resigilat+
                "\nRecent adaugat: " +template.nou
            );
            container.appendChild(text);
            produs.appendChild(container);
        }
        this.addEventListener("mouseleave",function(){
            clearTimeout(time);
            getTemplateByID(this.id).popup=false;
            var popup = this.querySelector(".popup");
            this.removeChild(popup);
        });
    });
     return produsHTML;
}

function onProdusClick(produs)
{
    var template=getTemplateByID(produs.id);
    if(!template.selected)
    {
        if(!template.fav)
        {
            produs.style.border="1px solid blue";
            template.selected=true;
            setTimeout(selectToFav,1000,produs);
        }
        else
        {
            produs.style.border="1px solid red";
            template.selected=true;
        }
    }
    else
    {
        produs.style.border="";
        template.selected=false;
    }
}
function selectToFav(produs)
{
    var template=getTemplateByID(produs.id);
    console.log(template);
    if(template.selected)
    {
        addToFav(produs);
        template.selected=false;
    }
}
function updateLocalStorage()
{
    localStorage.setItem("produse", JSON.stringify(Produse));
}
function updateCommentsLocalStorage()
{
    localStorage.setItem("comments",JSON.stringify(Comments));
}
function addToFav(produs)
{
    var template=getTemplateByID(produs.id);
    if(template.onPage)
    {
        template.onPage=false;
        template.fav=true;
        template.inPosition=0;
        document.getElementById("remBttn"+produs.id).style.display="inline";
        document.getElementById("favBttn"+produs.id).style.display="none";
        document.querySelector("#favourites>span").innerHTML=1+parseInt(document.querySelector("#favourites>span").innerHTML);
        updateOnPageProducts();
        updateLocalStorage();
        produs.style.border="";
    }
}
function removeFromFav(produs)
{
    var template=getTemplateByID(produs.id);
    if(template.fav)
    {
       // template.onPage=true;
        template.fav=false;
        template.inPosition=0;
        document.getElementById("remBttn"+produs.id).style.display="none";
        document.getElementById("favBttn"+produs.id).style.display="inline";
        document.querySelector("#favourites>span").innerHTML=parseInt(document.querySelector("#favourites>span").innerHTML)-1;
        if(FilterPass(template))
            template.onPage=true;
        updateOnPageProducts();
        updateLocalStorage();
    }
}
function updateOnPageProducts()
{
    var contProduse = document.getElementById("produse");
    var contFavs    = document.getElementById("favItems");

    contProduse.innerHTML="";
    contFavs.innerHTML="";
    for(var i=0;i<Produse.length;i++)
    {
        if(Produse[i].onPage)
        {
            contProduse.appendChild(Produse[i].HTMLelement);
            applyFadeInEffect(Produse[i].HTMLelement);
            // Produse[i].fav=false;
        }
        if(Produse[i].fav)
        {
            contFavs.appendChild(Produse[i].HTMLelement);
            if(Produse[i].inPosition==0)
            {
                applyFadeInEffect(Produse[i].HTMLelement);
                Produse[i].inPosition++;
            }
            //Produse[i].onPage=false;
        }
    
        
    }
    if(firstUpdate)
    {
        //Get favorites items from localStorage
        var storedProduse;
        if(storedProduse=JSON.parse(localStorage.getItem("produse")))
        {
            for(var i=0;i<storedProduse.length;i++)
            {
                if(storedProduse[i].fav)
                    addToFav(Produse[i].HTMLelement);
            }
        }
        firstUpdate=false;
    }
    function applyFadeInEffect(produs)
    {
        produs.classList.add("fadeIn");
        setTimeout(removeFadeIn,500,produs);
        function removeFadeIn(temp)
        {
            temp.classList.remove("fadeIn");
        }
    }
}
function assignSearchOnChange()
{
    var search =  document.querySelector("#search>input");
    search.addEventListener("keyup",function(){
        if(this.value!="")
            Search(this.value);
    });
    search.addEventListener("keypress",function(event)
    {
        if(event.keyCode=="13")
        {
            event.stopPropagation();
        }
    });

    function Search(string)
    {
        var nrResults=0;
        resetSelectors();
        var container=document.getElementById("produse");
        for(var i=0;i<Produse.length;i++)
        {
            Produse[i].onPage=false;
            if(Produse[i].nume.includes(string)||Produse[i].caption.includes(string))
            {   
                nrResults++;
                Produse[i].onPage=true;
            }
        }
        if(nrResults==0)
        {
            container.innerHTML="No results were found"
        }
        else
        {
            updateOnPageProducts();
        }
    }
}
function resetSelectors()
{
    var container=document.getElementById("produse");
    container.innerHTML="";
    console.log("Maybe in the future")
}
function assignSubmitFaves()
{
    var submitedItems=0;
    window.addEventListener("keypress",function(event){
        if(event.keyCode=="13")
        {
            for(var i=0;i<Produse.length;i++)
            {
                if(Produse[i].fav&&Produse[i].selected)
                   {
                        var produs = this.document.getElementById(Produse[i].id);
                        produs.style.border="";
                        Produse[i].selected=false;
                        removeFromFav(Produse[i]);
                        submitedItems++;
                   }
            }
            document.querySelector("#cart>span").innerHTML=submitedItems;
        }
    });
}
function assignColumnsOnChange()
{
    var buttons= document.querySelectorAll("[name=column]");
    for(var i=0;i<buttons.length;i++)
    {
        buttons[i].addEventListener("change",function(){
            if(this.checked)
            {
                displayColumns(this.value);
            }
        });
    }

    function displayColumns(nrOfColumns)
    {
        var container=document.getElementById("produse");
        var cssRule = "auto ";
        cssRule=cssRule.repeat(nrOfColumns);
        container.style.gridTemplateColumns=cssRule;
    }
}

function applyFilterForOnPageElements()
{
    console.log(Filter);
    var nrOnPage=0;
    var container =document.getElementById("produse");
    for(var i=0;i<Produse.length;i++)
    {
       // if(Produse[i].onPage)
       // {
            Produse[i].onPage=true;
            if(!FilterPass(Produse[i]))
            {
              Produse[i].onPage=false;
            }
            else
            {
                nrOnPage++;
            }
       // }
    }
    if(nrOnPage)
    {
            updateOnPageProducts();
    }
    else
    {
        container.innerHTML="Nu exista astfel de produse";
    }
}
function FilterPass(template)
{
    if(Filter.tip==template.tip||Filter.tip==-1||Filter.tip=="")
    if(Filter.curent==template.curent||Filter.curent==-1||Filter.curent=="")
    if(Filter.pentru==template.pentru||Filter.pentru==-1||Filter.pentru=="")
    if(parseInt(Filter.pret)>=parseInt(template.pret))
    {
        if(Filter.inStoc==template.inStoc)
            return true;
        if(Filter.pro==1&&template.discount!=null)
            return true;
        if(Filter.nou==template.nou)
            return true;
        if(Filter.resigilat==template.resigilat)
            return true;
    }
    return false;
}
function assignInputOnChange()
{
    document.getElementById("selectorTip").onchange=function(){
        Filter.tip= this.options[this.selectedIndex].value;
        applyFilterForOnPageElements();
    }
    document.getElementById("selectorCurent").onchange=function(){
        Filter.curent= this.options[this.selectedIndex].value;
        applyFilterForOnPageElements();
    }
    document.getElementById("selectorPentru").onchange=function(){
        Filter.pentru= this.options[this.selectedIndex].value;
        applyFilterForOnPageElements();
    }
    document.getElementById("selectorStoc").onchange=function(){
        Filter.inStoc=this.checked;
        applyFilterForOnPageElements();
    }
    document.getElementById("selectorProm").onchange=function(){
        Filter.prom=this.checked;
        applyFilterForOnPageElements();
    }
    document.getElementById("selectorNou").onchange=function(){
        Filter.nou=this.checked;
        applyFilterForOnPageElements();
    }
    document.getElementById("selectorRes").onchange=function(){
        Filter.resigilat=this.checked;
        applyFilterForOnPageElements();
    }

    document.getElementById("selectorPret").onchange=function(){
        Filter.pret=this.value;
        document.getElementById("rangePrice").innerHTML=this.value;
        applyFilterForOnPageElements();
    }
}
function assignSubmitComplain(){
    document.querySelector("#bttnSubmit").addEventListener("click",function(){
        var textArea= document.getElementById("textarea");
        var text=textArea.value;
        var container=document.getElementById("complainArea");
        if(text.length>=5)
        {
            var comment= document.createElement("blockquote");
            comment.classList.add("comment");
            comment.innerHTML=text;
            var childNodes=container.childNodes;
            if(childNodes.length>0)
                container.insertBefore(comment,childNodes[0]);
            //    container.appendChild(comment);
            Comments.push(text);
            updateCommentsLocalStorage();
        }
        else
        {
            alert("Mesajul trebuie sa aibe lungimea de minim 5 caractere");
        }
    });

    document.querySelector("#bttnRmv").addEventListener("click",function(){
        var container=document.getElementById("complainArea");
        var comments=container.querySelectorAll(".comment");
        
        var pos=0;
        var opacity=1;
        var interval=setInterval(slide,1);
        function slide()
        {
            if(pos>=2000){
                clearInterval(interval);
                removeLess();
            }
            else{
                pos+=15;
                opacity=opacity-0.007;
                for(var i=0;i<comments.length;i++)
                    if(comments[i].innerHTML.length<250)
                      {
                          comments[i].style.marginRight=pos+"px";
                          comments[i].style.opacity=opacity;
                      }
            }
        }
        function removeLess(){
            for(var i=0;i<comments.length;i++)
                    if(comments[i].innerHTML.length<250)
                        container.removeChild(comments[i]);
        }    
    });
}
function loadComments(){
    var comms;
    if(!(localStorage.getItem("comments")===null))
    {
        comms=JSON.parse(localStorage.getItem("comments"));
        var container=document.getElementById("complainArea");
        for(var i=0;i<comms.length;i++)
        {
            var comment= document.createElement("blockquote");
            comment.classList.add("comment");
            comment.innerHTML=comms[i];
            container.appendChild(comment);
            Comments.push(comms[i]);
        }
    }
}

function assignCircleOnClick(){
    var container=document.getElementById("produse");
    container.addEventListener("click",function(event){
        var circle =document.createElement("div");
        circle.style.position="absolute";
        circle.style.width="25px";
        circle.style.height="25px";
        circle.style.border="1px solid red";
        circle.style.borderRadius="50%";
        circle.style.top=(event.offsetY-5)+"px";
        circle.style.left=(event.offsetX-5)+"px";
        circle.style.opacity="1";
        //animation
        circle.style.animation="decrease 0.5s linear forwards";
        //prevent click on circle
        circle.addEventListener("click",function(event){
            event.stopPropagation();
        });
        this.appendChild(circle);
        setTimeout(removeCircle,500,this);

        function removeCircle(cont)
        {
            cont.removeChild(circle);
        }
    });
}


window.onload=function(){
    lib.createElements();
    loadProduse();
    loadComments();
    assignSearchOnChange();
    assignSubmitFaves();
    assignColumnsOnChange();
    assignInputOnChange();
    assignSubmitComplain();
    assignCircleOnClick();
}
function finishedLoading()
{
    updateOnPageProducts();
}