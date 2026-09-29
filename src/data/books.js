export const COVER_PALETTE = [
  ['#1F6E44', '#0C4A2C'],
  ['#C9724F', '#8C4A2E'],
  ['#6C8FAE', '#3E5A73'],
  ['#B98A2E', '#7A5A17'],
  ['#7C5CAE', '#4F3A73'],
  ['#4F8FA6', '#2E5B68'],
  ['#A45252', '#6E3232'],
  ['#5C8C5C', '#375B37']
]

export function coverGradient(index) {
  const c = COVER_PALETTE[index % COVER_PALETTE.length]
  return `linear-gradient(150deg, ${c[0]}, ${c[1]})`
}

export const INITIAL_BOOKS = [
  { id: 1, title: 'Atomic Habits', author: 'James Clear', cat: 'Self Help', year: 2018, pages: 320, rating: 4.6, ratings: 12540, pub: 'Penguin Random House', format: 'PDF, EPUB', status: 'available', desc: 'Tiny changes, remarkable results. No matter your goals, Atomic Habits offers a proven framework for improving, every day.' },
  { id: 2, title: 'The Alchemist', author: 'Paulo Coelho', cat: 'Fiction', year: 1988, pages: 208, rating: 4.5, ratings: 9820, pub: 'HarperOne', format: 'PDF, EPUB', status: 'available', desc: 'A shepherd boy travels from Spain to Egypt in search of treasure, discovering the meaning of his own personal legend along the way.' },
  { id: 3, title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', cat: 'Self Help', year: 2011, pages: 499, rating: 4.4, ratings: 8410, pub: 'Farrar, Straus and Giroux', format: 'PDF', status: 'checked_out', dueDate: '15 May 2024', desc: 'A groundbreaking tour of the mind, explaining the two systems that drive the way we think and make decisions.' },
  { id: 4, title: 'The Psychology of Money', author: 'Morgan Housel', cat: 'Business', year: 2020, pages: 256, rating: 4.7, ratings: 7210, pub: 'Harriman House', format: 'EPUB', status: 'available', desc: 'Timeless lessons on wealth, greed and happiness, exploring the strange ways people think about money.' },
  { id: 5, title: 'Educated', author: 'Tara Westover', cat: 'Biography', year: 2018, pages: 334, rating: 4.7, ratings: 11020, pub: 'Random House', format: 'PDF, EPUB', status: 'available', desc: 'A memoir about a young woman who leaves her survivalist family and pursues a path to education, from the mountains of Idaho to Cambridge.' },
  { id: 6, title: 'Sapiens', author: 'Yuval Noah Harari', cat: 'History', year: 2011, pages: 443, rating: 4.8, ratings: 15230, pub: 'Harvill Secker', format: 'PDF, EPUB', status: 'checked_out', dueDate: '19 May 2024', desc: 'A brief history of humankind, showing how biology and history have defined us and enhanced our understanding of what it means to be human.' },
  { id: 7, title: 'The 5 AM Club', author: 'Robin Sharma', cat: 'Self Help', year: 2018, pages: 336, rating: 4.2, ratings: 5210, pub: 'HarperCollins', format: 'PDF', status: 'checked_out', dueDate: '24 May 2024', desc: 'Own your morning, elevate your life, a story-driven guide to reclaiming your mornings for growth and focus.' },
  { id: 8, title: 'Deep Work', author: 'Cal Newport', cat: 'Business', year: 2016, pages: 296, rating: 4.5, ratings: 6480, pub: 'Grand Central', format: 'PDF, EPUB', status: 'available', desc: 'Rules for focused success in a distracted world, showing how to cultivate deep, undistracted concentration.' },
  { id: 9, title: 'The Silent Patient', author: 'Alex Michaelides', cat: 'Fiction', year: 2019, pages: 336, rating: 4.5, ratings: 9040, pub: 'Celadon Books', format: 'EPUB', status: 'available', desc: 'A psychotherapist becomes obsessed with uncovering the reason behind a woman\'s decision to stop speaking after allegedly murdering her husband.' },
  { id: 10, title: 'Sprint', author: 'Jake Knapp', cat: 'Business', year: 2016, pages: 288, rating: 4.3, ratings: 2980, pub: 'Simon & Schuster', format: 'PDF', status: 'available', desc: 'How to solve big problems and test new ideas in just five days, a method used by the world\'s top companies.' },
  { id: 11, title: "Can't Hurt Me", author: 'David Goggins', cat: 'Self Help', year: 2018, pages: 364, rating: 4.8, ratings: 14320, pub: 'Lioncrest', format: 'PDF, EPUB', status: 'available', desc: 'A retired Navy SEAL shares how he overcame poverty, abuse and self-doubt to become one of the world\'s top endurance athletes.' },
  { id: 12, title: 'A Brief History of Time', author: 'Stephen Hawking', cat: 'Science & Tech', year: 1988, pages: 256, rating: 4.6, ratings: 8760, pub: 'Bantam', format: 'PDF', status: 'available', desc: 'An exploration of cosmology, from the Big Bang to black holes, written for readers without a scientific background.' },
  { id: 13, title: 'Braiding Sweetgrass', author: 'Robin Wall Kimmerer', cat: 'Arts & Culture', year: 2013, pages: 408, rating: 4.8, ratings: 6120, pub: 'Milkweed Editions', format: 'EPUB', status: 'available', desc: 'A botanist and Indigenous scholar weaves plant science together with traditional teachings on reciprocity with the natural world.' },
  { id: 14, title: 'Born a Crime', author: 'Trevor Noah', cat: 'Biography', year: 2016, pages: 304, rating: 4.9, ratings: 10870, pub: 'Spiegel & Grau', format: 'PDF, EPUB', status: 'available', desc: "Stories from a South African childhood, told with humor and heart against the backdrop of apartheid's end." },
  { id: 15, title: 'Why We Sleep', author: 'Matthew Walker', cat: 'Health & Fitness', year: 2017, pages: 368, rating: 4.7, ratings: 7650, pub: 'Scribner', format: 'PDF', status: 'available', desc: "A sleep scientist reveals the vital connections between sleep and health, and offers practical tips for a better night's rest." },
  { id: 16, title: 'The Guns of August', author: 'Barbara Tuchman', cat: 'History', year: 1962, pages: 511, rating: 4.5, ratings: 2140, pub: 'Macmillan', format: 'PDF', status: 'available', desc: 'A Pulitzer Prize-winning account of the first month of World War I, and the miscalculations that led armies to war.' }
]
