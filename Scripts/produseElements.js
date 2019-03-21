export function createElements(){
    var main=document.querySelector("main");

    //Create favourite items section
    var favo =document.createElement("div");
    favo.id="favItems";
    main.appendChild(favo);

    //Create Search Bar
    var main_bar=document.createElement("div");
    var span = document.createElement("span");
    main_bar.id="main-bar";
    var search_wrp=document.createElement("div");
    search_wrp.id="search";
    var search_inp=document.createElement("input");
    search_inp.type="search";
    span.innerHTML="Search everywhere";

    search_wrp.appendChild(span);
    search_wrp.appendChild(search_inp);
    main_bar.appendChild(search_wrp);

    var dv=document.createElement("div");
    dv.id="fc";
    var fav=document.createElement("div");
    fav.id="favourites";
    var img_fav=document.createElement("img");
    img_fav.src="./Images/fav.png";
    var span2 = document.createElement("span");
    span2.innerHTML="0";
    fav.appendChild(span2);
    fav.appendChild(img_fav);
    dv.appendChild(fav);
    var ca=document.createElement("div");
    ca.id="cart";
    var span3 = document.createElement("span");
    span3.innerHTML="0";
    var img_ca=document.createElement("img");
    img_ca.src="./Images/cart.png";
    ca.appendChild(span3);
    ca.appendChild(img_ca);
    dv.appendChild(ca);
    main_bar.appendChild(dv);

    main.appendChild(main_bar);

    //Create selectors from list;
    var main_sort=document.createElement("div")
    main_sort.id="sort";
    /*
    var span4=document.createElement("span");
    span4.innerHTML="Obiecte de arta/";
    */
    var span4=document.createTextNode("Obiecte de arta/");
    var span5=document.createElement("span");
    span5.id="nrProduse";
    /*
    var span6=document.createElement("span");
    span6.innerHTML="Produse";
    */
    var span6 = document.createTextNode("Produse");
    main_sort.appendChild(span4);
    main_sort.appendChild(span5);
    main_sort.appendChild(span6);

    var select_wrp=document.createElement("div");
    select_wrp.id="select";
    for(var i=0;i<3;i++)
    {
        var wrp=document.createElement("form");
        wrp.classList.add("selector");
        var spanS=document.createElement("span");
        var sel=document.createElement("select");
        var op0=document.createElement("option");
        var op1=document.createElement("option");
        var op2=document.createElement("option");
        var op3=document.createElement("option");
        if(i==0)
        {
            sel.id="selectorTip";
            spanS.innerHTML="Tip";
            op1.innerHTML="Pictura"
            op2.innerHTML="Sculptura"
            op3.innerHTML="Abstract"
        }
        else if(i==1)
        {
            sel.id="selectorCurent";
            spanS.innerHTML="Curent Artistic";
            op1.innerHTML="Art Nouveau"
            op2.innerHTML="Pop-art"
            op3.innerHTML="Contemporana"
        }
        else if(i==2)
        {
            sel.id="selectorPentru";
            spanS.innerHTML="Pentru";
            op1.innerHTML="Copii"
            op2.innerHTML="Adolescenti"
            op3.innerHTML="Adulti"
        }
        sel.appendChild(op0);
        sel.appendChild(op1);
        sel.appendChild(op2);
        sel.appendChild(op3);
        wrp.appendChild(spanS);
        wrp.appendChild(sel);
        select_wrp.appendChild(wrp);
    }
    main_sort.appendChild(select_wrp);
    main.appendChild(main_sort);



    //Create side selectors
    var main_side=document.createElement("div");
    main_side.id="wrapper";
    var price=document.createElement("div");
    price.id="price";

    var sideSelector=document.createElement("form");
    sideSelector.classList.add("sideSelector");
    var spanSS=document.createElement("span");
    spanSS.innerHTML="Disponibilitate";
    sideSelector.appendChild(spanSS);
    for(var i=0;i<4;i++)
    {
        var labelSS=document.createElement("label");
        var inputSS=document.createElement("input");
        var testNode;
        if(i==0)
        {
            testNode="In Stoc";
            inputSS.type="checkbox";
            inputSS.id="selectorStoc";
            inputSS.name="dis1";
            inputSS.value="In Stoc";
        }
        else if(i==1)
        {
            testNode="Promotii";
            inputSS.type="checkbox";
            inputSS.id="selectorProm";
            inputSS.name="dis2";
            inputSS.value="Promotii";
        }
        else if (i==2)
        {
            testNode="Noutati";
            inputSS.type="checkbox";
            inputSS.id="selectorNou";
            inputSS.name="dis3";
            inputSS.value="Noutati";
        }
        else if(i==3)
        {
            testNode="Resigilate";
            inputSS.type="checkbox";
            inputSS.id="selectorRes";
            inputSS.name="dis4";
            inputSS.value="Resigilate";
        }
        labelSS.appendChild(inputSS);
        labelSS.innerHTML+=testNode;
        sideSelector.appendChild(labelSS);
    }
    price.appendChild(sideSelector);

    var sideSelector2=document.createElement("form");
    sideSelector2.classList.add("sideSelector");
    var spanSS2=document.createElement("span");
    spanSS2.innerHTML="Pret";
    sideSelector2.appendChild(spanSS2);

    var labelSS2=document.createElement("label");
    var inputSS2=document.createElement("input");
    inputSS2.type="range";
    inputSS2.id="selectorPret";
    inputSS2.min="0";
    inputSS2.max="3000";
    inputSS2.step="100";
    inputSS2.value="1000";
    labelSS2.appendChild(inputSS2);
    var spanSS3=document.createElement("span");
    spanSS3.innerHTML="1000";
    spanSS3.id="rangePrice";
    sideSelector2.appendChild(labelSS2);
    sideSelector2.appendChild(spanSS3);
    price.appendChild(sideSelector2);

    var sideSelector3=document.createElement("form");
    sideSelector3.classList.add("sideSelector");
    var spanSS4=document.createElement("span");
    spanSS4.innerHTML="Produse pe rand";
    sideSelector3.appendChild(spanSS4);
    for(i=1;i<=4;i++)
    {
        var labelSS3=document.createElement("label");
        var inputSS3=document.createElement("input");
        inputSS3.type="radio";
        inputSS3.name="column";
        inputSS3.value=i;
        if(i==4)
        {
            inputSS3.id="defaultRadio";
        }
        labelSS3.appendChild(inputSS3);
        labelSS3.innerHTML+=i;
        sideSelector3.appendChild(labelSS3);
    }
    price.appendChild(sideSelector3)
    main_side.appendChild(price);
    var produse=document.createElement("div");
    produse.id="produse";
    main_side.appendChild(produse);
    main.appendChild(main_side);

    var complain=document.createElement("form");
    complain.id="complain_form";
    /*
    complain.action="submitComplain.js";
    complain.method="POST";
    */
    var textarea=document.createElement("textarea");
    textarea.style.resize="none";
    textarea.placeholder="Submit your complaints";
    textarea.id="textarea";
    var bttnC=document.createElement("button");
    bttnC.type="button";
    bttnC.innerHTML="Submit";
    bttnC.id="bttnSubmit"
    var bttnR=document.createElement("button");
    bttnR.type="button";
    bttnR.innerHTML="Remove <250";
    bttnR.id="bttnRmv"

    complain.appendChild(textarea);
    complain.appendChild(bttnC);
    complain.appendChild(bttnR);

    main.appendChild(complain);

    //Complain area

    var complainArea=document.createElement("div")
    complainArea.id="complainArea";

    main.appendChild(complainArea);

    document.getElementById("defaultRadio").checked=true;
    document.getElementById("selectorStoc").checked=true;
}
