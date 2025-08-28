import { BooksRepository } from '../../src/modules/books/books.repository';
import { Book } from '../../src/modules/books/entities/book.entity';
import { DataSource } from 'typeorm';

describe('BooksRepository (unit)', () => {
    let repo: BooksRepository;
    let mockQueryBuilder: any;

    beforeEach(() => {
        mockQueryBuilder = {
            leftJoinAndSelect: jest.fn().mockReturnThis(),
            where: jest.fn().mockReturnThis(),
            getMany: jest.fn(),
            getOne: jest.fn(),
        };

        const mockDataSource = {
            createEntityManager: jest.fn(),
        } as any as DataSource;

        repo = new BooksRepository(mockDataSource);
        repo.createQueryBuilder = jest.fn(() => mockQueryBuilder);
    });

    it('findWithAuthors llama correctamente a QueryBuilder y devuelve libros', async () => {
        const expected = [{ id: 1, title: 'Book 1' }] as Book[];
        mockQueryBuilder.getMany.mockResolvedValue(expected);

        const result = await repo.findWithAuthors();

        expect(repo.createQueryBuilder).toHaveBeenCalledWith('book');
        expect(mockQueryBuilder.leftJoinAndSelect).toHaveBeenCalledWith('book.authors', 'author');
        expect(mockQueryBuilder.getMany).toHaveBeenCalled();
        expect(result).toEqual(expected);
    });

    it('findOneWithRelations llama correctamente a QueryBuilder, where y devuelve un libro', async () => {
        const expected = { id: 1, title: 'Book 1' } as Book;
        mockQueryBuilder.getOne.mockResolvedValue(expected);

        const result = await repo.findOneWithRelations(1);

        expect(repo.createQueryBuilder).toHaveBeenCalledWith('book');
        expect(mockQueryBuilder.leftJoinAndSelect).toHaveBeenCalledWith('book.authors', 'author');
        expect(mockQueryBuilder.where).toHaveBeenCalledWith('book.id = :id', { id: 1 });
        expect(mockQueryBuilder.getOne).toHaveBeenCalled();
        expect(result).toEqual(expected);
    });
});
