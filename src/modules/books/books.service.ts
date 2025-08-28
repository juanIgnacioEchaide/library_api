import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book)
        private readonly booksRepo: Repository<Book>,
    ) { }

    create(input: CreateBookInput): Promise<Book> {
        const book = this.booksRepo.create(input);
        return this.booksRepo.save(book);
    }

    findAll(): Promise<Book[]> {
        return this.booksRepo.find();
    }

    findOne(id: number): Promise<Book | null> {
        return this.booksRepo.findOneBy({ id });
    }

    async update(input: UpdateBookInput): Promise<Book> {
        await this.booksRepo.update(input.id, input);
        return this.findOne(input.id);
    }

    async remove(id: number): Promise<boolean> {
        const result = await this.booksRepo.delete(id);
        return result.affected > 0;
    }
}
