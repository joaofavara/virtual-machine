var reader;
var commands; /* Fila de comandos*/

document.getElementById('inputfile').onchange = function readFileData(){  

    var file = this.files[0];
    reader = new FileReader();
    reader.readAsText(file);
    
    reader.onloadend = function(){
        commands = reader.result.split('\n');
    }
}