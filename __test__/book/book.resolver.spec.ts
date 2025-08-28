import { BooksResolver } from '@/modules/books/books.resolver';
import { BooksService } from '@/modules/books/books.service';
import { CreateBookInput } from '@/modules/books/dto/create-book.input';
import { Test, TestingModule } from '@nestjs/testing';


describe('BooksResolver', () => {
    let resolver: BooksResolver;
    let service: BooksService;

    const mockBooksService = {
        create: jest.fn((input) => ({ id: 1, ...input })),
        findAll: jest.fn(() => [{ id: 1, title: 'Book 1', author: 'Author' }]),
        findOne: jest.fn((id) => ({ id, title: 'Book 1', author: 'Author' })),
        update: jest.fn((input) => ({ ...input })),
        remove: jest.fn((id) => true),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BooksResolver,
                { provide: BooksService, useValue: mockBooksService },
            ],
        }).compile();

        resolver = module.get<BooksResolver>(BooksResolver);
        service = module.get<BooksService>(BooksService);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });

    it('should create a book', async () => {
        const input: CreateBookInput = { title: 'Book 1', year: 2023 };
        expect(await resolver.createBook(input)).toEqual({ id: 1, ...input });
        expect(service.create).toHaveBeenCalledWith(input);
    });

    it('should return all books', async () => {
        expect(await resolver.findAll()).toEqual([{ id: 1, title: 'Book 1', author: 'Author' }]);
        expect(service.findAll).toHaveBeenCalled();
    });

    it('should return a book by id', async () => {
        expect(await resolver.findOne(1)).toEqual({ id: 1, title: 'Book 1', author: 'Author' });
        expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should update a book', async () => {
        const input = { id: 1, title: 'Updated Book' };
        expect(await resolver.updateBook(input)).toEqual(input);
        expect(service.update).toHaveBeenCalledWith(input);
    });

    it('should remove a book', async () => {
        expect(await resolver.removeBook(1)).toBe(true);
        expect(service.remove).toHaveBeenCalledWith(1);
    });
});
