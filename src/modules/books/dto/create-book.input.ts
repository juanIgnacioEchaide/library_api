import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class CreateBookInput {
    @Field()
    title: string;

    @Field(() => Int)
    year: number;

    @Field()
    isbn: string;

    @Field(() => Int)
    pages: number;

    @Field(() => Int)
    publisherId: number;
}
