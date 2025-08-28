import { AuthorsRepository } from '../../src/modules/author/authors.repository';
import { Author } from '../../src/modules/author/entities/author.entity';
import { DataSource } from 'typeorm';

describe('AuthorsRepository (unit)', () => {
    let repo: AuthorsRepository;
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

        repo = new AuthorsRepository(mockDataSource);
        repo.createQueryBuilder = jest.fn(() => mockQueryBuilder);
    });

    it('findWithBooks llama correctamente a QueryBuilder y devuelve autores', async () => {
        const expected = [{ id: 1, name: 'Author 1' }] as Author[];
        mockQueryBuilder.getMany.mockResolvedValue(expected);

        const result = await repo.findWithBooks();

        expect(repo.createQueryBuilder).toHaveBeenCalledWith('author');
        expect(mockQueryBuilder.leftJoinAndSelect).toHaveBeenCalledWith('author.books', 'book');
        expect(mockQueryBuilder.getMany).toHaveBeenCalled();
        expect(result).toEqual(expected);
    });

    it('findOneWithRelations llama correctamente a QueryBuilder, where y devuelve un autor', async () => {
        const expected = { id: 1, name: 'Author 1' } as Author;
        mockQueryBuilder.getOne.mockResolvedValue(expected);

        const result = await repo.findOneWithRelations(1);

        expect(repo.createQueryBuilder).toHaveBeenCalledWith('author');
        expect(mockQueryBuilder.leftJoinAndSelect).toHaveBeenCalledWith('author.books', 'book');
        expect(mockQueryBuilder.where).toHaveBeenCalledWith('author.id = :id', { id: 1 });
        expect(mockQueryBuilder.getOne).toHaveBeenCalled();
        expect(result).toEqual(expected);
    });
});
