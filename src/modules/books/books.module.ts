import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { Book } from './entities/book.entity';
import { BooksRepository } from './books.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Book])],
    providers: [BooksService, BooksResolver, BooksRepository],
    exports: [BooksRepository],
})
export class BooksModule { }
