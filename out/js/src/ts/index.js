var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Tagify from 'tagify';
localStorage.clear();
class Library {
    constructor(name, initialBooks) {
        this.name = name;
        this.initialBooks = initialBooks;
        this.addBook = (b) => {
            this.storage.push(b);
        };
        this.deleteBook = (b) => {
            const index = this.storage.indexOf(b);
            this.storage.splice(index, 1);
        };
        this.nameToId = () => {
            return this.name.replace(/\s/g, '-').toLowerCase();
        };
        this.isDuplicateBook = (incomingBook) => {
            for (const book of this.storage) {
                if (incomingBook.author === book.author &&
                    incomingBook.title === book.title) {
                    return true;
                }
            }
            return false;
        };
        this.getBookFromID = () => {
        };
        this.storage = (initialBooks || []);
    }
}
class House extends Array {
    constructor() {
        super(...arguments);
        this.renameLibrary = () => {
        };
        this.getIndexOfLibrary = () => {
        };
        this.sortHouseBySelectedLibrary = (l) => {
            this.sort((a, b) => a === l ? -1 : 1);
        };
        this.setPassword = (pass) => {
            this.password = pass;
        };
        this.changePassword = (pass) => {
        };
        this.deletePassword = () => {
            this.password = undefined;
        };
        this.forgotPassword = () => {
        };
    }
    removeLibrary(l) {
        const index = this.indexOf(l);
        this.splice(index, 1);
    }
    clearHouse() {
        localStorage.clear();
        window.location.reload();
    }
    createLibrary() {
        if (house.length >= 5) {
            alert('Max Libraries amount reached');
            return;
        }
        let l;
        do {
            l = prompt('Input new library name');
            if (l === 'foo')
                l = 'notFoo';
        } while (this.isDuplicateLibrary(l));
        if (!l)
            return;
        const newBornLibrary = new Library(l);
        this.push(newBornLibrary);
        return newBornLibrary;
    }
    pushDOMlibrary(l) {
        const anchorTemplate = document.getElementById('lib-template');
        nav === null || nav === void 0 ? void 0 : nav.appendChild(anchorTemplate.content.cloneNode(true));
        const anchor = document.getElementById('foo-library');
        anchor.setAttribute('href', `#${l.nameToId()}`);
        anchor.setAttribute('id', `${l.nameToId()}-library`);
        anchor.innerText = `${l.name} Library`;
        anchor.addEventListener('click', () => {
            this.sortHouseBySelectedLibrary(l);
            const allAnchors = document.querySelectorAll('.libraries');
            allAnchors.forEach(a => {
                a.classList.remove('active');
            });
            anchor.classList.add('active');
        });
        if (l === house[0])
            anchor.classList.add('active'); // set the first library as active when the DOM loads for the first time
    }
    popDOMlibrary(l) {
        const domL = document.getElementById(l.nameToId());
        if (!domL)
            return 'not okay';
        nav === null || nav === void 0 ? void 0 : nav.removeChild(domL);
    }
    isDuplicateLibrary(inputName) {
        if (!inputName)
            return false;
        for (const l of this) {
            if (l.name == inputName) {
                return true;
            }
        }
        return false;
    }
}
class Book {
    constructor(title, author, read, img, pages, genre, isbn, description) {
        this.title = title;
        this.author = author;
        this.read = read;
        this.img = img;
        this.pages = pages;
        this.genre = genre;
        this.isbn = isbn;
        this.description = description;
        this.setId = () => {
            const str = this.title + this.author;
            const reduce_Uint8 = (new TextEncoder()).encode(str).reduce((a, b) => a + b);
            return `${reduce_Uint8 + (new Date).getTime()}`;
        };
        this.getMainGenre = () => {
            var _a;
            if ((_a = this.genre) === null || _a === void 0 ? void 0 : _a[0]) {
                return this.genre[0];
            }
        };
        this.getThisBookIfMatches = (inputID) => {
            if (inputID === this.id)
                return this;
        };
        this.setAddScreenValues = () => {
            var _a;
            const div = document.getElementById('book-info');
            if (!div)
                return;
            div.innerText =
                `\nPages: ${this.pages}${(this.genre) ? `\nGenres: ${(_a = this.genre) === null || _a === void 0 ? void 0 : _a.join(' ')}` : ''}${(this.description) ? `\nDescription:\n${this.briefDescription()}` : ''}`;
            let imgEl = document.getElementById('book-img');
            if (!imgEl) {
                imgEl = new Image();
                imgEl.setAttribute('alt', 'book-cover');
                imgEl.setAttribute('src', this.img.href);
                div.insertBefore(imgEl, div.firstChild);
            }
            else {
                imgEl.setAttribute('src', this.img.href);
            }
        };
        this.briefDescription = () => {
            if (this.description)
                return this.description.split(' ').slice(0, 25).join(' ') + '...';
        };
        this.id = this.setId();
        if (this.img.protocol === 'http:')
            this.img.protocol = 'https:';
    }
}
class selectTagify extends Tagify {
    constructor() {
        super(...arguments);
        // const googleApiKey = 'AIzaSyBbLoGrfBpVZrXlPHSeFkLniUZzG0o8NI8'
        this.googleApiKey = 'AIzaSyBLwUmLLP_bdYf4hEY5umKkIf_WgdkOkzQ';
        this.googleGET = (input) => __awaiter(this, void 0, void 0, function* () {
            const general_search = yield fetch(`https://www.googleapis.com/books/v1/volumes?q=${input}&key=${this.googleApiKey}&langRestrict=en&maxResults=40`, {
                method: 'GET'
            });
            return general_search;
        });
    }
}
selectTagify.tagifyDropdownSettings = {
    classname: "color-blue",
    enforceWhitelist: true,
    enabled: 2,
    maxItems: 40,
    closeOnSelect: true,
    searchKeys: ["value", "author"]
};
class preBook {
    constructor(volume) {
        this.volume = volume;
        this.googleVolumeInfoToBook = () => {
            var _a, _b;
            return new Book(this.volume.title, (this.volume.authors) ? this.volume.authors.join(', ') : 'unknown', false, ((_a = this.volume.imageLinks) === null || _a === void 0 ? void 0 : _a.thumbnail) ? new URL(this.volume.imageLinks.thumbnail) : new URL('https://raw.githubusercontent.com/carafelix/minimalist-library/main/assets/placeholder.png'), this.volume.pageCount, this.volume.categories, ((_b = this.volume.industryIdentifiers) === null || _b === void 0 ? void 0 : _b[0]) ? this.volume.industryIdentifiers[0] : undefined, this.volume.description);
        };
    }
}
class dropdownBooks extends preBook {
    constructor(title, value, volume) {
        super(volume);
        this.title = title;
        this.value = value;
        this.volume = volume;
    }
}
class URLHouseParams extends URLSearchParams {
    constructor() {
        super(...arguments);
        this.isHouse = () => {
            const encodedStr = this.get('house');
            if (!encodedStr)
                return false;
            const decodedStr = decodeURIComponent(encodedStr);
            try {
                JSON.parse(decodedStr);
            }
            catch (err) {
                if (err) {
                    console.log(err);
                    return false;
                }
            }
            const house = JSON.parse(decodedStr);
            for (const room of house) {
                if (typeof room.name !== 'string' ||
                    room.storage.constructor !== Array ||
                    room.check !== Library.toString()) {
                    return false;
                }
            }
            return house;
        };
    }
}
import initialMainLibraryBooksJSON from './main_initial.json';
const placeholderBooks = initialMainLibraryBooksJSON.items.map((v) => new preBook(v.volumeInfo).googleVolumeInfoToBook());
/** Main Flow **/
const recievedURLParams = new URLHouseParams(window.location.search);
const cachedHouse = JSON.parse(localStorage.getItem('house'));
const mainLibrary = new Library('Main', placeholderBooks);
export const house = (recievedURLParams.isHouse() || cachedHouse || new House(mainLibrary));
console.log(mainLibrary);
// Reintroduce Classes into parsed objects from Cache or URL 
for (const libraries of house) {
    Object.setPrototypeOf(libraries, Library.prototype);
    for (const book of libraries.storage) {
        Object.setPrototypeOf(book, Book.prototype);
    }
}
// DOM declarations and manipulaiton
const body = document.querySelector('body');
const ground = document.querySelectorAll('.hidable');
const nav = document.getElementById('libraries-div');
// re-populate old libraries into nav
house.forEach((l) => house.pushDOMlibrary(l));
const addLibraryBtn = document.getElementById('new-library-btn');
addLibraryBtn === null || addLibraryBtn === void 0 ? void 0 : addLibraryBtn.addEventListener('click', () => {
    const newBorn = house.createLibrary();
    if (!newBorn)
        return;
    house.pushDOMlibrary(newBorn);
});
const main = document.querySelector('main');
main === null || main === void 0 ? void 0 : main.addEventListener('mousedown', () => {
    DOMremoveNewBookDiv();
});
const addBookTemplate = document.getElementById('new-book-template');
const addBookBtn = document.getElementById('add-book');
addBookBtn === null || addBookBtn === void 0 ? void 0 : addBookBtn.addEventListener('click', (ev) => {
    ev.stopPropagation();
    body === null || body === void 0 ? void 0 : body.classList.add('opaque');
    ground === null || ground === void 0 ? void 0 : ground.forEach(n => n.classList.add('hide'));
    main === null || main === void 0 ? void 0 : main.appendChild(addBookTemplate.content.cloneNode(true));
    const addBookDiv = document.getElementById('new-book-div');
    addBookDiv === null || addBookDiv === void 0 ? void 0 : addBookDiv.addEventListener('mousedown', (ev) => ev.stopPropagation());
    const addBookForm = document.getElementById('new-book-form');
    const title = document.getElementById('title');
    if (!title)
        return;
    const titleSelect = new selectTagify(title, {
        enforceWhitelist: true,
        mode: "select",
        whitelist: [""],
        dropdown: selectTagify.tagifyDropdownSettings,
        callbacks: {
            "input": (e) => {
                if (e.detail.value.length > 1) {
                    titleSelect.loading(true).dropdown.hide();
                    titleSelect.googleGET(e.detail.value)
                        .then((r) => r.json())
                        .then((data) => {
                        const volumes = data.items;
                        const g_volumeInfo = volumes.map((b) => b.volumeInfo);
                        return g_volumeInfo.map((volume) => {
                            return new dropdownBooks((volume === null || volume === void 0 ? void 0 : volume.description) ? volume.description : '', ((volume.title.length >= 80) ? volume.title.slice(0, 80) + '...' : volume.title) +
                                ' —by—\n' +
                                ((volume === null || volume === void 0 ? void 0 : volume.authors) ? volume.authors[0] : 'unknown'), volume);
                        });
                    }).then((reformated) => {
                        titleSelect.whitelist = reformated;
                        titleSelect.loading(false).dropdown.show();
                    });
                }
            },
            "change": () => {
                if (!titleSelect.value[0])
                    return;
                titleSelect.value[0].googleVolumeInfoToBook().setAddScreenValues();
            }
        }
    });
    addBookForm === null || addBookForm === void 0 ? void 0 : addBookForm.addEventListener('submit', (ev) => {
        ev.preventDefault();
        if (!titleSelect.value[0])
            return console.error('select a book lol');
        const selectedBook = titleSelect.value[0].googleVolumeInfoToBook();
        const checkbox = document.querySelector('input[type="checkbox"]');
        selectedBook.read = checkbox.checked;
        // it point always to house[0] and sort house when clicking any library matching that name and put it on [0]
        if (!(house[0].isDuplicateBook(selectedBook))) {
            house[0].addBook(selectedBook);
        }
        DOMremoveNewBookDiv();
        // refresh stand div 
    });
});
const tagifyDropdownSettings = {
    classname: "color-blue",
    enforceWhitelist: true,
    enabled: 2,
    maxItems: 40,
    closeOnSelect: true,
    searchKeys: ["value", "author"]
};
/** Setters for house retrieval from url/cache **/
localStorage.setItem('house', JSON.stringify(house)); // cache
const encodedHouse = encodeURIComponent(JSON.stringify(house)); // url
/** Functions **/
// DOM FUNCTIONS
function DOMremoveNewBookDiv() {
    const newBookDiv = document.getElementById('new-book-div');
    const tagifyDropdown = document.querySelector('.tagify__dropdown');
    if (newBookDiv)
        main.removeChild(newBookDiv);
    if (tagifyDropdown)
        body === null || body === void 0 ? void 0 : body.removeChild(tagifyDropdown);
    body === null || body === void 0 ? void 0 : body.classList.remove('opaque');
    ground === null || ground === void 0 ? void 0 : ground.forEach(n => n.classList.remove('hide'));
}
function digestPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        const msgUint8 = new TextEncoder().encode(password); // encode as (utf-8) Uint8Array
        const hashBuffer = yield crypto.subtle.digest("SHA-256", msgUint8); // hash the message
        const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
        const hashHex = hashArray
            .map((b) => b.toString(16)) //.padStart(2, "0"))
            .join(""); // convert bytes to hex string
        return hashHex;
    });
}
function shortlifyURL(url) {
    url.href;
}
// data
const bookGenres = ["Mystery", "Thriller", "Science Fiction", "Fantasy", "Romance", "Historical Fiction", "Biography", "Autobiography", "Memoir", "Self-Help", "Travel", "Science", "Dystopian", "Adventure", "Children's Literature", "Young Adult", "Classic", "Poetry", "Drama", "Comedy", "Satire", "Crime", "Suspense", "Detective", "Espionage", "Legal", "Psychological", "Gothic", "Paranormal", "Horror", "Space Opera", "Cyberpunk", "Alternate History", "Time Travel", "High Fantasy", "Urban Fantasy", "Epic Fantasy", "Historical Fantasy", "Magical Realism", "Fairy Tales", "Mythology", "Philosophy", "Religion", "Spirituality", "Cookbooks", "Essays", "History", "Psychology", "Sociology", "Politics", "Economics", "True Crime", "Sports", "Art", "Music", "Film", "Fashion", "Food and Drink", "Technology", "Computer Science", "Mathematics", "Astronomy", "Biology", "Chemistry", "Physics", "Environmental Science", "Cultural Studies", "Literary Theory", "Gender Studies", "Race and Ethnicity", "LGBT+ Studies", "Political Science", "Autobiography", "Biography", "Memoir", "Letters", "Diaries", "Essay", "Speech", "Lecture", "Sermon", "Journalism", "Reference", "Encyclopedia", "Dictionaries"];
//# sourceMappingURL=index.js.map