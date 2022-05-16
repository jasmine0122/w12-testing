export class Game {
    class Book {
        constructor(protected bookNumber: number) {}
    }
    basket: Book[] = [];

    checkout(): number {
        return -1;
    }

    createBook(bookNumber: number): Book {
        return new Book(bookNumber);
    }

    addToBasket(book: Book) {
        this.basket.push(book);   

    }
}
