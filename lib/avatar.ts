export const getAvatarProps = (data: { avatar?: string; initials?: string; author?: string }) => {
    const { avatar, initials, author } = data

    // Если есть аватар, используем его
    if (avatar) {
        return {
            hasImage: true,
            imageProps: {
                src: avatar,
                alt: author || '',
            },
            fallback: initials || getInitials(author),
        }
    }

    // Если нет аватара, используем инициалы
    return {
        hasImage: false,
        imageProps: {
            src: '',
            alt: '',
        },
        fallback: initials || getInitials(author),
    }
}

export const getInitials = (name?: string) => {
    if (!name) return ''
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
} 