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