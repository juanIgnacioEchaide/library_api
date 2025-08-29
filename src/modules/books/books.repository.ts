import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksRepository {
    constructor(
        @InjectRepository(Book)
        private readonly bookRepo: Repository<Book>,
    ) { }

    async findWithAuthors(): Promise<Book[]> {
        return this.bookRepo.find({
            relations: ['authors'],
        });
    }

    async findOneWithRelations(id: number): Promise<Book | null> {
        return this.bookRepo.findOne({
            where: { id },
            relations: ['authors'],
        });
    }

    async createBook(data: Partial<Book>): Promise<Book> {
        const book = this.bookRepo.create(data);
        return this.bookRepo.save(book);
    }

    async updateBook(id: number, data: Partial<Book>): Promise<Book | null> {
        await this.bookRepo.update(id, data);
        return this.findOneWithRelations(id);
    }

    async removeBook(id: number): Promise<void> {
        await this.bookRepo.delete(id);
    }
}
