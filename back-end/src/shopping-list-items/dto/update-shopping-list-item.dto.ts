import { CreateShoppingListItemDto } from "./create-shopping-list-item.dto";
import { Field, Float, InputType, PartialType } from "@nestjs/graphql";
import { ManyToOne } from "typeorm";
import { UserEntity } from "../../user/entities/user.entity";
import { Event } from "../../event/entities/event.entity";

@InputType()
export class UpdateShoppingListItemDto extends PartialType(
  CreateShoppingListItemDto,
) {
  @Field(() => String)
  id: string;
  @Field(() => String)
  name: string;
  @Field(() => Float)
  price: number;
  @Field(() => String)
  @ManyToOne(() => UserEntity, { nullable: true })
  assignedId: UserEntity["id"];
  @Field(() => Boolean)
  bought: boolean;
  @Field(() => String)
  eventId: Event["id"];
}
