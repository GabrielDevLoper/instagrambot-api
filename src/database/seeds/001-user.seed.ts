// /**CRIAÇÃO DE SEED AVANÇADO GERADO AUTOMATICO */
import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { User } from "../../models/User";

export default class CreateUser implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(User)().createMany(5);
  }
}
