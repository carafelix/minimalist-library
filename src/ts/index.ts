import Tagify from 'tagify'

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
    constructor(
        public title : string , 
        public author : string, 
        public read : boolean, 
        public img : URL, 
        public pages? : number, 
        public genre? : string[] , 
        public isbn? : isbn,
        public description? : string ){
            this.id = this.setId()
            if(this.img.protocol === 'http:') this.img.protocol = 'https:';
        }

    private setId = () => {
                    const str = this.title + this.author;                           
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

    setAddScreenValues = () => {
        const div = document.getElementById('book-info');
        if(!div) return;
        div.innerText = 
                        `\nPages: ${this.pages}${(this.genre)? `\nGenres: ${this.genre?.join(' ')}` : '' }${(this.description)? `\nDescription:\n${this.briefDescription()}` : '' }`

        let imgEl = document.getElementById('book-img');

        if(!imgEl){
            imgEl = new Image();
            imgEl.setAttribute('alt','book-cover');
            imgEl.setAttribute('src',this.img.href)
            div.insertBefore(imgEl,div.firstChild)
            
        } else {
            imgEl.setAttribute('src',this.img.href)
        }

    }
    private briefDescription = ()=> {
        if(this.description) return this.description.split(' ').slice(0,25).join(' ') + '...';
    }
}

class selectTagify extends Tagify{

    // const googleApiKey = 'AIzaSyBbLoGrfBpVZrXlPHSeFkLniUZzG0o8NI8'
    private googleApiKey = 'AIzaSyBLwUmLLP_bdYf4hEY5umKkIf_WgdkOkzQ'
    
