import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsResolver } from '@/modules/author/authors.resolver';
import { AuthorsService } from '@/modules/author/authors.service';
import { CreateAuthorInput } from '@/modules/author/dto/create-author.input';

describe('AuthorsResolver', () => {
    let resolver: AuthorsResolver;
    let service: AuthorsService;

    const mockAuthorsService = {
        create: jest.fn((input) => ({ id: 1, ...input })),
        findAll: jest.fn(() => [{ id: 1, name: 'Author 1' }]),
        findOne: jest.fn((id) => ({ id, name: 'Author 1' })),
        update: jest.fn((input) => ({ ...input })),
        remove: jest.fn((id) => true),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthorsResolver,
                { provide: AuthorsService, useValue: mockAuthorsService },
            ],
        }).compile();

        resolver = module.get<AuthorsResolver>(AuthorsResolver);
        service = module.get<AuthorsService>(AuthorsService);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });

    it('should create an author', async () => {
        const input: CreateAuthorInput = { name: 'Author 1' };
        expect(await resolver.createAuthor(input)).toEqual({ id: 1, ...input });
        expect(service.create).toHaveBeenCalledWith(input);
    });

    it('should return all authors', async () => {
        expect(await resolver.findAll()).toEqual([{ id: 1, name: 'Author 1' }]);
        expect(service.findAll).toHaveBeenCalled();
    });

    it('should return an author by id', async () => {
        expect(await resolver.findOne(1)).toEqual({ id: 1, name: 'Author 1' });
        expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should update an author', async () => {
        const input = { id: 1, name: 'Updated Author' };
        expect(await resolver.updateAuthor(input)).toEqual(input);
        expect(service.update).toHaveBeenCalledWith(input);
    });

    it('should remove an author', async () => {
        expect(await resolver.removeAuthor(1)).toBe(true);
        expect(service.remove).toHaveBeenCalledWith(1);
    });
});
