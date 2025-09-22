// Mock Bible data structure
export interface Translation {
  code: string
  name: string
}

export interface Book {
  id: number
  name: string
  chapters: number
  testament: "old" | "new"
}

export interface Verse {
  number: number
  text: string
}

export interface Chapter {
  number: number
  verses: Verse[]
}

export interface DailyVerse {
  date: string
  verseRef: string
  text: string
  translation: string
}

export interface Bookmark {
  id: string
  verseRef: string
  note?: string
  dateAdded: string
}

export interface ReadingPlan {
  id: string
  title: string
  description: string
  totalDays: number
  days: ReadingPlanDay[]
}

export interface ReadingPlanDay {
  day: number
  readings: string[]
  completed: boolean
}



// Mock translations
export const translations: Translation[] = [
  { code: "KJV", name: "King James Version" },
  { code: "NIV", name: "New International Version" },
  { code: "ESV", name: "English Standard Version" },
]

// Mock books
export const books: Book[] = [
  // Old Testament
  { id: 1, name: "Genesis", chapters: 50, testament: "old" },
  { id: 2, name: "Exodus", chapters: 40, testament: "old" },
  { id: 3, name: "Leviticus", chapters: 27, testament: "old" },
  { id: 4, name: "Numbers", chapters: 36, testament: "old" },
  { id: 5, name: "Deuteronomy", chapters: 34, testament: "old" },
  { id: 6, name: "Joshua", chapters: 24, testament: "old" },
  { id: 7, name: "Judges", chapters: 21, testament: "old" },
  { id: 8, name: "Ruth", chapters: 4, testament: "old" },
  { id: 9, name: "1 Samuel", chapters: 31, testament: "old" },
  { id: 10, name: "2 Samuel", chapters: 24, testament: "old" },
  { id: 11, name: "1 Kings", chapters: 22, testament: "old" },
  { id: 12, name: "2 Kings", chapters: 25, testament: "old" },
  { id: 13, name: "1 Chronicles", chapters: 29, testament: "old" },
  { id: 14, name: "2 Chronicles", chapters: 36, testament: "old" },
  { id: 15, name: "Ezra", chapters: 10, testament: "old" },
  { id: 16, name: "Nehemiah", chapters: 13, testament: "old" },
  { id: 17, name: "Esther", chapters: 10, testament: "old" },
  { id: 18, name: "Job", chapters: 42, testament: "old" },
  { id: 19, name: "Psalms", chapters: 150, testament: "old" },
  { id: 20, name: "Proverbs", chapters: 31, testament: "old" },
  { id: 21, name: "Ecclesiastes", chapters: 12, testament: "old" },
  { id: 22, name: "Song of Solomon", chapters: 8, testament: "old" },
  { id: 23, name: "Isaiah", chapters: 66, testament: "old" },
  { id: 24, name: "Jeremiah", chapters: 52, testament: "old" },
  { id: 25, name: "Lamentations", chapters: 5, testament: "old" },
  { id: 26, name: "Ezekiel", chapters: 48, testament: "old" },
  { id: 27, name: "Daniel", chapters: 12, testament: "old" },
  { id: 28, name: "Hosea", chapters: 14, testament: "old" },
  { id: 29, name: "Joel", chapters: 3, testament: "old" },
  { id: 30, name: "Amos", chapters: 9, testament: "old" },
  { id: 31, name: "Obadiah", chapters: 1, testament: "old" },
  { id: 32, name: "Jonah", chapters: 4, testament: "old" },
  { id: 33, name: "Micah", chapters: 7, testament: "old" },
  { id: 34, name: "Nahum", chapters: 3, testament: "old" },
  { id: 35, name: "Habakkuk", chapters: 3, testament: "old" },
  { id: 36, name: "Zephaniah", chapters: 3, testament: "old" },
  { id: 37, name: "Haggai", chapters: 2, testament: "old" },
  { id: 38, name: "Zechariah", chapters: 14, testament: "old" },
  { id: 39, name: "Malachi", chapters: 4, testament: "old" },

  // New Testament
  { id: 40, name: "Matthew", chapters: 28, testament: "new" },
  { id: 41, name: "Mark", chapters: 16, testament: "new" },
  { id: 42, name: "Luke", chapters: 24, testament: "new" },
  { id: 43, name: "John", chapters: 21, testament: "new" },
  { id: 44, name: "Acts", chapters: 28, testament: "new" },
  { id: 45, name: "Romans", chapters: 16, testament: "new" },
  { id: 46, name: "1 Corinthians", chapters: 16, testament: "new" },
  { id: 47, name: "2 Corinthians", chapters: 13, testament: "new" },
  { id: 48, name: "Galatians", chapters: 6, testament: "new" },
  { id: 49, name: "Ephesians", chapters: 6, testament: "new" },
  { id: 50, name: "Philippians", chapters: 4, testament: "new" },
  { id: 51, name: "Colossians", chapters: 4, testament: "new" },
  { id: 52, name: "1 Thessalonians", chapters: 5, testament: "new" },
  { id: 53, name: "2 Thessalonians", chapters: 3, testament: "new" },
  { id: 54, name: "1 Timothy", chapters: 6, testament: "new" },
  { id: 55, name: "2 Timothy", chapters: 4, testament: "new" },
  { id: 56, name: "Titus", chapters: 3, testament: "new" },
  { id: 57, name: "Philemon", chapters: 1, testament: "new" },
  { id: 58, name: "Hebrews", chapters: 13, testament: "new" },
  { id: 59, name: "James", chapters: 5, testament: "new" },
  { id: 60, name: "1 Peter", chapters: 5, testament: "new" },
  { id: 61, name: "2 Peter", chapters: 3, testament: "new" },
  { id: 62, name: "1 John", chapters: 5, testament: "new" },
  { id: 63, name: "2 John", chapters: 1, testament: "new" },
  { id: 64, name: "3 John", chapters: 1, testament: "new" },
  { id: 65, name: "Jude", chapters: 1, testament: "new" },
  { id: 66, name: "Revelation", chapters: 22, testament: "new" },
]

