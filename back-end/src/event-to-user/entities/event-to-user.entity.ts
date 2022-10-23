import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Address } from "../../address/entities/address.entity";
import { Event } from "../../event/entities/event.entity";
import { Node } from "../../pagination/entities/node.entity";

@ObjectType()
@Entity()
export class EventToUser extends Node {
  @Field(() => String)
  @Column()
  @RelationId((self: EventToUser) => self.user)
  userId!: User["id"];
  @Field(() => String)
  @Column()
  @RelationId((self: EventToUser) => self.event)
  eventId!: Event["id"];

  @Field(() => Event)
  @ManyToOne(() => Event, (event) => event.members)
  event!: Event;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.eventToUsers)
  user!: User;

  @Field(() => Address, { nullable: true })
  @ManyToOne(() => Address)
  @JoinColumn([{ name: "addressId", referencedColumnName: "id" }])
  address: Address;

  @Field(() => String, { nullable: true })
  @RelationId((self: User) => self.address)
  addressId: Address["id"];
}
