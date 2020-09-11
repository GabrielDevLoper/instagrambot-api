import Faker from "faker";
import { define } from "typeorm-seeding";
import { User } from "../../models/User";

define(User, (faker: typeof Faker) => {
  faker.locale = "pt_BR";
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = faker.internet.email();
  const password = faker.internet.password();

  const user = new User();
  user.username = `${firstName} ${lastName}`;
  user.email = email;
  user.role = "COMUM";
  user.password = "123";
  return user;
});
