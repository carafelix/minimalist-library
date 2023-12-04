import Tagify from 'tagify';

localStorage.clear()
class Library{
    public storage : Book[]
    constructor(
        public name : string,
        public initialBooks? : Book[]
    ){
        this.storage = (initialBooks || [])
    }

    addBook = (b:Book) => {
        this.storage.push(b);
    }

    deleteBook = (b:Book) => {
        const index = this.storage.indexOf(b)
        this.storage.splice(index,1);
    }

    clearLibrary = () =>{
        this.storage = [];
    }

    nameToId = () => {
        return this.name.replace(/\s/g, '-').toLowerCase()
    }

    isDuplicateBook = (incomingBook : Book) => {
       for(const book of this.storage){
        if(incomingBook.author === book.author && 
           incomingBook.title === book.title){
            return true
        }
       }
        return false
    }

    DOMpopulateWithBooks = () => {
        const bookTemplate = document.getElementById('book-template') as HTMLTemplateElement;
        const stand = document.getElementById('stand') as HTMLDivElement;
        // unpopulate before adding the new books
        const oldBooks = document.querySelectorAll('.book-container');
                oldBooks.forEach(v=>stand.removeChild(v))

        this.storage.forEach(_=>{
            const book = bookTemplate.content.cloneNode(true) as HTMLSpanElement;
            stand?.appendChild(book)
        })

        const emptyBooks = document.querySelectorAll('.book');
        


        this.storage.forEach((book,i) => {
            emptyBooks[i].setAttribute('data-id', book.id);

            // hover should be inside a dom class ???
            emptyBooks[i].addEventListener('mouseover', (ev)=>{
                ev.stopPropagation();
                const mouse = ev as MouseEvent
                const x = mouse.clientX
                const y = mouse.clientY
                if(!hoverBookDiv) return console.error('Hover Div is non existent');

                book.fillDivWithBookValues('hover-book-div',true,true,true)
                hoverBookDiv.classList.remove('display-none')
                hoverBookDiv.style.left=x+"px";
                hoverBookDiv.style.top=y+"px";
                
            });
        });

        house.saveHouse()

    }

    searchBookMatches = (searchInput : RegExp) : Array<Book["id"]> | null => {
        const matches : Book["id"][] = []
        for (const book of this.storage){
            if(book.author.match(searchInput)){
                matches.push(book.id)
            } else if(book.title.match(searchInput)){
                matches.push(book.id)
            } else if(book.description?.match(searchInput)){
                matches.push(book.id)
            }  // could add genres too 
        }

        if(matches[0]){
            return matches
        } else return null
    }
}

class House extends Array<Library>{
    
    public password? : string
    
    removeLibrary = (l:Library) => {
        if(this.length === 1){
            alert('Cannot delete your last library. Please add a new one and delete this one if you like')
            return
        };
        const index = this.indexOf(l);
        if(index === -1) return;
        const active = this.isActive(l);

            this.splice(index,1);
            this.popDOMlibrary(l);

        if(active){
            const newActiveLibraryAnchor = document.getElementById(`${this[this.length-1].nameToId()}-library`) as HTMLAnchorElement;
            this.setActive(this[this.length-1], newActiveLibraryAnchor)
        }
    }
    
    clearHouse = () => { // Removes all data
        localStorage.clear()
        window.location.reload();
    }
    
    createLibrary = () => {
        if(house.length>=5){
            alert('Max Libraries amount reached')
            return
        }
        let l = prompt('Input new library name');

            if(this.isDuplicateLibrary(l)){
                alert('Please input a non-duplicate library name')
                return
            } else if(!l?.replace(/\s/g,'').length){
                alert('Please input a valid name')
                return
            } else if(!l) return;
              else if(l === 'foo') l = 'notFoo';

              l = l?.trim()
        
        const newBornLibrary = new Library(l)
        this.push(newBornLibrary);
        
        return newBornLibrary
    } 

