class Library{
    public storage : Book[]
    private password : string | undefined
    constructor(
        public name : string
    ){
        this.storage = []
        this.password = undefined
    }

    addBook(b:Book){
        
    }
    deleteBook(b:Book){
        
    }
    setPassword(){

    }
    changePassword(){

    }
    deletePassword(){

    }
    forgotPassword(){

    }
}

class House extends Array<Library>{
    
    addLibrary = (l:Library) => {
        return this.indexOf(l);
    }
    removeLibrary(l:Library){

    }
    clearHouse(){ // Removes all data
        localStorage.clear()
        window.location.reload();
    }
}

class Book{
    constructor(
        public title :string , 
        public author : string, 
        public read : boolean, 
        public pages? : number, 
        public genre? : string[] , 
        public readDate? : Date, 
        public isbn?: string ){
        }
}

class URLHouseParams extends URLSearchParams{
    isHouse = () =>{    // check every function inside every librarie and book to match the prototype
        const encodedStr = this.get('house')
        if(!encodedStr) return false;
        const decodedStr = decodeURIComponent(encodedStr);
    
        try {
            JSON.parse(decodedStr)
        } catch (err) {
            if (err){
                console.log(err);
                return false;
            }
        }
        const house = JSON.parse(decodedStr);
    
        for(const room of house){
            if(typeof room.name !== 'string'        ||
               room.storage.constructor !== Array   ||
               room.check !== Library.toString()){
                return false
            }
        }
        return house
    }
}

const mainLibrary = new Library('main'),
      testLibrary = new Library('test');


/** Main Flow **/

const recievedURLParams = new URLHouseParams(window.location.search);
const cachedHouse = JSON.parse(localStorage.getItem('house')!)

const house : House = ( recievedURLParams.isHouse() || cachedHouse || new House(mainLibrary) )
console.log(house);




// Reintroduce Classes into parsed objects from Cache or URL 

for(const libraries of house){  
    Object.setPrototypeOf(libraries, Library.prototype)

    for(const book of libraries.storage){
        Object.setPrototypeOf(book, Book.prototype)
    }
}












/** Setters for house retrieval from url/cache **/

localStorage.setItem('house', JSON.stringify(house)); // cache

const encodedHouse = encodeURIComponent(JSON.stringify(house)) // url



/** Functions **/











      



const googleApiKey = 'AIzaSyBbLoGrfBpVZrXlPHSeFkLniUZzG0o8NI8'
const test_isbn = '9789568268992'
const inputText = 'Lezama+Lima+Paradiso'



async function testi(){

    // const test_via_isbn = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${test_isbn}&key=${googleApiKey}`,{
    //     method: 'GET'
    // })

    const test_search = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${inputText}&key=${googleApiKey}`,{
        method: 'GET'
    })

    // fs.writeFileSync('/media/martincito/freedom/repos/minimalist-library/tmp/_response.json', JSON.stringify(await test_search.json()))
}

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
