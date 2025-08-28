import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from '../../src/modules/books/books.service';
import { Repository } from 'typeorm';
import { Book } from '../../src/modules/books/entities/book.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateBookInput } from '../../src/modules/books/dto/create-book.input';
import { UpdateBookInput } from '../../src/modules/books/dto/update-book.input';

describe('BooksService', () => {
    let service: BooksService;
    let repo: Repository<Book>;

    const mockRepo = {
        create: jest.fn(),
        save: jest.fn(),
        find: jest.fn(),
        findOneBy: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BooksService,
                { provide: getRepositoryToken(Book), useValue: mockRepo },
            ],
        }).compile();

        service = module.get<BooksService>(BooksService);
        repo = module.get<Repository<Book>>(getRepositoryToken(Book));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('create() should create and save a book', async () => {
        const input: CreateBookInput = { title: 'Book 1', year: 2023 };
        const savedBook = { id: 1, ...input };

        mockRepo.create.mockReturnValue(input);
        mockRepo.save.mockResolvedValue(savedBook);

        const result = await service.create(input);

        expect(repo.create).toHaveBeenCalledWith(input);
        expect(repo.save).toHaveBeenCalledWith(input);
        expect(result).toEqual(savedBook);
    });

    it('findAll() should return all books', async () => {
        const books = [{ id: 1, title: 'Book 1' }] as Book[];
        mockRepo.find.mockResolvedValue(books);

        const result = await service.findAll();
        expect(repo.find).toHaveBeenCalled();
        expect(result).toEqual(books);
    });

    it('findOne() should return a book by id', async () => {
        const book = { id: 1, title: 'Book 1' } as Book;
        mockRepo.findOneBy.mockResolvedValue(book);

        const result = await service.findOne(1);
        expect(repo.findOneBy).toHaveBeenCalledWith({ id: 1 });
        expect(result).toEqual(book);
    });

    it('update() should call update and return updated book', async () => {
        const input: UpdateBookInput = { id: 1, title: 'Updated' };
        const updatedBook = { ...input } as Book;

        mockRepo.update.mockResolvedValue({ affected: 1 });
        mockRepo.findOneBy.mockResolvedValue(updatedBook);

        const result = await service.update(input);

        expect(repo.update).toHaveBeenCalledWith(input.id, input);
        expect(repo.findOneBy).toHaveBeenCalledWith({ id: input.id });
        expect(result).toEqual(updatedBook);
    });

    it('remove() should delete a book and return true if affected > 0', async () => {
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