    pushDOMlibrary = (l:Library) => {
        const anchorTemplate = document.getElementById('lib-template') as HTMLTemplateElement;
              navUl?.appendChild(anchorTemplate.content.cloneNode(true));

        const libraryAnchor = document.getElementById('foo-library') as HTMLAnchorElement;

        libraryAnchor.setAttribute('href', `#${l.nameToId()}`);
        libraryAnchor.setAttribute('id', `${l.nameToId()}-library`)
        libraryAnchor.innerText = `${l.name} Library`

        libraryAnchor.addEventListener('mousedown',() => {
            this.setActive(l,libraryAnchor)
        })
        const deleteBin = document.getElementById('delete-foo');
                deleteBin?.setAttribute('id', `delete-${l.nameToId()}`)
                deleteBin?.addEventListener('mousedown',()=>{
                    this.removeLibrary(l)
                })

        if(l === this?.[0]){ // set the first library as active when the DOM loads for the first time
            libraryAnchor.classList.add('active')
            libraryAnchor.parentElement?.classList.add('active')
        }  
    }

    popDOMlibrary = (l:Library) => {
        const domL = document.getElementById(`delete-${l.nameToId()}`);
        if(!domL) return console.error('Library ID doesnt exist');
        const parentLi = domL.parentElement;
        if(!parentLi) return console.error('There is no parent');
        navUl?.removeChild(domL.parentElement)
    }

    isDuplicateLibrary = (inputName:string | null) => {
        if(!inputName) return true;

       for(const l of this){
        if(l.name == inputName){
            return true
        }
       }
        return false
    }
    saveHouse = () => {
        localStorage.setItem('house', JSON.stringify(this));
    }

    setActive = (l:Library, selectedLibrary: HTMLAnchorElement) => {
        this.sortHouseBySelectedLibrary(l);
        this?.[0].DOMpopulateWithBooks()

        const allAnchors = document.querySelectorAll('.libraries');

        allAnchors.forEach( a => {
            a.classList.remove('active')
            a.parentElement?.classList.remove('active')
        });

        selectedLibrary.classList.add('active');
        selectedLibrary.parentElement?.classList.add('active')
    }

    renameLibrary = () => {

    }

    isActive = (l:Library) => {
        const selectedLibrary = document.getElementById(`${l.nameToId()}-library`);
        return selectedLibrary?.classList.contains('active')
    }

    sortHouseBySelectedLibrary = (l:Library) => {
        this.sort((a,b)=>a===l ? -1 : 1);
    }

    setPassword = (pass:string) => {
        this.password = pass
    }
    changePassword = (pass:string) => {
    }

