export const clickOutside = (event: MouseEvent, ref: any, callback: () => void) => {
    const handleClick = () => {
        const target = event.target;
        if (ref.value) {
            console.log('ref', ref.value)
            callback()
        }
    }
    document.addEventListener('mousedown', handleClick)
}

export function capitalize( str: String) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}