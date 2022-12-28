import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import { BooksService } from "./books.service";

@Controller('books')
export class BooksController {
    constructor(private bookService: BooksService) {}

    @Get()
    index(@Query('title') title:string, @Query('author') author:string, @Query('category') category:string) {
        return this.bookService.getBooks(title, author, category);
    }

    @Get('/:id')
    show(@Param('id') id:string){
        return this.bookService.getBook(id);
    }

    @Post()
    store(@Body('title') title:string, @Body('author') author:string, @Body('category') category:string){
        return this.bookService.storeBook(title, author, category)
    }

    @Put('/:id/update')
    update(@Param('id') id: string, @Body('title') title:string, @Body('author') author:string, @Body('category') category:string){
        return this.bookService.updateBook(id, title, author, category);
    }

    @Delete('/:id/delete')
    destroy(@Param('id') id: string){
        return this.bookService.deleteBook(id);
    }
}
