import {Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {CreateBookDto} from "./dto/create-book.dto";
import {UpdateBookDto} from "./dto/update-book.dto";
import {FilterBookDto} from "./dto/filter-book.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Books} from "./entity/book.entity";
import {Repository} from "typeorm";

@Injectable()
export class BooksService {
    constructor(@InjectRepository(Books) private bookRepository: Repository<Books>) {}

    findAll(filter: FilterBookDto): Promise<Books[]>{
        return this.bookRepository.find();
    }

    async storeBook(createBookDto: CreateBookDto){
        const { title, author, category, year} = createBookDto;
        const book = this.bookRepository.create();
        book.title = title;
        book.author = author;
        book.category = category;
        book.year = year;

        try {
            await book.save();
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }

    async getBookById(id:string): Promise<Books>{
        const book = await this.bookRepository.findOneBy({id});
        if(!book){
            throw new NotFoundException(`Book with id ${id} not found`)
        }

        return book;
    }

    async updateBook(id:string, updateBookDto:UpdateBookDto){
        const { title, author, category, year } = updateBookDto;
        const book = await this.getBookById(id);

        book.title = title;
        book.author = author;
        book.category = category;
        book.year = year

        await book.save()
    }

    async deleteBook(id:string){
        const book = await this.bookRepository.delete(id);

        if (book.affected == 0) {
            throw new NotFoundException(`Book with id ${id} not found`)
        }
    }


    // private books: any[] = [];

    // getBooks(filter: FilterBookDto) :any[] {
        // const { title, author, category, min_year, max_year } = filter;
        // const books = this.books.filter((book) => {
        //     if(title && book.title != title){
        //         return false;
        //     }
        //     if(author && book.author != author){
        //         return false;
        //     }
        //     if(category && book.category != category){
        //         return false;
        //     }
        //     if(min_year && book.year < min_year){
        //         return false;
        //     }
        //     if(max_year && book.year > max_year){
        //         return false;
        //     }
        //
        //     return true;
        // });
        //
        // return books;
    // }

    // getBook(id:string){
    //     const bookIdx = this.findBook(id);
    //     return this.books[bookIdx];
    // }
    //
    // storeBook(createBookDto: CreateBookDto){
    //     const { title, author, category, year } = createBookDto;
    //     this.books.push({
    //         id: uuidv4(),
    //         title,
    //         author,
    //         category,
    //         year
    //     });
    //     return `Book has been created`;
    // }
    //
    // updateBook(id:string, updateBookDto:UpdateBookDto){
    //     const { title, author, category, year } = updateBookDto;
    //     const bookIdx = this.findBook(id);
    //     this.books[bookIdx].title = title;
    //     this.books[bookIdx].author = author;
    //     this.books[bookIdx].category = category;
    //     this.books[bookIdx].year = year;
    //
    //     return `Book with id ${id} has been updated`;
    // }
    //
    // findBook(id:string){
    //     const bookIdx = this.books.findIndex((book) => book.id === id);
    //     if(bookIdx === -1){
    //         throw new NotFoundException(`Book with id ${id} not found`)
    //     }
    //
    //     return bookIdx;
    // }
    //
    // deleteBook(id:string){
    //     const bookIdx = this.findBook(id);
    //     this.books.splice(bookIdx,1);
    // }
}
