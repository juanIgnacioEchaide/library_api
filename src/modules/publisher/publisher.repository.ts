import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publisher } from './entities/publisher.entity';


@Injectable()
export class PublisherRepository {
    constructor(
        @InjectRepository(Publisher)
        private readonly publisherRepo: Repository<Publisher>,
    ) { }

    async createPublisher(data: Partial<Publisher>): Promise<Publisher> {
        const publisher = this.publisherRepo.create(data);
        return this.publisherRepo.save(publisher);
    }

    async findAll(): Promise<Publisher[]> {
        return this.publisherRepo.find({ relations: ['books'] });
    }

    async findById(id: number): Promise<Publisher | null> {
        return this.publisherRepo.findOne({
            where: { id },
            relations: ['books'],
        });
    }

    async updatePublisher(id: number, data: Partial<Publisher>): Promise<Publisher> {
        await this.publisherRepo.update(id, data);
        return this.findById(id) as Promise<Publisher>;
    }

    async removePublisher(id: number): Promise<void> {
        await this.publisherRepo.delete(id);
    }
}
