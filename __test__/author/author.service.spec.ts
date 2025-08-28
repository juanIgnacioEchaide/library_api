import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsService } from '../../src/modules/author/authors.service';
import { Repository } from 'typeorm';
import { Author } from '../../src/modules/author/entities/author.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateAuthorInput } from '../../src/modules/author/dto/create-author.input';
import { UpdateAuthorInput } from '../../src/modules/author/dto/update-author.input';

describe('AuthorsService', () => {
    let service: AuthorsService;
    let repo: Repository<Author>;

    const mockRepo = {
        create: jest.fn(),
        save: jest.fn(),
        find: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthorsService,
                { provide: getRepositoryToken(Author), useValue: mockRepo },
            ],
        }).compile();

        service = module.get<AuthorsService>(AuthorsService);
        repo = module.get<Repository<Author>>(getRepositoryToken(Author));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('create() should create and save an author', async () => {
        const input: CreateAuthorInput = { name: 'Author 1' };
        const savedAuthor = { id: 1, ...input };

        mockRepo.create.mockReturnValue(input);
        mockRepo.save.mockResolvedValue(savedAuthor);

        const result = await service.create(input);

        expect(repo.create).toHaveBeenCalledWith(input);
        expect(repo.save).toHaveBeenCalledWith(input);
        expect(result).toEqual(savedAuthor);
    });

    it('findAll() should return all authors with books', async () => {
        const authors = [{ id: 1, name: 'Author 1', books: [] }] as Author[];
        mockRepo.find.mockResolvedValue(authors);

        const result = await service.findAll();
        expect(repo.find).toHaveBeenCalledWith({ relations: ['books'] });
        expect(result).toEqual(authors);
    });

    it('findOne() should return an author by id with books', async () => {
        const author = { id: 1, name: 'Author 1', books: [] } as Author;
        mockRepo.findOne.mockResolvedValue(author);

        const result = await service.findOne(1);
        expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: ['books'] });
        expect(result).toEqual(author);
    });

    it('update() should call update and return updated author', async () => {
        const input: UpdateAuthorInput = { id: 1, name: 'Updated Author' };
        const updatedAuthor = { ...input } as Author;

        mockRepo.update.mockResolvedValue({ affected: 1 });
        mockRepo.findOne.mockResolvedValue(updatedAuthor);

        const result = await service.update(input);

        expect(repo.update).toHaveBeenCalledWith(input.id, input);
        expect(repo.findOne).toHaveBeenCalledWith({ where: { id: input.id }, relations: ['books'] });
        expect(result).toEqual(updatedAuthor);
    });

    it('remove() should delete an author and return true if affected > 0', async () => {
        mockRepo.delete.mockResolvedValue({ affected: 1 });

        const result = await service.remove(1);
        expect(repo.delete).toHaveBeenCalledWith(1);
        expect(result).toBe(true);
    });

    it('remove() should return false if affected = 0', async () => {
        mockRepo.delete.mockResolvedValue({ affected: 0 });

        const result = await service.remove(1);
        expect(result).toBe(false);
    });
});
