var M; /* Pilha de dados */
var i = 0;  /* Indice da fila de comandos */
var s = 0; /* Indice da pilha de dados */

function execute(command){

    if (command.split(' ').length > 2){
        return -1;
    }

    operation = command.split(' ')[0];
    parameters = command.split(' ')[1];

    switch(operation){

        case 'LDC':
            s = s + 1;
            M[s] = parameters;
            break;
        
        case 'LDV':
            s = s + 1;
            M[s] = M[s];
            break;

        case 'ADD':
            M[s-1] = M[s-1] + M[s];
            s = s - 1;
            break;

        case 'SUB':
            M[s-1] = M[s-1] - M[s];
            s = s - 1;
            break;
        
        case 'MULT':
            M[s-1] = M[s-1] * M[s];
            s = s - 1;
            break;

        case 'DIVI':
            M[s-1] = M[s-1] / M[s];
            s = s - 1;
            break;

        case 'INV':
            M[s] = (-1) * M[s];
            break;
        
        case 'AND':
            if(M[s-1] == 1 && M[s] == 1){
                M[s-1] = 1;
            }
            else{
                M[s-1] = -1;
            }
            s = s-1;
            break;

        case 'OR':
            if(M[s-1] == 1 || M[s] == 1){
                M[s-1] = 1;
            }
            else{
                M[s-1] = -1;
            }
            s = s-1;
            break;

        case 'NEG':
            M[s] = 1 - M[s];
            break;
        
        case 'CME':
            if(M[s-1] < M[s]){
                M[s-1] = 1;
            }
            else{
                M[s-1] = -1;
            }
            s = s-1;
            break;

        case 'CMA':
            if(M[s-1] > M[s]){
                M[s-1] = 1;
            }
            else{
                M[s-1] = -1;
            }
            s = s-1;
            break;

        case 'CEQ':
            if(M[s-1] == M[s]){
                M[s-1] = 1;
            }
            else{
                M[s-1] = -1;
            }
            s = s-1;
            break;
        
        case 'CDIF':
            if(M[s-1] != M[s]){
                M[s-1] = 1;
            }
            else{
                M[s-1] = -1;
            }
            s = s-1;
            break;

        case 'CMEQ':
            if(M[s-1] <= M[s]){
                M[s-1] = 1;
            }
            else{
                M[s-1] = -1;
            }
            s = s-1;
            break;

        case 'CMAQ':
            if(M[s-1] >= M[s]){
                M[s-1] = 1;
            }
            else{
                M[s-1] = -1;
            }
            s = s-1;
            break;
        
        case 'START':
            s = -1;
            break;

        case 'HLT':
            break;

        case 'STR':
            M[parameters] = M[s];
            s = s - 1;
            break;
        
        case 'JMP':
            i = parameters;
            break;

        case 'JMPF':
            if(M[s] == 0){
                i = parameters;
            }
            else{
               i = i + 1; 
            }
            break;

        case 'NULL':
            break;

        case 'RD':
            /*S = S + 1;
            M[S] = "Entrada do teclado";*/
            break;

        case 'PRN':
            /*Imprimir M[S]*/
            console.log(M[s]);
            s = s + 1;
            break;

        case 'ALLOC':
            m = parameters.split(',')[0];
            n = parameters.split(',')[1];
    
            for(var K = 0; K < n[1]; K++){
                s + 1;
                M[s] = M[m + K];
            }
            break;
        
        case 'DALLOC':
            m = parameters.split(',')[0];
            n = parameters.split(',')[1];
    
            for(var K = n - 1; K <= 0; K--){
                M[m + K] = M[s];
                s - 1;
            }
            break;

        case 'CALL':
            s = s + 1;
            M[s] = i + 1;
            i = parameters;
            break;

        case 'RETURN':
            i = M[s];
            s = s - 1;
            break;

    }
}