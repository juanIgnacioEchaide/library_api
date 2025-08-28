import { Test, TestingModule } from '@nestjs/testing';
import { PublisherService } from '../../src/modules/publisher/publisher.service';
import { Repository } from 'typeorm';
import { Publisher } from '../../src/modules/publisher/entities/publisher.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('PublisherService', () => {
    let service: PublisherService;
    let repo: Repository<Publisher>;

    const mockRepo = {
        create: jest.fn(),
        save: jest.fn(),
        find: jest.fn(),
        findOne: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PublisherService,
                { provide: getRepositoryToken(Publisher), useValue: mockRepo },
            ],
        }).compile();

        service = module.get<PublisherService>(PublisherService);
        repo = module.get<Repository<Publisher>>(getRepositoryToken(Publisher));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('create() should create and save a publisher', async () => {
        const data = { name: 'Publisher 1', country: 'USA' };
        const savedPublisher = { id: 1, ...data };

        mockRepo.create.mockReturnValue(data);
        mockRepo.save.mockResolvedValue(savedPublisher);

        const result = await service.create(data);

        expect(repo.create).toHaveBeenCalledWith(data);
        expect(repo.save).toHaveBeenCalledWith(data);
        expect(result).toEqual(savedPublisher);
    });

    it('findAll() should return all publishers with books', async () => {
        const publishers = [{ id: 1, name: 'Publisher 1', books: [] }] as Publisher[];
        mockRepo.find.mockResolvedValue(publishers);

        const result = await service.findAll();

        expect(repo.find).toHaveBeenCalledWith({ relations: ['books'] });
        expect(result).toEqual(publishers);
    });

    it('findOne() should return a publisher by id with books', async () => {
        const publisher = { id: 1, name: 'Publisher 1', books: [] } as Publisher;
        mockRepo.findOne.mockResolvedValue(publisher);

        const result = await service.findOne(1);

        expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: ['books'] });
        expect(result).toEqual(publisher);
    });
});