    deletePassword = () => {
        this.password = undefined
    }
    forgotPassword = () => {

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
        public isbn? : IndustryIdentifier,
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

    fillDivWithBookValues = (idSelector : string, printAuthor? : boolean, printTitle? : boolean, bin? : boolean) => {
        // The book instance should communicate directly with the view? should I decouple and this function return be handle by the library?
        const div = document.getElementById(idSelector);
        if(!div) return;
        div.innerHTML = '';
        
            // Book info should probably be changed to a ul with li instead of this funny string manipulation lol

        div.innerText = `\n${(printTitle) ? 'Title: ' + this.title + '\n' : ''}\
                        ${(printAuthor) ? 'Author: ' + this.author + '\n' : ''}\
                        Pages: ${(this.pages)? this.pages : 'Unknown'}\n\
                        ${(this.genre)? `\nGenres: ${this.genre?.join(' ')}` : '' }\
                        ${(this.description)? `\nDescription:\n${this.briefDescription()}` : '' }`

        let imgEl = document.getElementById('book-img');

        if(!imgEl){
            imgEl = new Image();
            imgEl.setAttribute('alt','book-cover');
            imgEl.setAttribute('src',this.img.href)
            div.insertBefore(imgEl,div.firstChild)
            
        } else {
            imgEl.setAttribute('src',this.img.href)
        }

        if(bin){
            const spanDeleteBin = document.createElement('span');
            spanDeleteBin.classList.add('material-symbols-rounded');
            spanDeleteBin.classList.add('delete')
            spanDeleteBin.innerText = 'delete';
            spanDeleteBin.addEventListener('mousedown', this.confirmBookDeletion)
            div.appendChild(spanDeleteBin)
        }

    }
    private briefDescription = () => {
        if(this.description) return this.description.split(' ').slice(0,25).join(' ') + '...';
    }
    private confirmBookDeletion = () => {
        const confirm = window.confirm('You really want to remove this book from your library?')
        if(!confirm) return;
        
        house[0].deleteBook(this);
        house[0].DOMpopulateWithBooks
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


class preBook{
    constructor(
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

class dropdownBooks extends preBook{
    constructor(
        public title : string,
        public value : string,
        public volume : VolumeInfo
    ){
        super(volume);
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


import initialMainLibraryBooksJSON from './main_initial.json';
import { isatty } from 'tty';

const placeholderBooks : Book[] = initialMainLibraryBooksJSON.items.map((v)=> new preBook(v.volumeInfo).googleVolumeInfoToBook())



/** Main Flow **/

const recievedURLParams = new URLHouseParams(window.location.search);
const cachedHouse = JSON.parse(localStorage.getItem('house')!);
const mainLibrary = new Library('Main', placeholderBooks); // Also used to reintroduce methods into cachedHouse
export const house : House = ( recievedURLParams.isHouse() || cachedHouse || new House(mainLibrary) )


// Reintroduce Classes into parsed objects from Cache or URL 

for(const libraries of house){  
    Object.setPrototypeOf(libraries, Library.prototype)

    for(const book of libraries.storage){
        Object.setPrototypeOf(book, Book.prototype)
    }
}

console.log(mainLibrary);

// DOM declarations and manipulaiton
const body = document.querySelector('body')
const main = document.querySelector('main');

        body?.addEventListener('mousedown', (ev) => { 
            DOMremove_NewBookDiv(ev)
        });
        main?.addEventListener('mouseover', ()=>{
            hoverBookDiv?.classList.add('display-none')
        })
        body?.addEventListener('mousedown', ()=>{
            settingsDiv?.classList.add('hide')
        })

const hidable = document.querySelectorAll('.hidable'),
      navUl = document.getElementById('libraries-ul'),
      hoverBookDiv = document.getElementById('hover-book-div');

        hoverBookDiv?.addEventListener('mouseleave', (ev)=>{
            ev.stopPropagation()
            hoverBookDiv.classList.add('display-none')
        });


const settingsDiv = document.getElementById('sidenav-library-selection')
        settingsDiv?.addEventListener('mousedown', (ev)=>{
            ev.stopPropagation()
        });
        
const settingsBtn = document.getElementById('settings');
        let active = false;
        settingsBtn?.addEventListener('mousedown', (ev) => {
            ev.stopPropagation();
            if(!active){
                settingsDiv?.classList.remove('hide')
                active = true
            } else {
                settingsDiv?.classList.add('hide')
                active = false
            }
        })

// re-populate old libraries into nav

    house.forEach((l)=>house.pushDOMlibrary(l))

// re-populate DOM Books with house[0] library

    house[0].DOMpopulateWithBooks()


const searchBar = document.getElementById('lookup');
        searchBar?.addEventListener('input', (ev)=>{  // should be inside a dom manipulation class

            const books = document.querySelectorAll('.book');
                    books.forEach(b=>{
                            b.classList.remove('match')
                    })

            const input = ev.target as HTMLInputElement;
                if(input.value == '' || input.value == ' ') return ;

            const searchTerm = new RegExp(input.value, 'i');

            const matchingBooks = house[0].searchBookMatches(searchTerm)
            
            if(!matchingBooks) return;

                    matchingBooks.forEach(id => {
                        const targetBook = document.querySelector(`[data-id="${id}"]`)
                        targetBook?.classList.add('match')
                    });
        })


const addLibraryBtn = document.getElementById('new-library-btn');
        addLibraryBtn?.addEventListener('click',()=>{
            const newBorn = house.createLibrary();
            if (!newBorn) return;
            house.pushDOMlibrary(newBorn);
        })

        


const addBookTemplate = document.getElementById('new-book-template') as HTMLTemplateElement
    

    
const addBookBtn = document.getElementById('add-book')
        addBookBtn?.addEventListener('click',(ev) => {
            ev.stopPropagation()
            body?.classList.add('opaque')
            hidable?.forEach(n=>n.classList.add('hide'))

            body?.appendChild(addBookTemplate.content.cloneNode(true))
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
                    "input": (ev:CustomEvent<Tagify.Tagify.TagData>) => {
                        if(ev.detail.value.length > 1){
                            titleSelect.loading(true).dropdown.hide()

                            titleSelect.googleGET(ev.detail.value)
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
                                                titleSelect.loading(false).dropdown.show();
                                                const dropdownItems = document.querySelectorAll('.tagify__dropdown__item')
                                                    dropdownItems.forEach(el=>el.addEventListener('mousedown',(ev)=>ev.stopPropagation()));
                                                    dropdownItems.forEach(el=>el.addEventListener('mouseup',(ev)=>ev.stopPropagation()));
                                                    dropdownItems.forEach(el=>el.addEventListener('click',(ev)=>ev.stopPropagation()));
                                             })
                        }
                    },
                    "change": () => {
                        if(!titleSelect.value[0]) return;
                        titleSelect.value[0].googleVolumeInfoToBook().fillDivWithBookValues('book-info')
                    }
                }
            })

            addBookForm?.addEventListener('submit',(ev)=>{
                ev.preventDefault();
                if(!titleSelect.value[0]) return console.error('select a book lol') ;
                const selectedBook : Book = titleSelect.value[0].googleVolumeInfoToBook();
                const checkbox = document.querySelector('input[type="checkbox"]') as HTMLInputElement
                    selectedBook.read = checkbox.checked;
                
                // it point always to house[0] and sort house when clicking any library matching that name and put it on [0]

                if(!(house[0].isDuplicateBook(selectedBook))){
                    house[0].addBook(selectedBook)
                    house[0].DOMpopulateWithBooks()
                }

                DOMremove_NewBookDiv();

                // refresh stand div 
                
            })
        })


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

// DOM FUNCTIONS

function DOMremove_NewBookDiv(ev?:MouseEvent){
    const target = ev?.target as HTMLDivElement
    if(target?.className == "tagify__dropdown__item tagify__dropdown__item--active tagify__dropdown__item--hidden") return;
    const newBookDiv = document.getElementById('new-book-div')
            const tagifyDropdown = document.querySelector('.tagify__dropdown');
            if(newBookDiv) body!.removeChild(newBookDiv);
            if(tagifyDropdown) body?.removeChild(tagifyDropdown);
            body?.classList.remove('opaque')
            hidable?.forEach(n=>n.classList.remove('hide'))
}


async function digestPassword(password:string) { // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest

    const msgUint8 = new TextEncoder().encode(password);                      // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);       // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer));                 // convert buffer to byte array
    const hashHex = hashArray
                              .map((b) => b.toString(16))//.padStart(2, "0"))
                              .join("");                                      // convert bytes to hex string
    return hashHex;
  }

  function shortlifyURL(url:URL) {
    url.href
  }

  


  // data

const bookGenres = ["Mystery","Thriller","Science Fiction","Fantasy","Romance","Historical Fiction","Biography","Autobiography","Memoir","Self-Help","Travel","Science","Dystopian","Adventure","Children's Literature","Young Adult","Classic","Poetry","Drama","Comedy","Satire","Crime","Suspense","Detective","Espionage","Legal","Psychological","Gothic","Paranormal","Horror","Space Opera","Cyberpunk","Alternate History","Time Travel","High Fantasy","Urban Fantasy","Epic Fantasy","Historical Fantasy","Magical Realism","Fairy Tales","Mythology","Philosophy","Religion","Spirituality","Cookbooks","Essays","History","Psychology","Sociology","Politics","Economics","True Crime","Sports","Art","Music","Film","Fashion","Food and Drink","Technology","Computer Science","Mathematics","Astronomy","Biology","Chemistry","Physics","Environmental Science","Cultural Studies","Literary Theory","Gender Studies","Race and Ethnicity","LGBT+ Studies","Political Science","Autobiography","Biography","Memoir","Letters","Diaries","Essay","Speech","Lecture","Sermon","Journalism","Reference","Encyclopedia","Dictionaries"];

