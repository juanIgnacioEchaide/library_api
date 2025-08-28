import { Test, TestingModule } from '@nestjs/testing';
import { PublisherRepository } from '../../src/modules/publisher/publisher.repository';
import { Repository } from 'typeorm';
import { Publisher } from '../../src/modules/publisher/entities/publisher.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('PublisherRepository', () => {
    let repo: PublisherRepository;
    let mockRepo: Partial<Record<keyof Repository<Publisher>, jest.Mock>>;

    beforeEach(async () => {
        mockRepo = {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PublisherRepository,
                { provide: getRepositoryToken(Publisher), useValue: mockRepo },
            ],
        }).compile();

        repo = module.get<PublisherRepository>(PublisherRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(repo).toBeDefined();
    });

    it('createPublisher() should create and save a publisher', async () => {
        const data = { name: 'Publisher 1' };
        const savedPublisher = { id: 1, ...data };

        mockRepo.create!.mockReturnValue(data);
        mockRepo.save!.mockResolvedValue(savedPublisher);

        const result = await repo.createPublisher(data);

        expect(mockRepo.create).toHaveBeenCalledWith(data);
        expect(mockRepo.save).toHaveBeenCalledWith(data);
        expect(result).toEqual(savedPublisher);
    });

    it('findAll() should return all publishers with books', async () => {
        const publishers = [{ id: 1, name: 'Publisher 1', books: [] }] as Publisher[];
        mockRepo.find!.mockResolvedValue(publishers);

        const result = await repo.findAll();

        expect(mockRepo.find).toHaveBeenCalledWith({ relations: ['books'] });
        expect(result).toEqual(publishers);
    });

    it('findById() should return a publisher by id with books', async () => {
        const publisher = { id: 1, name: 'Publisher 1', books: [] } as Publisher;
        mockRepo.findOne!.mockResolvedValue(publisher);

        const result = await repo.findById(1);

        expect(mockRepo.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: ['books'] });
        expect(result).toEqual(publisher);
    });

    it('updatePublisher() should call update and return updated publisher', async () => {
        const data = { name: 'Updated Publisher' };
        const updatedPublisher = { id: 1, ...data } as Publisher;

        mockRepo.update!.mockResolvedValue({ affected: 1 });
        mockRepo.findOne!.mockResolvedValue(updatedPublisher);

        const result = await repo.updatePublisher(1, data);

        expect(mockRepo.update).toHaveBeenCalledWith(1, data);
        expect(mockRepo.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: ['books'] });
        expect(result).toEqual(updatedPublisher);
    });

    it('removePublisher() should delete a publisher', async () => {
        mockRepo.delete!.mockResolvedValue({ affected: 1 });

        await repo.removePublisher(1);

        expect(mockRepo.delete).toHaveBeenCalledWith(1);
    });
});
