class Library{
    storage: Book[]

    constructor(){
        this.storage = []
    }
}

class Book{

    title: string;
    author : string;
    read : boolean
    pages? : number;
    genre? : string[] | undefined;
    readDate? : Date | undefined;
    isbn?: string | undefined
    
    constructor(title :string , author : string, read : boolean, pages? : number, genre? : string[] , readDate? : Date, isbn?: string ){
        this.title = title
        this.author = author,
        this.read = read;
        this.pages = pages;
        this.genre = genre,
        this.readDate = readDate,
        this.isbn = isbn;
    }
}

const mainLibrary = new Library,
      sideLibrary = new Library;



const googleApiKey = 'AIzaSyBbLoGrfBpVZrXlPHSeFkLniUZzG0o8NI8'


const test = fetch(`https://www.googleapis.com/books/v1/volumes?q=search+terms&key=${googleApiKey}`,{
    method: 'GET'
})

test.then((c)=>console.log(c))

















const bookGenres = [
    "Mystery",
    "Thriller",
    "Science Fiction",
    "Fantasy",
    "Romance",
    "Historical Fiction",
    "Biography",
    "Autobiography",
    "Memoir",
    "Self-Help",
    "Travel",
    "Science",
    "Dystopian",
    "Adventure",
    "Children's Literature",
    "Young Adult",
    "Classic",
    "Poetry",
    "Drama",
    "Comedy",
    "Satire",
    "Crime",
    "Suspense",
    "Detective",
    "Espionage",
    "Legal",
    "Psychological",
    "Gothic",
    "Paranormal",
    "Space Opera",
    "Cyberpunk",
    "Alternate History",
    "Time Travel",
    "High Fantasy",
    "Urban Fantasy",
    "Epic Fantasy",
    "Historical Fantasy",
    "Magical Realism",
    "Fairy Tales",
    "Mythology",
    "Philosophy",
    "Religion",
    "Spirituality",
    "Cookbooks",
    "Essays",
    "History",
    "Science",
    "Psychology",
    "Sociology",
    "Politics",
    "Economics",
    "True Crime",
    "Sports",
    "Art",
    "Music",
    "Film",
    "Fashion",
    "Food and Drink",
    "Technology",
    "Computer Science",
    "Mathematics",
    "Astronomy",
    "Biology",
    "Chemistry",
    "Physics",
    "Environmental Science",
    "Cultural Studies",
    "Literary Theory",
    "Gender Studies",
    "Race and Ethnicity",
    "LGBT+ Studies",
    "Political Science",
    "Autobiography",
    "Biography",
    "Memoir",
    "Letters",
    "Diaries",
    "Essay",
    "Speech",
    "Lecture",
    "Sermon",
    "Journalism",
    "Reference",
    "Encyclopedia",
    "Dictionaries",
  ];
  
