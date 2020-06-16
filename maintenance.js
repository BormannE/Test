var url = "Indicateurs2.xlsx";
var oReq = new XMLHttpRequest();
oReq.open("GET", url, true);
oReq.responseType = "arraybuffer";

oReq.onload = function(e) {
var arraybuffer = oReq.response;

/* convert data to binary string */
var data = new Uint8Array(arraybuffer);
var arr = new Array();
for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
var bstr = arr.join("");

/* Call XLSX */
var workbook = XLSX.read(bstr, {
    type: "binary"
});

/* DO SOMETHING WITH workbook HERE */
var first_sheet_name = workbook.SheetNames[0];
/* Get worksheet */
var worksheet = workbook.Sheets[first_sheet_name];
var test4 = XLSX.utils.sheet_to_json(worksheet, {
    raw: true
});
var test2 = (JSON.stringify(test4,null,2));
console.log(test2);
var test = JSON.stringify(test2);
console.log(test);
essai(test);
}
        
var z = 0;
var tab2 = [[],[]];
var PAU1;
var number = ["0","1","2","3","4","5","6","7","8","9"];
var alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
function essai(json)
{
    var i = 1;
    while(json[i]!="]")
    {
        i++;
    }
    var taille = i+2;
    for (let j=0;j<taille;j++)
    {
        if (json[j] == "\"")
        {
            if (json[j+1] == ":")
            {
                var taille2 = parseInt(j)+3;
                console.log("j = " + j + " z = " + 3 + " j+z = " + taille2)
                console.log(j);
            
                while (est_dans(number,json[taille2]))
                {
                    console.log(est_dans(number,json[taille2])+ " " + json[taille2] + " " + taille2)
                    tab2[z] += json[taille2];
                    console.log(tab2[z])
                    taille2++;
                }  
                z++;  
            }
        }
    }
    console.log(tab2);
}

function est_dans(tab,x)
{
    for(let k=0;k<tab.length;k++)
    {
        if (x == tab[k])
            return true
    }
    return false
}
oReq.send();

var avis = 500;
var avis_ouverts = 150;
var avis_fermés = 100;
var autres_avis = avis - (avis_fermés + avis_ouverts);
var proportion_avis_ouverts = 0;
var proportion_avis_fermés = 0;
var proportion_avis = 0
proportion();

function proportion()
{
  proportion_avis_ouverts = avis_ouverts / avis;
  proportion_avis_fermés = avis_fermés/avis;
  proportion_avis = 1 - (proportion_avis_ouverts + proportion_avis_fermés);
}

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
dessine_bar_graph();
function dessine_bar_graph()
{
  ctx.beginPath()
  ctx.font = '0.9vw serif';
  ctx.fillStyle = 'black';
  ctx.fillText('900', 10, 10);
  ctx.fillText('450', 10, 75);
  ctx.fillText('900', 10, 10);
  ctx.fillText('450', 10, 75);
  ctx.stroke();
  ctx.beginPath();
  ctx.strokeStyle = 'black';
  ctx.lineWidth = '3';
  ctx.moveTo(35,5);
  ctx.lineTo(297,5);
  ctx.stroke();
  ctx.moveTo(35,71);
  ctx.lineTo(297,71);
  ctx.stroke();
  ctx.restore();
  var max = 150; //taille maximale en pixel
  var hauteur1 = max * proportion_avis_ouverts;
  var hauteur2 = max * proportion_avis;
  var hauteur3 = max * proportion_avis_fermés;
  hauteur2 += hauteur1;
  hauteur3 += hauteur2;
  var hauteurDep = [5,hauteur1,hauteur2];
  var hauteur = [hauteur1,hauteur2,hauteur3];
  var couleur = ['blue','orange','green'];
  var positionX = [51,112,175,242];
  let i=0;
  while (i<4)
  {
  for (let j = 0 ; j<hauteur.length; j++)
  {
    ctx.beginPath();
    ctx.strokeStyle = couleur[j];
    ctx.lineTo(positionX[i], hauteur[j]);
    console.log(positionX[i])
    ctx.stroke();
    ctx.lineTo(positionX[i]+40,hauteur[j]);
    console.log(positionX[i])
    ctx.stroke();
    ctx.lineTo(positionX[i]+40,hauteurDep[j]);
    ctx.stroke();
    ctx.lineTo(positionX[i],hauteurDep[j]);
    ctx.stroke();
    ctx.fillStyle = couleur[j];
    ctx.fill();
    ctx.stroke();
  }
  i++;
  }
}
//---------------------------------------------------------------------------------------------------------------------------------

