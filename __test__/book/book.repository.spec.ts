import { BooksRepository } from '../../src/modules/books/books.repository';
import { Book } from '../../src/modules/books/entities/book.entity';
import { Repository } from 'typeorm';

describe('BooksRepository (unit)', () => {
    let repo: BooksRepository;
    let mockRepo: jest.Mocked<Repository<Book>>;

    beforeEach(() => {
        mockRepo = {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        } as any;

        repo = new BooksRepository(mockRepo as any);
        (repo as any).bookRepo = mockRepo; // simulamos @InjectRepository(Book)
    });

    it('findWithAuthors llama correctamente a find con relaciones', async () => {
        const expected = [{ id: 1, title: 'Book 1' }] as Book[];
        mockRepo.find.mockResolvedValue(expected);

        const result = await repo.findWithAuthors();

        expect(mockRepo.find).toHaveBeenCalledWith({ relations: ['authors'] });
        expect(result).toEqual(expected);
    });

    it('findOneWithRelations llama correctamente a findOne con where y relaciones', async () => {
        const expected = { id: 1, title: 'Book 1' } as Book;
        mockRepo.findOne.mockResolvedValue(expected);

        const result = await repo.findOneWithRelations(1);

        expect(mockRepo.findOne).toHaveBeenCalledWith({
            where: { id: 1 },
            relations: ['authors'],
        });
        expect(result).toEqual(expected);
    });
});
