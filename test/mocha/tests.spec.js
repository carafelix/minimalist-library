//#region copy-paste import lol

var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
class Library {
  constructor(name) {
    this.name = name;
    this.addBook = (b) => {
      this.storage.push(b);
    };
    this.deleteBook = (b) => {
      const index = this.storage.indexOf(b);
      this.storage.splice(index, 1);
    };
    this.nameToId = () => {
      return this.name.replace(/\s/g, "-").toLowerCase();
    };
    this.getBookFromID = () => {};
    this.storage = [];
  }
}
class House extends Array {
  constructor() {
    super(...arguments);
    this.renameLibrary = () => {};
    this.getIndexOfLibrary = () => {};
    this.sortHouseBySelectedLibrary = (l) => {
      this.sort((a, b) => (a == l ? -1 : 1));
    };
    this.setPassword = (pass) => {
      this.password = pass;
    };
    this.changePassword = (pass) => {};
    this.deletePassword = () => {
      this.password = undefined;
    };
    this.forgotPassword = () => {};
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
      alert("Max Libraries amount reached");
      return;
    }
    let l;
    do {
      l = prompt("Input new library name");
      if (l === "foo") l = "notFoo";
    } while (this.includesDuplicates(l));
    if (!l) return;
    this.push(new Library(l));
  }
  setDOMlibrary(l) {
    const anchorTemplate = document.getElementById("lib-template");
    nav === null || nav === void 0
      ? void 0
      : nav.appendChild(anchorTemplate.content.cloneNode(true));
    const anchor = document.getElementById("foo-library");
    anchor.setAttribute("href", `#${l.nameToId()}`);
    anchor.setAttribute("id", `${l.nameToId()}-library`);
    anchor.innerText = `${l.name}`;
    anchor.addEventListener("click", () => {
      this.sortHouseBySelectedLibrary(l);
    });
  }
  unsetDOMlibrary(l) {
    const domL = document.getElementById(l.nameToId());
    if (!domL) return "not okay";
    nav === null || nav === void 0 ? void 0 : nav.removeChild(domL);
  }
  includesDuplicates(inputName) {
    if (!inputName) return false;
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
      const reduce_Uint8 = new TextEncoder()
        .encode(str)
        .reduce((a, b) => a + b);
      return `${reduce_Uint8 + new Date().getTime()}`;
    };
    this.getMainGenre = () => {
      var _a;
      if ((_a = this.genre) === null || _a === void 0 ? void 0 : _a[0]) {
        return this.genre[0];
      }
    };
    this.getThisBookIfMatches = (inputID) => {
      if (inputID === this.id) return this;
    };
    this.setAddScreenValues = () => {
      var _a;
      const div = document.getElementById("book-info");
      if (!div) return;
      div.innerText = `\nPages: ${this.pages}${
        this.genre
          ? `\nGenres: ${
              (_a = this.genre) === null || _a === void 0
                ? void 0
                : _a.join(" ")
            }`
          : ""
      }${this.description ? `\nDescription:\n${this.briefDescription()}` : ""}`;
      let imgEl = document.getElementById("book-img");
      if (!imgEl) {
        imgEl = new Image();
        imgEl.setAttribute("alt", "book-cover");
        imgEl.setAttribute("src", this.img.href);
        div.insertBefore(imgEl, div.firstChild);
      } else {
        imgEl.setAttribute("src", this.img.href);
      }
    };
    this.briefDescription = () => {
      if (this.description)
        return this.description.split(" ").slice(0, 25).join(" ") + "...";
    };
    this.id = this.setId();
    if (this.img.protocol === "http:") this.img.protocol = "https:";
  }
}

class dropdownBooks {
  constructor(title, value, volume) {
    this.title = title;
    this.value = value;
    this.volume = volume;
    this.googleVolumeInfoToBook = () => {
      var _a, _b;
      return new Book(
        this.volume.title,
        this.volume.authors ? this.volume.authors.join(", ") : "unknown",
        false,
        (
          (_a = this.volume.imageLinks) === null || _a === void 0
            ? void 0
            : _a.thumbnail
        )
          ? new URL(this.volume.imageLinks.thumbnail)
          : new URL(
              "https://raw.githubusercontent.com/carafelix/minimalist-library/main/assets/placeholder.png"
            ),
        this.volume.pageCount,
        this.volume.categories,
        (
          (_b = this.volume.industryIdentifiers) === null || _b === void 0
            ? void 0
            : _b[0]
        )
          ? this.volume.industryIdentifiers[0]
          : undefined,
        this.volume.description
      );
    };
  }
}
class URLHouseParams extends URLSearchParams {
  constructor() {
    super(...arguments);
    this.isHouse = () => {
      const encodedStr = this.get("house");
      if (!encodedStr) return false;
      const decodedStr = decodeURIComponent(encodedStr);
      try {
        JSON.parse(decodedStr);
      } catch (err) {
        if (err) {
          console.log(err);
          return false;
        }
      }
      const house = JSON.parse(decodedStr);
      for (const room of house) {
        if (
          typeof room.name !== "string" ||
          room.storage.constructor !== Array ||
          room.check !== Library.toString()
        ) {
          return false;
        }
      }
      return house;
    };
  }
}
/** Main Flow **/
const recievedURLParams = new URLHouseParams(window.location.search);
const cachedHouse = JSON.parse(localStorage.getItem("house"));
const mainLibrary = new Library("Main Library");
const house =
  recievedURLParams.isHouse() || cachedHouse || new House(mainLibrary);
// Reintroduce Classes into parsed objects from Cache or URL
for (const libraries of house) {
  Object.setPrototypeOf(libraries, Library.prototype);
  for (const book of libraries.storage) {
    Object.setPrototypeOf(book, Book.prototype);
  }
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
//#endregion
console.log(mocha);
console.log(chai);
console.log(house);
