export class Potter {
    price = 8;
    discounts = [0, 0.05, 0.1, 0.2, 0.25];
    basket: Book[] = [];

    checkout(): number {
        const qtyOfPacksBySize = this.sortBooksInPacks(
            this.sortBooksByQtyOfRepeatingNumbers()
        );
        let total = 0;

        for (let pack = 0; pack < qtyOfPacksBySize.length; pack++) {
            if (qtyOfPacksBySize[pack] > 0) {
                const numberOfBooksInPack = pack + 1;

                const applicableDiscount = this.discounts[pack];

                const subtotal = numberOfBooksInPack * this.price;

                const discountedPriceForPack =
                    subtotal - subtotal * applicableDiscount;

                total += qtyOfPacksBySize[pack] * discountedPriceForPack;
            }
        }
        return total;
    }

    sortBooksInPacks(booksByQtyOfNumbers: number[]): number[] {
        const packs: number[] = new Array(this.discounts.length + 1).fill(0);

        for (let qty = 0; qty < booksByQtyOfNumbers.length; qty++) {
            if (booksByQtyOfNumbers[qty] > 0) {
                packs[qty] = booksByQtyOfNumbers[qty];
                booksByQtyOfNumbers = booksByQtyOfNumbers.map((q) => {
                    return q > 0 ? q - booksByQtyOfNumbers[qty] : q;
                });
            }
        }
        return packs.reverse();
    }

    sortBooksByQtyOfRepeatingNumbers(): number[] {
        const qtyOfBooksByNumber: number[] = new Array(
            this.discounts.length + 1
        ).fill(0);

        this.basket.forEach((b) => {
            qtyOfBooksByNumber[b.number] += 1;
        });
        return qtyOfBooksByNumber.sort();
    }

    createBook(bookNumber: number): Book {
        return new Book(bookNumber);
    }

    addToBasket(book: Book) {
        this.basket.push(book);
    }
}

class Book {
    constructor(public number: number) {}
}