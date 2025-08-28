import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthorsService } from './authors.service';

import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { Author } from './entities/author.entity';

@Resolver(() => Author)
export class AuthorsResolver {
    constructor(private readonly authorsService: AuthorsService) { }

    @Mutation(() => Author)
    createAuthor(@Args('input') input: CreateAuthorInput) {
        return this.authorsService.create(input);
    }

    @Query(() => [Author], { name: 'authors' })
    findAll() {
        return this.authorsService.findAll();
    }

    @Query(() => Author, { name: 'author' })
    findOne(@Args('id', { type: () => Int }) id: number) {
        return this.authorsService.findOne(id);
    }

    @Mutation(() => Author)
    updateAuthor(@Args('input') input: UpdateAuthorInput) {
        return this.authorsService.update(input);
    }

    @Mutation(() => Boolean)
    removeAuthor(@Args('id', { type: () => Int }) id: number) {
        return this.authorsService.remove(id);
    }
}
