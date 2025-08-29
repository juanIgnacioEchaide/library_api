import { AuthorsRepository } from '../../src/modules/author/authors.repository';
import { Author } from '../../src/modules/author/entities/author.entity';
import { Repository } from 'typeorm';

describe('AuthorsRepository (unit)', () => {
    let repo: AuthorsRepository;
    let mockRepo: jest.Mocked<Repository<Author>>;

    beforeEach(() => {
        mockRepo = {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        } as any;

        // mocking the repo storage
        repo = new AuthorsRepository(mockRepo);
        // manual mock to replace the @InjectRepository in functional code,
        (repo as any).authorRepo = mockRepo;
    });

    it('findWithBooks llama correctamente a find con relaciones', async () => {
        const expected = [{ id: 1, name: 'Author 1' }] as Author[];
        mockRepo.find.mockResolvedValue(expected);

        const result = await repo.findWithBooks();

        expect(mockRepo.find).toHaveBeenCalledWith({ relations: ['books'] });
        expect(result).toEqual(expected);
    });

    it('findOneWithRelations llama correctamente a findOne con where y relaciones', async () => {
        const expected = { id: 1, name: 'Author 1' } as Author;
        mockRepo.findOne.mockResolvedValue(expected);

        const result = await repo.findOneWithRelations(1);

        expect(mockRepo.findOne).toHaveBeenCalledWith({
            where: { id: 1 },
            relations: ['books'],
        });
        expect(result).toEqual(expected);
    });
});