    googleGET = async (input:string) => {

        const general_search = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${input}&key=${this.googleApiKey}&langRestrict=en&maxResults=40`,{
            method: 'GET'
        })
    
        return general_search
    }
    static tagifyDropdownSettings = {
        classname       : "color-blue",
        enforceWhitelist: true,
        enabled         : 2,              // show the dropdown immediately on focus
        maxItems        : 40,
        closeOnSelect   : true,          // keep the dropdown open after selecting a suggestion
        searchKeys      : ["value", "author"]
    }
}

class dropdownBooks{
    constructor(
        public title : string,
        public value : string,
        public volume : VolumeInfo
    ){}

    googleVolumeInfoToBook = () => {
        return new Book(
            this.volume.title,
            (this.volume.authors) ? this.volume.authors.join(', ') : 'unknown',
            false,
            (this.volume.imageLinks?.thumbnail) ? new URL(this.volume.imageLinks.thumbnail) : new URL('https://raw.githubusercontent.com/carafelix/minimalist-library/main/assets/placeholder.png'),
            this.volume.pageCount,
            this.volume.categories,
            (this.volume.industryIdentifiers?.[0]) ? this.volume.industryIdentifiers[0] : undefined,
            this.volume.description
        )
    }

}




interface isbn{
    type: string,
    identifier: string
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
const ground = document.getElementById('ground');
const main = document.querySelector('main');
        main?.addEventListener('mousedown', () => { 
            const newBookDiv = document.getElementById('new-book-div')
            const tagifyDropdown = document.querySelector('.tagify__dropdown')
            if(newBookDiv) main.removeChild(newBookDiv);
            if(tagifyDropdown) body?.removeChild(tagifyDropdown);
            body?.classList.remove('opaque')
            ground?.classList.remove('hide')
        })

const addBookTemplate = document.getElementById('new-book-template') as HTMLTemplateElement
    
    
const addBookBtn = document.getElementById('add-book')
        addBookBtn?.addEventListener('click',(ev) => {
            ev.stopPropagation()
            body?.classList.add('opaque')
            ground?.classList.add('hide')

            main?.appendChild(addBookTemplate.content.cloneNode(true))
            const addBookDiv = document.getElementById('new-book-div');
                    addBookDiv?.addEventListener('mousedown', (ev) => ev.stopPropagation());

            const addBookForm = document.getElementById('new-book-form');
            const title = document.getElementById('title') as HTMLInputElement;
            if(!title)return;

            const titleSelect = new selectTagify(title,{ // todo - add method to tagify, resolve all any:
                enforceWhitelist: true,
                mode: "select",
                whitelist: [""],
                dropdown : selectTagify.tagifyDropdownSettings,
                callbacks: {
                    "input": (e:CustomEvent<Tagify.Tagify.TagData>) => {
                        if(e.detail.value.length > 1){
                            titleSelect.loading(true).dropdown.hide()

                            titleSelect.googleGET(e.detail.value)
                                             .then((r)=>r.json())
                                             .then((data:googleResponse)=>{
                                                const volumes : googleVolume [] = data.items 
                                                const g_volumeInfo : VolumeInfo[] = volumes.map((b:googleVolume)=>b.volumeInfo)
                                                return g_volumeInfo.map((volume)=>{
                                                    return new dropdownBooks(
                                                        (volume?.description) ? volume.description : '' ,
                                                        ((volume.title.length>=80) ? volume.title.slice(0,80) + '...' : volume.title)       +
                                                                                                                            ' —by—\n'       +
                                                                                ((volume?.authors) ? volume.authors[0] : 'unknown') ,
                                                        volume
                                                    )
                                                })
                                             }).then((reformated : dropdownBooks[])=>{
                                                
                                                titleSelect.whitelist = reformated
                                                titleSelect.loading(false).dropdown.show() 
                                             })
                        }
                    },
                    "change": () => {
                        if(!titleSelect.value[0]) return;
                        titleSelect.value[0].googleVolumeInfoToBook().setAddScreenValues()
                    }
                    
                }
            })

            addBookForm?.addEventListener('submit',(ev)=>{
                ev.preventDefault();
                const selectedBook : Book = titleSelect.value[0].googleVolumeInfoToBook()
                const checkbox = document.querySelector('input[type="checkbox"]') as HTMLInputElement
                    selectedBook.read = checkbox.checked;

                // Should point to the active library, and not to mainLibrary. like check in which state is the nav and do that

                


                })
        })





       





// *** test's ***

const test : House = ( recievedURLParams.isHouse() || cachedHouse || new House() )

test.addLibrary(mainLibrary)
test.addLibrary(testLibrary)
test.addLibrary(xxxLibrary)

// *** END ***




const tagifyDropdownSettings = {
    classname       : "color-blue",
    enforceWhitelist: true,
    enabled         : 2,              // show the dropdown immediately on focus
    maxItems        : 40,
    closeOnSelect   : true,          // keep the dropdown open after selecting a suggestion
    searchKeys      : ["value", "author"]
}




/** Setters for house retrieval from url/cache **/

localStorage.setItem('house', JSON.stringify(house)); // cache

const encodedHouse = encodeURIComponent(JSON.stringify(house)) // url



/** Functions **/




// google api calls


const test_isbn = '9789568268992'
const inputText = 'Lezama+Lima+Paradiso'







// tagify options




      


async function digestPassword(password:string) { // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest

    const msgUint8 = new TextEncoder().encode(password);                      // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);       // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer));                 // convert buffer to byte array
    const hashHex = hashArray
                              .map((b) => b.toString(16))//.padStart(2, "0"))
                              .join("");                                      // convert bytes to hex string
    return hashHex;
  }



const bookGenres = ["Mystery","Thriller","Science Fiction","Fantasy","Romance","Historical Fiction","Biography","Autobiography","Memoir","Self-Help","Travel","Science","Dystopian","Adventure","Children's Literature","Young Adult","Classic","Poetry","Drama","Comedy","Satire","Crime","Suspense","Detective","Espionage","Legal","Psychological","Gothic","Paranormal","Horror","Space Opera","Cyberpunk","Alternate History","Time Travel","High Fantasy","Urban Fantasy","Epic Fantasy","Historical Fantasy","Magical Realism","Fairy Tales","Mythology","Philosophy","Religion","Spirituality","Cookbooks","Essays","History","Psychology","Sociology","Politics","Economics","True Crime","Sports","Art","Music","Film","Fashion","Food and Drink","Technology","Computer Science","Mathematics","Astronomy","Biology","Chemistry","Physics","Environmental Science","Cultural Studies","Literary Theory","Gender Studies","Race and Ethnicity","LGBT+ Studies","Political Science","Autobiography","Biography","Memoir","Letters","Diaries","Essay","Speech","Lecture","Sermon","Journalism","Reference","Encyclopedia","Dictionaries"];

