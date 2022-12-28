import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { BooksService } from "./books.service";
import {CreateBookDto} from "./dto/create-book.dto";
import {UpdateBookDto} from "./dto/update-book.dto";
import {FilterBookDto} from "./dto/filter-book.dto";

@Controller('books')
export class BooksController {
    constructor(private bookService: BooksService) {}

    @Get()
    index(@Query() filer:FilterBookDto) {
        return this.bookService.getBooks(filer);
    }

    @Get('/:id')
    show(@Param('id') id:string){
        return this.bookService.getBook(id);
    }

    @Post()
    // @UsePipes(ValidationPipe) add validate by component
    store(@Body() payload:CreateBookDto){
        return this.bookService.storeBook(payload);
    }

    @Put('/:id/update')
    update(@Param('id') id: string, @Body() payload:UpdateBookDto){
        return this.bookService.updateBook(id, payload);
    }

    @Delete('/:id/delete')
    destroy(@Param('id') id: string){
        return this.bookService.deleteBook(id);
    }
}
