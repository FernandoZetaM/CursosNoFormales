// opciones para cuando vaya a 'incribir'
const options = {
    idCurso: {
        demand: true, // (para los obligatorios) || default: [valor] (para indicar valor por defecto)
        alias: 'i'
    },
    nombreInteresado: {
        demand: true, // (para los obligatorios)
        alias: 'n'
    },
    cedula: {
        demand: true, // (para los obligatorios)
        alias: 'c'
    }
};

// argmentos desde la línea de comandos
const argv = require('yargs')
             .command('inscribir', 'Incribirse a un curso', options)
             .argv;


// listado de listadoCursos desde js externo
const { listadoCursos }= require('./listadoCursos');

// para escribir el archivo de salida
const fs = require('fs');


if (argv.i === undefined) {
    MostrarCursos();
}
else {
    let curso = listadoCursos.find(c => c.id === argv.i);

    console.log();

    if (curso !== undefined) {
        let contenidoArchivo = `El estudiante [ ${argv.n} ], identificado con cédula [ ${argv.c} ]\n`;
        contenidoArchivo += `se ha inscrito con éxito en el curso [ ${curso.nombre} ]\n`;
        contenidoArchivo += `con una duración de [ ${curso.duracion} ] y un costo de [ $ ${curso.valor} ].\n`;
        
        // mostrar salida en pantalla
        console.log(contenidoArchivo);

        // registrar en archivo
        fs.writeFile( `Inscripcion - ${argv.n}.txt`, contenidoArchivo, err => {
            if (err) throw (err);

            console.log('Archivo creado con éxito.');
        });
    }
    else {
        console.log(`El id ingresado [ ${argv.i} ] no corresponde con ningún curso.`);

        MostrarCursos();
    }
}


function MostrarCursos(){
    console.log();
    console.log('======================================');
    console.log('|   INFORMACIÓN CURSOS DISPONIBLES   |');
    console.log('======================================');
    console.log();

    setTimeout(() => {
        for (let i = 0; i < listadoCursos.length; i++) {
            setTimeout(() => {
                console.log();
                console.log('Id:', listadoCursos[i].id);
                console.log('Nombre:', listadoCursos[i].nombre);
                console.log('Duración:',  listadoCursos[i].duracion);
                console.log('Valor: $',  listadoCursos[i].valor);
                console.log('-------------------------------------');        
            }, 2000 * i);
        }
    }, 2000);
}