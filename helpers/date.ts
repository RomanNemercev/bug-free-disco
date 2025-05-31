export const dateStringToDots = (dateString: string) => {
    const date = new Date(dateString)
    let options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    }
    return  date.toLocaleString('ru', options)
}