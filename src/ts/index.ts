import Tagify from './modules/tagify/dist/tagify'


localStorage.clear()
class Library{
    public storage : Book[]
    constructor(
        public name : string,
        private password? : string

    ){
        this.storage = []
    }

    addBook = (b:Book) => {
        this.storage.push(b);
    }
    deleteBook = (b:Book) => {
        const index = this.storage.indexOf(b)
        this.storage.splice(index,1);
    }

    getBookFromID = () => {
        
    }

    setPassword = () => {

    }
    changePassword = () => {

    }
    deletePassword = () => {

    }
    forgotPassword = () => {

    }
}

class House extends Array<Library>{
    
    addLibrary = (l:Library) => {
        this.push(l);
    }
    removeLibrary(l:Library){
        const index = this.indexOf(l);
        this.splice(index,1);
    }
    
    clearHouse(){ // Removes all data
        localStorage.clear()
        window.location.reload();
    }
}

class Book{
    public id;
    public value;
    constructor(
        public title :string , 
        public author : string, 
        public read : boolean, 
        public pages? : number, 
        public genre? : string[] , 
        public img? : URL, 
        public isbn?: string ){
            this.id = this.setId()
            this.value = this.title
        }

    private setId = () => {
                    const str = this.title + this.author + this.read;                           
                    const reduce_Uint8 = (new TextEncoder()).encode(str).reduce((a,b)=>a+b)
                    return `${reduce_Uint8 + (new Date).getTime()}`
    }

    getMainGenre = () => {
        if(this.genre?.[0]){
            return this.genre[0]
        }
    }

    getThisBookIfMatches = (inputID:string) =>{
        if(inputID === this.id) return this;
    }
}

