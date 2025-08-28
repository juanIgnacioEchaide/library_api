import { Test, TestingModule } from '@nestjs/testing';
import { PublisherResolver } from '../../src/modules/publisher/publisher.resolver';
import { PublisherService } from '../../src/modules/publisher/publisher.service';
import { Publisher } from '../../src/modules/publisher/entities/publisher.entity';

describe('PublisherResolver', () => {
    let resolver: PublisherResolver;
    let service: PublisherService;

    const mockPublisherService = {
        findAll: jest.fn(() => [{ id: 1, name: 'Publisher 1', country: 'USA' }]),
        findOne: jest.fn((id) => ({ id, name: 'Publisher 1', country: 'USA' })),
        create: jest.fn((data) => ({ id: 1, ...data })),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PublisherResolver,
                { provide: PublisherService, useValue: mockPublisherService },
            ],
        }).compile();

        resolver = module.get<PublisherResolver>(PublisherResolver);
        service = module.get<PublisherService>(PublisherService);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });

    it('publishers() should return all publishers', async () => {
        const result = await resolver.publishers();
        expect(result).toEqual([{ id: 1, name: 'Publisher 1', country: 'USA' }]);
        expect(service.findAll).toHaveBeenCalled();
    });

    it('publisher(id) should return a publisher by id', async () => {
        const result = await resolver.publisher(1);
        expect(result).toEqual({ id: 1, name: 'Publisher 1', country: 'USA' });
        expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('createPublisher() should create a publisher', async () => {
        const result = await resolver.createPublisher('Publisher 1', 'USA');
        expect(result).toEqual({ id: 1, name: 'Publisher 1', country: 'USA' });
        expect(service.create).toHaveBeenCalledWith({ name: 'Publisher 1', country: 'USA' });
    });
});