// Mock verse data for popular passages
export const mockVerses: Record<string, Verse[]> = {
  "John-3": [
    { number: 1, text: "There was a man of the Pharisees, named Nicodemus, a ruler of the Jews:" },
    {
      number: 2,
      text: "The same came to Jesus by night, and said unto him, Rabbi, we know that thou art a teacher come from God: for no man can do these miracles that thou doest, except God be with him.",
    },
    {
      number: 3,
      text: "Jesus answered and said unto him, Verily, verily, I say unto thee, Except a man be born again, he cannot see the kingdom of God.",
    },
    {
      number: 4,
      text: "Nicodemus saith unto him, How can a man be born when he is old? can he enter the second time into his mother's womb, and be born?",
    },
    {
      number: 5,
      text: "Jesus answered, Verily, verily, I say unto thee, Except a man be born of water and of the Spirit, he cannot enter into the kingdom of God.",
    },
    { number: 6, text: "That which is born of the flesh is flesh; and that which is born of the Spirit is spirit." },
    { number: 7, text: "Marvel not that I said unto thee, Ye must be born again." },
    {
      number: 8,
      text: "The wind bloweth where it listeth, and thou hearest the sound thereof, but canst not tell whence it cometh, and whither it goeth: so is every one that is born of the Spirit.",
    },
    { number: 9, text: "Nicodemus answered and said unto him, How can these things be?" },
    {
      number: 10,
      text: "Jesus answered and said unto him, Art thou a master of Israel, and knowest not these things?",
    },
    {
      number: 11,
      text: "Verily, verily, I say unto thee, We speak that we do know, and testify that we have seen; and ye receive not our witness.",
    },
    {
      number: 12,
      text: "If I have told you earthly things, and ye believe not, how shall ye believe, if I tell you of heavenly things?",
    },
    {
      number: 13,
      text: "And no man hath ascended up to heaven, but he that came down from heaven, even the Son of man which is in heaven.",
    },
    {
      number: 14,
      text: "And as Moses lifted up the serpent in the wilderness, even so must the Son of man be lifted up:",
    },
    { number: 15, text: "That whosoever believeth in him should not perish, but have eternal life." },
    {
      number: 16,
      text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
    },
    {
      number: 17,
      text: "For God sent not his Son into the world to condemn the world; but that the world through him might be saved.",
    },
    {
      number: 18,
      text: "He that believeth on him is not condemned: but he that believeth not is condemned already, because he hath not believed in the name of the only begotten Son of God.",
    },
    {
      number: 19,
      text: "And this is the condemnation, that light is come into the world, and men loved darkness rather than light, because their deeds were evil.",
    },
    {
      number: 20,
      text: "For every one that doeth evil hateth the light, neither cometh to the light, lest his deeds should be reproved.",
    },
    {
      number: 21,
      text: "But he that doeth truth cometh to the light, that his deeds may be made manifest, that they are wrought in God.",
    },
  ],
  "Psalms-23": [
    { number: 1, text: "The LORD is my shepherd; I shall not want." },
    { number: 2, text: "He maketh me to lie down in green pastures: he leadeth me beside the still waters." },
    { number: 3, text: "He restoreth my soul: he leadeth me in the paths of righteousness for his name's sake." },
    {
      number: 4,
      text: "Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.",
    },
    {
      number: 5,
      text: "Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over.",
    },
    {
      number: 6,
      text: "Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the LORD for ever.",
    },
  ],
  "Romans-8": [
    {
      number: 1,
      text: "There is therefore now no condemnation to them which are in Christ Jesus, who walk not after the flesh, but after the Spirit.",
    },
    {
      number: 2,
      text: "For the law of the Spirit of life in Christ Jesus hath made me free from the law of sin and death.",
    },
    {
      number: 28,
      text: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose.",
    },
    { number: 31, text: "What shall we then say to these things? If God be for us, who can be against us?" },
    {
      number: 38,
      text: "For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor powers, nor things present, nor things to come,",
    },
    {
      number: 39,
      text: "Nor height, nor depth, nor any other creature, shall be able to separate us from the love of God, which is in Christ Jesus our Lord.",
    },
  ],
}

