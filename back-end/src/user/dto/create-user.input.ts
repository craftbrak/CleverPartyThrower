import { Field, InputType } from "@nestjs/graphql";
import { IsEmail } from "class-validator";

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: "Name of the user" })
  name: string;
  @Field(() => String, { description: "Email of the user" })
  @IsEmail()
  email: string;
  @Field(() => String, { description: "Password of the user" })
  password: string;
  @Field(() => String, { nullable: true })
  avatar?: string;

  @Field(() => Boolean)
  drivingLicence: boolean;

  @Field(() => Boolean)
  manual: boolean;

  @Field(() => String)
  addressId: string;
}
