import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorsRepository {
    constructor(
        @InjectRepository(Author)
        private readonly authorRepo: Repository<Author>,
    ) { }

    async findWithBooks(): Promise<Author[]> {
        return this.authorRepo.find({
            relations: ['books'],
        });
    }

    async findOneWithRelations(id: number): Promise<Author | null> {
        return this.authorRepo.findOne({
            where: { id },
            relations: ['books'],
        });
    }

    async createAuthor(data: Partial<Author>): Promise<Author> {
        const author = this.authorRepo.create(data);
        return this.authorRepo.save(author);
    }

    async updateAuthor(id: number, data: Partial<Author>): Promise<Author | null> {
        await this.authorRepo.update(id, data);
        return this.findOneWithRelations(id);
    }

    async removeAuthor(id: number): Promise<void> {
        await this.authorRepo.delete(id);
    }
}
