import { parse } from 'papaparse';
import { students } from '../data/listado-estudiantes';
import { Note, NoteStudent } from '../interfaces/estudiante';



const readFile = (file: File): Promise<any[]> => {

  return new Promise( resolve => {

    parse(file, {
      complete: ( results ) => {
        resolve(results.data);
      },
      header: true,
      skipEmptyLines: true,
    });

  });


};


export const gradeStudents = async ( file: File ): Promise<boolean> => {

  const grades = await readFile(file) as NoteStudent[];

  return new Promise( resolve => {

    const newGrades = students.map( student => ({
      grupo:  student.grupo,
      carnet: student.carnet,
      nombre: student.nombre,
      nota  : grades.find( grade => grade.carnet === student.carnet )?.nota || '0'
    }));



    saveFileCSV(newGrades, file.name.split('.')[0]);
    resolve(true);
  
  });


};

const saveFileCSV = ( notes: any[], nameFile: string ) => {
  
  const encabezados = Object.keys(notes[0]);
  const contenidoCSV = [encabezados.join(',')];

  notes.forEach( note => {
    const filasCSV = encabezados.map( key => note[key] );
    contenidoCSV.push(filasCSV.join(','));
  });

  const contenidoCodificado = new TextEncoder().encode(contenidoCSV.join('\n'));
  const csvBlob = new Blob([contenidoCodificado], { type: 'text/csv; charset=utf-8' });

  const url = window.URL.createObjectURL(csvBlob);

  const enlace = document.createElement('a');
  enlace.href = url;
  enlace.download = `${nameFile.toUpperCase()}-CALIFICADO.csv`;

  enlace.click();

  window.URL.revokeObjectURL(url);

};