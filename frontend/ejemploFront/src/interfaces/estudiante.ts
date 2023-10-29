export interface Student {
  carnet: string;
  grupo: string;
  nombre: string;
};


export interface NoteStudent {
  carnet: string;
  nota: string;
};

export interface Note extends Student {
  nota: string;
}