// Mock daily verses
export const dailyVerses: DailyVerse[] = [
  {
    date: "2024-01-15",
    verseRef: "John 3:16",
    text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
    translation: "KJV",
  },
  {
    date: "2024-01-14",
    verseRef: "Psalms 23:1",
    text: "The LORD is my shepherd; I shall not want.",
    translation: "KJV",
  },
  {
    date: "2024-01-13",
    verseRef: "Romans 8:28",
    text: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose.",
    translation: "KJV",
  },
]

// Mock reading plans
export const readingPlans: ReadingPlan[] = [
  {
    id: "1",
    title: "Read the Bible in 1 Year",
    description:
      "A systematic plan to read through the entire Bible in 365 days with a mix of Old Testament, New Testament, Psalms, and Proverbs each day.",
    totalDays: 365,
    days: Array.from({ length: 365 }, (_, i) => ({
      day: i + 1,
      readings: [
        `Genesis ${Math.floor(i / 12) + 1}:1-25`,
        `Matthew ${Math.floor(i / 28) + 1}:1-20`,
        `Psalm ${(i % 150) + 1}`,
        `Proverbs ${(i % 31) + 1}:1-10`,
      ],
      completed: i < 10, // Mock first 10 days as completed
    })),
  },
  {
    id: "2",
    title: "New Testament in 30 Days",
    description:
      "Read through the entire New Testament in one month with daily readings designed to give you a complete overview of Jesus' life and the early church.",
    totalDays: 30,
    days: Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      readings: [
        i < 15
          ? `Matthew ${Math.floor((i * 28) / 15) + 1} - ${Math.floor(((i + 1) * 28) / 15)}`
          : `Acts ${Math.floor(((i - 15) * 28) / 15) + 1} - ${Math.floor(((i - 14) * 28) / 15)}`,
      ],
      completed: i < 5, // Mock first 5 days as completed
    })),
  },
  {
    id: "3",
    title: "Psalms & Proverbs",
    description:
      "A 31-day journey through wisdom literature, reading one Psalm and one Proverbs chapter each day for practical wisdom and worship.",
    totalDays: 31,
    days: Array.from({ length: 31 }, (_, i) => ({
      day: i + 1,
      readings: [`Psalm ${i + 1}`, `Proverbs ${i + 1}`],
      completed: false,
    })),
  },
  {
    id: "4",
    title: "Life of Jesus",
    description:
      "Follow Jesus' life and ministry through a chronological reading of the four Gospels over 40 days, perfect for Lent or any time of spiritual focus.",
    totalDays: 40,
    days: Array.from({ length: 40 }, (_, i) => ({
      day: i + 1,
      readings: [
        i < 10
          ? `Matthew ${Math.floor(i * 2.8) + 1}:1-20`
          : i < 20
            ? `Mark ${Math.floor((i - 10) * 1.6) + 1}:1-15`
            : i < 30
              ? `Luke ${Math.floor((i - 20) * 2.4) + 1}:1-25`
              : `John ${Math.floor((i - 30) * 2.1) + 1}:1-20`,
      ],
      completed: false,
    })),
  },
]



// Helper functions
export function getBook(bookId: number): Book | undefined {
  return books.find((book) => book.id === bookId)
}

export function getBookByName(name: string): Book | undefined {
  return books.find((book) => book.name.toLowerCase() === name.toLowerCase())
}

export function getChapter(bookName: string, chapterNumber: number): Verse[] {
  const key = `${bookName}-${chapterNumber}`
  return mockVerses[key] || []
}

export function searchVerses(
  query: string,
): Array<{ book: string; chapter: number; verse: number; text: string; ref: string }> {
  const results: Array<{ book: string; chapter: number; verse: number; text: string; ref: string }> = []

  // Simple mock search - in real app this would be more sophisticated
  Object.entries(mockVerses).forEach(([key, verses]) => {
    const [bookName, chapterNum] = key.split("-")
    verses.forEach((verse) => {
      if (verse.text.toLowerCase().includes(query.toLowerCase())) {
        results.push({
          book: bookName ?? "",
          chapter: Number.parseInt(chapterNum ?? ""),
          verse: verse.number,
          text: verse.text,
          ref: `${bookName} ${chapterNum}:${verse.number}`,
        })
      }
    })
  })

  return results
}