class URLHouseParams extends URLSearchParams{
    isHouse = () =>{    // TO-DO check every function inside every librarie and book to match the prototype
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
      testLibrary = new Library('test'),
      xxxLibrary  = new Library('xxx');



/** Main Flow **/

const recievedURLParams = new URLHouseParams(window.location.search);
const cachedHouse = JSON.parse(localStorage.getItem('house')!)

const house : House = ( recievedURLParams.isHouse() || cachedHouse || new House(mainLibrary) )


// Reintroduce Classes into parsed objects from Cache or URL 

for(const libraries of house){  
    Object.setPrototypeOf(libraries, Library.prototype)

    for(const book of libraries.storage){
        Object.setPrototypeOf(book, Book.prototype)
    }
}

// DOM declarations
const body = document.querySelector('body')
const main = document.querySelector('main');
        main?.addEventListener('mousedown', () => { 
            const newBookForm = document.getElementById('new-book-form')
            const tagifyDropdown = document.querySelector('.tagify__dropdown')
            if(newBookForm) main.removeChild(newBookForm);
            if(tagifyDropdown) body?.removeChild(tagifyDropdown);
        })

const addBookTemplate = document.getElementById('new-book-template') as HTMLTemplateElement

const ground = document.getElementById('ground');
    
const addBookBtn = document.getElementById('add-book')
        addBookBtn?.addEventListener('click',(ev) => {
            ev.stopPropagation()
            main?.appendChild(addBookTemplate.content.cloneNode(true))

            const addBookForm = document.getElementById('new-book-form')
            addBookForm?.addEventListener('mousedown',(ev)=> ev.stopPropagation())

            const select = document.getElementById('genres') as HTMLInputElement
            if(select) new Tagify(select, {
                whitelist: bookGenres,
                dropdown : tagifyDropdown
            })


            const title = document.getElementById('title') as HTMLInputElement
            let titleSelect:any;  // idk why i couldn't import types and 
            if(title){
                titleSelect = new Tagify(title,{
                    enforceWhitelist: true,
                    mode: "select",
                    whitelist: [""],
                    dropdown : tagifyDropdown,

                    callbacks: {
                        "input": (e:any) => {
                            if(e.detail.value.length > 1){

                                titleSelect.loading(true).dropdown.hide()

                                const searchResults = googleGET(e.detail.value)
                                searchResults.then((r)=>r.json())
                                             .then((data)=>data)
                                             .then((o)=>o.items)
                                             .then((books)=>{
                                                return books.map((b:any)=>b.volumeInfo)
                                             })
                                             .then((volumes:[])=>{
                                                return volumes.map((v:any)=>{
                                                    return new Book(
                                                        v.title,
                                                        (v.authors) ? v.authors.join(', ') : 'unknown',
                                                        false,
                                                        v.pageCount,
                                                        v.categories,
                                                        (v.imageLinks?.thumbnail) ? v.imageLinks.thumbnail : 'assets/placeholder.png'
                                                        )
                                                })
                                             }).then((reformated)=>{
                                                titleSelect.whitelist = reformated

                                             }).then((v)=>{
                                                titleSelect.loading(false).dropdown.show(v)
                                             })
                                             
                                             
                            }

                        }
                    }
                    
                })
            }
        })







const harry = new Book('harry el potter','la señora', true, undefined , undefined , new URL('https://www.codewars.com'));






// *** test's ***

const test : House = ( recievedURLParams.isHouse() || cachedHouse || new House() )

test.addLibrary(mainLibrary)
test.addLibrary(testLibrary)
test.addLibrary(xxxLibrary)

// *** END ***












/** Setters for house retrieval from url/cache **/

localStorage.setItem('house', JSON.stringify(house)); // cache

const encodedHouse = encodeURIComponent(JSON.stringify(house)) // url



/** Functions **/

// google api calls

const googleApiKey = 'AIzaSyBbLoGrfBpVZrXlPHSeFkLniUZzG0o8NI8'
const test_isbn = '9789568268992'
const inputText = 'Lezama+Lima+Paradiso'


async function googleGET(input:string){

    // const test_via_isbn = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${test_isbn}&key=${googleApiKey}`,{
    //     method: 'GET'
    // })

    const general_search = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${input}&key=${googleApiKey}&langRestrict=en`,{
        method: 'GET'
    })

    return general_search

}




// tagify options


const tagifyDropdown = {
    classname       : "color-blue",
    enforceWhitelist: true,
    enabled         : 2,              // show the dropdown immediately on focus
    maxItems        : 5,
    closeOnSelect   : true,          // keep the dropdown open after selecting a suggestion
    searchKeys      : ["title", "author"]
}



      


async function digestPassword(password:string) { // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest

    const msgUint8 = new TextEncoder().encode(password);                      // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);       // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer));                 // convert buffer to byte array
    const hashHex = hashArray
                              .map((b) => b.toString(16).padStart(2, "0"))
                              .join("");                                      // convert bytes to hex string
    return hashHex;
  }



const bookGenres = ["Mystery","Thriller","Science Fiction","Fantasy","Romance","Historical Fiction","Biography","Autobiography","Memoir","Self-Help","Travel","Science","Dystopian","Adventure","Children's Literature","Young Adult","Classic","Poetry","Drama","Comedy","Satire","Crime","Suspense","Detective","Espionage","Legal","Psychological","Gothic","Paranormal","Horror","Space Opera","Cyberpunk","Alternate History","Time Travel","High Fantasy","Urban Fantasy","Epic Fantasy","Historical Fantasy","Magical Realism","Fairy Tales","Mythology","Philosophy","Religion","Spirituality","Cookbooks","Essays","History","Psychology","Sociology","Politics","Economics","True Crime","Sports","Art","Music","Film","Fashion","Food and Drink","Technology","Computer Science","Mathematics","Astronomy","Biology","Chemistry","Physics","Environmental Science","Cultural Studies","Literary Theory","Gender Studies","Race and Ethnicity","LGBT+ Studies","Political Science","Autobiography","Biography","Memoir","Letters","Diaries","Essay","Speech","Lecture","Sermon","Journalism","Reference","Encyclopedia","Dictionaries"];

