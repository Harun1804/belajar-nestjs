import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { BooksService } from "./books.service";
import {CreateBookDto} from "./dto/create-book.dto";
import {UpdateBookDto} from "./dto/update-book.dto";
import {FilterBookDto} from "./dto/filter-book.dto";
import {Books} from "./entity/book.entity";
import {UuidValidationPipe} from "../pipes/uuid-validation.pipe";

@Controller('books')
export class BooksController {
    constructor(private bookService: BooksService) {}

    @Get()
    index(@Query() filter:FilterBookDto) {
        return this.bookService.findAll(filter);
    }

    @Get('/:id')
    async show(@Param('id', UuidValidationPipe) id:string): Promise<Books>{
        return this.bookService.getBookById(id);
    }

    @Post()
    // @UsePipes(ValidationPipe) add validate by component
    async store(@Body() payload:CreateBookDto){
        await this.bookService.storeBook(payload);
        return 'Book Has Been Created';
    }

    @Put('/:id/update')
    async update(@Param('id', UuidValidationPipe) id: string, @Body() payload:UpdateBookDto){
        return await this.bookService.updateBook(id, payload);
    }

    @Delete('/:id/delete')
    async destroy(@Param('id') id: string){
        return await this.bookService.deleteBook(id);
    }
}
