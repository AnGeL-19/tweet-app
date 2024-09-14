
import { Link } from 'react-router-dom';

interface Props {
    text: string;
}

export const HastagText = ({ text }:Props) => {
  
    // Expresión regular para encontrar hashtags
  const hashtagRegex = /#(\w+)/g;

  // Dividimos el texto en partes y generamos los elementos de React
  const parts = text.split(hashtagRegex);
  
    return (
    <p className='text-darkPrimary text-base my-5'>
        {
            parts.map((part, index) => {
                // Si la parte empieza con #, la convertimos en un enlace
                if (text.match(hashtagRegex) && index % 2 !== 0) {
                  return (
                    <Link className='text-blue-400 font-medium hover:underline' key={index} to={`/explore?search=${part}`}>
                      #{part}
                    </Link>
                  );
                }
                // De lo contrario, mostramos la parte normal del texto
                return part;
            })
        }
    </p>
  )
}
