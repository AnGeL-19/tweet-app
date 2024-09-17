
type Positions = 'left' | 'right'

interface Props {
    text: string,
    iconRender?: React.JSX.Element
    positionIcon?: Positions
}

export const DataEmpty = ({text, positionIcon, iconRender}: Props) => {
  return (
    <div className={`w-full bg-zinc-200 p-3 rounded flex justify-center ${(positionIcon && positionIcon === 'left') && 'flex-row-reverse'} items-center`}>
        <span className='mx-2'>{text}</span>
        {
            iconRender
        }
    </div>
  )
}
