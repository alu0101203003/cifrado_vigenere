var alfabeto = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

// --------------- Funciones principales ----------------- \\

function encriptar (){
	var datos = get_datos('encriptar');
	var mensaje = datos.mensaje;
	var clave = datos.clave;
	var mensaje_cifrado = cifrar(clave,mensaje,alfabeto);
	var resultado = print_mensaje(mensaje_cifrado);
	prompt("Este es su mensaje encriptado:",resultado);
}

function desencriptar (){
	var datos = get_datos('desencriptar');
	var mensaje_cifrado = datos.mensaje;
	var clave = datos.clave;
	var mensaje_descifrado = descifrar(clave,mensaje_cifrado,alfabeto);
	var resultado = print_mensaje(mensaje_descifrado);
	prompt("Este es su mensaje desencriptado:",resultado);
}

// --------------------------------------------------------- \\

var cifrar = function(clave,mensaje,alfabeto) {
	var alfabeto_codificado = asign_num_letra(alfabeto);
	var mensaje_cifrado = [];
    mensaje_cifrado.length = mensaje.length;
    var clave_sz = clave.length;
    var cont = 0;
    for (var i=0; i < mensaje.length; i++) {
        var pos,pos_cl,pos_ms = 0;
        pos_cl = get_num(alfabeto_codificado,clave[cont]);
        pos_ms = get_num(alfabeto_codificado,mensaje[i]);
        pos = (pos_cl + pos_ms)%26;
        if (cont + 1 == clave_sz) {
            cont = 0;
        }
        else {
            cont += 1;
        }
        mensaje_cifrado[i] = get_char(alfabeto_codificado, pos);
    }
    return mensaje_cifrado;
}
var descifrar = function(clave,mensaje_cifrado,alfabeto) {
	var alfabeto_codificado = asign_num_letra(alfabeto);
	var mensaje_descifrado = [];
    mensaje_descifrado.length = mensaje_cifrado.length;
    var clave_sz = clave.length;
    var cont = 0;
    for (var i=0; i < mensaje_cifrado.length; i++) {
        var pos,pos_cl,pos_ms = 0;
        pos_cl = get_num(alfabeto_codificado,clave[cont]);
        pos_ms = get_num(alfabeto_codificado,mensaje_cifrado[i]);
		pos = (pos_ms - pos_cl)%26;
		if (pos < 0){  // si la operacion da un resultado negativo hay que sumar el módulo
            pos = pos + 26;
        }
        if (cont + 1 == clave_sz) {
            cont = 0;
        }
        else {
            cont += 1;
        }
        mensaje_descifrado[i] = get_char(alfabeto_codificado, pos);
    }
    return mensaje_descifrado;
}

var print_mensaje = function(mensaje) {
	var mensaje_string = mensaje.join("");
	return mensaje_string;
}
var get_datos = function(opt){
	var clave = prompt("Inserte la clave que desea usar en mayusculas", "CLAVE");
	if (opt = 'encriptar') {
		var mensaje = prompt("Inserte el mensaje a encriptar en mayusculas", "MENSAJE A ENCRIPTAR");
	}
	else if (opt = 'desencriptar') {
		mensaje = prompt("Inserte el mensaje a desencriptar en mayusculas", "MENSAJE A DESENCRIPTAR");
	}
	clave = clave.replaceAll(' ', '');
	clave = clave.split('');
	mensaje = mensaje.replaceAll(' ', '');
	mensaje = mensaje.split('');

	var datos = {
		mensaje: mensaje,
		clave: clave
	};
	return datos;
}

var get_clave = function(){
	var clave = prompt("Inserte la clave que desea usar en mayusculas", "CLAVE");
	clave = clave.replaceAll(' ', '');
	clave = clave.split('');
	return clave
}
var get_mensaje = function(opt){
	if (opt = 'encriptar') {
		var mensaje = prompt("Inserte el mensaje a encriptar en mayusculas", "MENSAJE A ENCRIPTAR");
	}
	else if (opt = 'desencriptar') {
		mensaje = prompt("Inserte el mensaje a desencriptar en mayusculas", "MENSAJE A DESENCRIPTAR");
	}
	mensaje = mensaje.replaceAll(' ', '');
	mensaje = mensaje.split('');
	return mensaje
}
var asign_num_letra = function (alfabeto) {
	var alf_sz = alfabeto.length;
	var asignacion = [];
	asignacion.length = alfabeto.length;
	for (var i = 0; i < alf_sz; i++) {
		var elemento = {
			num: i,
			char: alfabeto[i]
		};
		asignacion[i] = elemento;
	}
	return asignacion;
}

var get_num = function(v, letra){
    var i = 0;
    while (i < v.length){
        pos = v[i];
        if ( pos.char == letra ){
            return pos.num;
        }
        else{
            i++;
        }
    }
    return 0;
}

var get_char = function(v, numero){
    var i = 0;
    while (i < v.length){
        pos = v[i];
        if ( pos.num == numero ){
            return pos.char;
        }
        else{
            i++;
        }
    }
    return 0;
}
