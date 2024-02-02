const Database = require("./Database")
const Author = require("./entities/Author")
const Book = require("./entities/Book")
const User = require("./entities/User")
const Order = require("./entities/Order")
const Poster = require("./entities/Poster")

module.exports = class App {
    static #database = new Database()

    createUser(name, email, password) {
        const user = new User(name, email, password)
        App.#database.saveUser(user)
    }

    getUsers() {
        return App.#database.find('users')
    }

    createAuthor(name, nationality, bio) {
        const author = new Author(name, nationality, bio)
        App.#database.saveAuthor(author)
    }

    getAuthor() {
        return App.#database.find('authors')
    }

    createBook(title, synopsis, genre, author, description, price, inStock) {
        const book = new Book(title, synopsis, genre, author, description, price, inStock)
        App.#database.saveBook(book)
    }

    addBook(bookName, quantity) {
        App.#database.addBooksToStock(bookName, quantity)
    }

    getBooks() {
        return App.#database.find('books')
    }

    createPoster(name, description, width, height, price, inStock) {
        const poster = new Poster(name, description, width, height, price, inStock)
        App.#database.saveBook(poster)
    }

    addPoster(posterName, quantity) {
        App.#database.addPostersToStock(posterName, quantity)
    }

    getPoster() {
        return App.#database.find('posters')
    }

    createOrder(items, user) {
        const order = new Order(items, user)
        App.#database.saveOrder(order)
        order.data.items.forEach(({product, quantity}) => {
            if (product instanceof Book) {
                App.#database.removeBooksToStock(product.name, quantity)
            } else if (product instanceof Poster) {
                App.#database.removePostersToStock(product.name, quantity)
            }
        })
    }

    getOrder() {
        return App.#database.find('orders')
    }

    showDatabase() {
        App.#database.showStorage()
    }
}