var slideIndex = 0;
var interval = 3;
var stopCarousel = false;
var timeOut;
carousel();

function carousel() {
  if (!stopCarousel)
  {
  console.log("slideIndex = " + slideIndex);
  var i;
  var x = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < x.length; i++) 
    {
      x[i].style.display = "none";  
    }
  slideIndex++;
  if (slideIndex > x.length)
    {
      slideIndex = 1
    }    
  x[slideIndex-1].style.display = "block";

  for (i = 0; i < dots.length; i++)
    {
      dots[i].className = dots[i].className.replace(" active", "");
    }
  dots[slideIndex-1].className += " active";
  slideIndex = slideIndex%4; //module le nombre de photos
  timeOut = setTimeout(carousel, interval*1000); // Change toutes les intervalles
  }
}

showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  clearTimeout(timeOut);
  showSlides(slideIndex += n);
  timeOut = setTimeout(carousel, interval*1000);
}

// Thumbnail image controls
function currentSlide(n) {
  clearTimeout(timeOut);
  showSlides(slideIndex = n);
  timeOut = setTimeout(carousel, interval*1000);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length)
    {
        slideIndex = 1
    } 
  if (n < 1) 
    {
      slideIndex = slides.length
    }
  for (i = 0; i < slides.length; i++) 
    {
      slides[i].style.display = "none"; 
    }
  for (i = 0; i < dots.length; i++)
    {
      dots[i].className = dots[i].className.replace(" active", "");
    }
  slides[slideIndex-1].style.display = "block"; 
  dots[slideIndex-1].className += " active";
} 

//point en x de l'aiguille
var x = ["35","35","35","36","37","38.5","40","42","44","45","49","53","58","61","65","69","74","78","83","88","92","97","101","105","108","113","117","121","122","124","126","127.5","129","130","131","131","131"];
//point en y de l'aiguille
var y = ["95","91.5","88","84.5","81","77.5","74","70.5","67","65","61.5","58","54.5","53","51","50","49","48","48","48","49","50","51","53","54.5","58","61.5","65","67","70.5","74","77.5","81","84.5","88","91.5","95"];
var test = [20,10]
/*var canvas = document.getElementsByClassName('bar_graph');
for (let i = 0 ; i < canvas.length ; i++)
{
    var ctx = canvas[i].getContext('2d');
    var index2 = 0;
    var x1 = test[i];
    var x2 = parseFloat(x[x1])+70;
    var y2 = y[x1];
    dessine_graph();
}*/

var next = document.getElementById("slideshow");
next.addEventListener("mouseover",function(){
  clearTimeout(timeOut);
  document.getElementsByClassName("next")[0].style.background = "rgba(0,0,0,0.8)";
  document.getElementsByClassName("prev")[0].style.background = "rgba(0,0,0,0.8)";
});

next.addEventListener("mouseout", function(){
  document.getElementsByClassName("next")[0].style.background = "";
  document.getElementsByClassName("prev")[0].style.background = "";
  timeOut = setTimeout(carousel, interval*1000);
});

//----------------------------------------------------------------------------------------------------------------------------------

//partie de la recherche d'infos dans le classeur excel

