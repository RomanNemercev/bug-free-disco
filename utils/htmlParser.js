export function parseHtmlToJson(html) {
  if (process.server) return []

  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')

  const sections = []

  doc.body.querySelectorAll('h4').forEach(header => {
    const title = header.textContent.trim()
    const items = []
    let nextElement = header.nextElementSibling

    while (nextElement && nextElement.tagName !== 'H4') {
      if (nextElement.tagName === 'UL') {
        nextElement.querySelectorAll('li').forEach(li => {
          items.push(li.textContent.trim())
        })
      }
      nextElement = nextElement.nextElementSibling
    }

    sections.push({ title, items })
  })

  return sections
}
