import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publisher } from './entities/publisher.entity';


@Injectable()
export class PublisherService {
    constructor(
        @InjectRepository(Publisher)
        private publisherRepository: Repository<Publisher>,
    ) { }

    create(data: Partial<Publisher>): Promise<Publisher> {
        const publisher = this.publisherRepository.create(data);
        return this.publisherRepository.save(publisher);
    }

    findAll(): Promise<Publisher[]> {
        return this.publisherRepository.find({ relations: ['books'] });
    }

    findOne(id: number): Promise<Publisher> {
        return this.publisherRepository.findOne({
            where: { id },
            relations: ['books'],
        });
    }
}
