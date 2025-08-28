import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorsService {
    constructor(
        @InjectRepository(Author)
        private readonly authorsRepo: Repository<Author>,
    ) { }

    create(input: CreateAuthorInput): Promise<Author> {
        const author = this.authorsRepo.create(input);
        return this.authorsRepo.save(author);
    }

    findAll(): Promise<Author[]> {
        return this.authorsRepo.find({ relations: ['books'] });
    }

    findOne(id: number): Promise<Author | null> {
        return this.authorsRepo.findOne({ where: { id }, relations: ['books'] });
    }

    async update(input: UpdateAuthorInput): Promise<Author> {
        await this.authorsRepo.update(input.id, input);
        return this.findOne(input.id);
    }

    async remove(id: number): Promise<boolean> {
        const result = await this.authorsRepo.delete(id);
        return result.affected > 0;
    }
}
