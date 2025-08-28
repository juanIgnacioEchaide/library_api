import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksRepository extends Repository<Book> {
    constructor(private dataSource: DataSource) {
        super(Book, dataSource.createEntityManager());
    }

    async findWithAuthors(): Promise<Book[]> {
        return this.createQueryBuilder('book')
            .leftJoinAndSelect('book.authors', 'author')
            .getMany();
    }

    async findOneWithRelations(id: number): Promise<Book | null> {
        return this.createQueryBuilder('book')
            .leftJoinAndSelect('book.authors', 'author')
            .where('book.id = :id', { id })
            .getOne();
    }
}
