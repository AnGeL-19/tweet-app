
export const formatNumber = (number: number, text: string): string => {

    const formatted =  new Intl.NumberFormat().format(number);

    if (number.toString().length === 1) {
      return `${number} ${text}`
    } else if(number.toString().length <= 3){
      return `${formatted.split(',')[0]} ${text}s`
    }else if (number.toString().length > 3 && number.toString().length < 6) {
      return `${formatted.split(',')[0]}K ${text}s`
    }else{
      return `${formatted.split(',')[0]}M ${text}s`
    }  
}