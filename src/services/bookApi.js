const API_URL = 'https://openlibrary.org/search.json'

export async function searchBooks(query) {
  const response = await fetch(
    `${API_URL}?q=${encodeURIComponent(query)}&limit=40`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch books')
  }

  const data = await response.json()

  return data.docs || []
}

export async function getCategoryBookCount(query) {
  const response = await fetch(
    `${API_URL}?q=${encodeURIComponent(query)}&limit=40`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch category count')
  }

  const data = await response.json()

  return data.docs?.length || 0
}

export function normalizeBook(book, forcedCategory = null) {
  const subjects = book.subject || []
  const subjectText = subjects.join(' ').toLowerCase()

  let category = forcedCategory || 'Non-Fiction'

  if(!forcedCategory){
  if(
    subjectText.includes('fiction') ||
    subjectText.includes('fantasy') ||
    subjectText.includes('romance') ||
    subjectText.includes('mystery') ||
    subjectText.includes('thriller') ||
    subjectText.includes('science fiction')
  ) {
    category = 'Fiction'
  } else if (
    subjectText.includes('computer') ||
    subjectText.includes('programming') ||
    subjectText.includes('technology') ||
    subjectText.includes('software') ||
    subjectText.includes('engineering') ||
    subjectText.includes('science')
  ) {
    category = 'Science & Tech'
  } else if (
    subjectText.includes('business') ||
    subjectText.includes('management') ||
    subjectText.includes('marketing') ||
    subjectText.includes('finance') ||
    subjectText.includes('economics')
  ) {
    category = 'Business'
  } else if (
    subjectText.includes('self help') ||
    subjectText.includes('self-improvement') ||
    subjectText.includes('personal development') ||
    subjectText.includes('motivation')
  ) {
    category = 'Self Help'
  } else if (
    subjectText.includes('history') ||
    subjectText.includes('historical')
  ) {
    category = 'History'
  } else if (
    subjectText.includes('health') ||
    subjectText.includes('fitness') ||
    subjectText.includes('exercise') ||
    subjectText.includes('nutrition')
  ) {
    category = 'Health & Fitness'
  } else if (
    subjectText.includes('biography') ||
    subjectText.includes('autobiography') ||
    subjectText.includes('memoir')
  ) {
    category = 'Biography'
  } else if (
    subjectText.includes('art') ||
    subjectText.includes('music') ||
    subjectText.includes('painting') ||
    subjectText.includes('culture') ||
    subjectText.includes('photography')
  ) {
    category = 'Arts & Culture'
  }
}

  return {
    id: book.key,
    title: book.title || 'Unknown Title',
    author: book.author_name?.join(', ') || 'Unknown Author',
    cat: category,
    year: book.first_publish_year || 'N/A',
    description: 'No description available.',
    image: book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      : '',
    status: 'available'
  }
}