function UploadProcess() {
  //Reference the FileUpload element.
  var fileUpload = document.getElementById("fileUpload");
  console.log(fileUpload.value);
  var fichier = "Indicateurs2.xlsx";
  //Validate whether File is valid Excel file.
  var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xlsx)$/;
  if (regex.test(fileUpload.value.toLowerCase())) {
      if (typeof (FileReader) != "undefined") {
          var reader = new FileReader();

          //For Browsers other than IE.
          if (reader.readAsBinaryString) {
              reader.onload = function (e) {
                  GetTableFromExcel(e.target.result);
              };
              reader.readAsBinaryString(fileUpload.files[0]);
          } else {
              //For IE Browser.
              reader.onload = function (e) {
                  var data = "";
                  var bytes = new Uint8Array(e.target.result);
                  for (var i = 0; i < bytes.byteLength; i++) {
                      data += String.fromCharCode(bytes[i]);
                  }
                  GetTableFromExcel(data);
              };
              reader.readAsArrayBuffer(fileUpload.files[0]);
          }
      } else {
          alert("This browser does not support HTML5.");
      }
  } else {
      alert("Please upload a valid Excel file.");
  }
};
function GetTableFromExcel(data) {
  //Read the Excel File data in binary
  var workbook = XLSX.read(data, {
      type: 'binary'
  });

  //get the name of First Sheet.
  var Sheet = workbook.SheetNames[0];

  //Read all rows from First Sheet into an JSON array.
  var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[Sheet]);

  //Create a HTML Table element.
  var myTable  = document.createElement("table");
  myTable.border = "1";

  //Add the header row.
  var row = myTable.insertRow(-1);

  //Add the header cells.
  var headerCell = document.createElement("TH");
  headerCell.innerHTML = "PA_U1";
  row.appendChild(headerCell);

  headerCell = document.createElement("TH");
  headerCell.innerHTML = "PA_U2";
  row.appendChild(headerCell);
  
  /*headerCell = document.createElement("TH");
  headerCell.innerHTML = "Age";
  row.appendChild(headerCell);
   
  headerCell = document.createElement("TH");
  headerCell.innerHTML = "Num";
  row.appendChild(headerCell);*/
  var row = myTable.insertRow(-1);
  cell = row.insertCell(-1);
  document.write(excelRows[0].PA_U1);
  //Add the data rows from Excel file.
  /*for (var i = 0; i < excelRows.length; i++) {
      //Add the data row.
      var row = myTable.insertRow(-1);

      //Add the data cells.
      var cell = row.insertCell(-1);
      cell.innerHTML = excelRows[i].Nom;

      cell = row.insertCell(-1);
      cell.innerHTML = excelRows[i].Prénom;
      
      cell = row.insertCell(-1);
      cell.innerHTML = excelRows[i].Age;
      
      cell = row.insertCell(-1);
      cell.innerHTML = excelRows[i].Num;
  }
  

  var ExcelTable = document.getElementById("ExcelTable");
  ExcelTable.innerHTML = "";
  ExcelTable.appendChild(myTable);*/
};

//-----------------------------------------------------------------------------------------------------------------------------

//partie indicateurs

var canvas = document.getElementsByClassName('bar_graph');
for (let i = 0 ; i < canvas.length ; i++)
{
    var ctx = canvas[i].getContext('2d');
    var index2 = 0;
    var x1 = test[i];
    var x2 = parseFloat(x[x1])+70;
    var y2 = y[x1];
    dessine_graph(x2,y2);
}

function dessine_graph()
{
  var tab = [65,225];
  var tab2 = [33,175];
    //dessin du quart rouge
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.arc(150,150,90,(7/4)*Math.PI,2*Math.PI);
    ctx.stroke();
    ctx.lineTo(150,150);
    ctx.stroke();
    ctx.fillStyle = 'red'
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    ctx.beginPath();
    ctx.strokeStyle = 'orange';
    ctx.arc(150,150,90,(3/2)*Math.PI,(7/4)*Math.PI);
    ctx.stroke();
    ctx.lineTo(150,150);
    ctx.stroke();
    ctx.fillStyle = "orange"
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    ctx.beginPath();
    ctx.strokeStyle = 'yellow';
    ctx.arc(150,150,90,(5/4)*Math.PI,(3/2)*Math.PI);
    ctx.stroke();
    ctx.lineTo(150,150);
    ctx.stroke();
    ctx.fillStyle = "yellow"
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    ctx.beginPath();
    ctx.strokeStyle = 'green';
    ctx.arc(150,150,90,Math.PI,(5/4)*Math.PI);
    ctx.stroke();
    ctx.lineTo(150,150);
    ctx.stroke();
    ctx.fillStyle = "green"
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = "20";
    ctx.arc(150,150,10,Math.PI,2*Math.PI);
    ctx.stroke();
    ctx.restore();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(150,144),
    ctx.strokeStyle = 'black';
    ctx.lineWidth = "10";
    ctx.lineTo(88,144);
    ctx.stroke();
    ctx.restore();

    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = "4";
    ctx.arc(150,150,90,Math.PI,2*Math.PI);
    ctx.stroke();
    ctx.lineTo(0,150);
    ctx.stroke();
    ctx.restore();

    ctx.font = '2.2vw serif';
    ctx.fillStyle = 'black';
    ctx.fillText('10', 135, 30);
    ctx.fillText('+20', 245, 150);
    ctx.fillText('0',20,150);
    ctx.restore();

    ctx.font = '2.2vw serif';
    ctx.fillStyle = 'black';
    ctx.fillText('10', 135, 30);
    ctx.fillText('+20', 245, 150);
    ctx.fillText('0',20,150);
    ctx.restore();
  }