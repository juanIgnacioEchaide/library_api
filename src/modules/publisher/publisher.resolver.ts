import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PublisherService } from './publisher.service';
import { Publisher } from './entities/publisher.entity';

@Resolver(() => Publisher)
export class PublisherResolver {
    constructor(private readonly publisherService: PublisherService) { }

    @Query(() => [Publisher])
    publishers() {
        return this.publisherService.findAll();
    }

    @Query(() => Publisher)
    publisher(@Args('id', { type: () => Int }) id: number) {
        return this.publisherService.findOne(id);
    }

    @Mutation(() => Publisher)
    createPublisher(
        @Args('name') name: string,
        @Args('country', { nullable: true }) country?: string,
    ) {
        return this.publisherService.create({ name, country });
    }
}
