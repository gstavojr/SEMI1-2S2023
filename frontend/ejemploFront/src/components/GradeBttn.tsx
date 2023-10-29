import { FC, CSSProperties, ChangeEvent } from 'react';
import { gradeStudents } from '../helpers/handleFile';

interface GradeBttnProps {
  style?: CSSProperties;
  onMessageChange: (msg: string) => void;
}

type HtmlInputEvent = ChangeEvent<HTMLInputElement>;

export const GradeBttn: FC<GradeBttnProps> = ({
  style = { width: '100%' },
  onMessageChange
}) => {

  const onClick = async (e: HtmlInputEvent) => {
    if (!e.target.files || e.target.files === null) return;
    console.log(e.target.files)
    onMessageChange('Calificando...');
    
    const file = e.target.files[0];
    await gradeStudents(file)
    
    onMessageChange('Calificado con exito!');

  };

  return (
    <>
      <input onChange={async (e) => await onClick(e)} style={{}} type="file" accept=".csv" />
    </>
  );
};
