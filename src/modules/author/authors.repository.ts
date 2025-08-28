import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorsRepository extends Repository<Author> {
    constructor(private dataSource: DataSource) {
        super(Author, dataSource.createEntityManager());
    }

    async findWithBooks(): Promise<Author[]> {
        return this.createQueryBuilder('author')
            .leftJoinAndSelect('author.books', 'book')
            .getMany();
    }

    async findOneWithRelations(id: number): Promise<Author | null> {
        return this.createQueryBuilder('author')
            .leftJoinAndSelect('author.books', 'book')
            .where('author.id = :id', { id })
            .getOne();
    }
}
