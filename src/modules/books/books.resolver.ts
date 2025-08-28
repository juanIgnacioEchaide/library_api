import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';

@Resolver(() => Book)
export class BooksResolver {
    constructor(private readonly booksService: BooksService) { }

    @Mutation(() => Book)
    createBook(@Args('input') input: CreateBookInput) {
        return this.booksService.create(input);
    }

    @Query(() => [Book], { name: 'books' })
    findAll() {
        return this.booksService.findAll();
    }

    @Query(() => Book, { name: 'book' })
    findOne(@Args('id', { type: () => Int }) id: number) {
        return this.booksService.findOne(id);
    }

    @Mutation(() => Book)
    updateBook(@Args('input') input: UpdateBookInput) {
        return this.booksService.update(input);
    }

    @Mutation(() => Boolean)
    removeBook(@Args('id', { type: () => Int }) id: number) {
        return this.booksService.remove(id);
    }
}
