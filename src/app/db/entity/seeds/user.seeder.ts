import { Seeder } from '@jorgebodega/typeorm-seeding';
import { DataSource } from 'typeorm';
import { User } from '../kiko/User.entity';
import Auth from '../../../utils/Auth';

export default class UserSeeder extends Seeder {
  async run(dataSource: DataSource) {
    let user: User = new User();
    user.name = 'Hemant';
    user.email = 'hemant@gmail.com';
    user.password = Auth.hashPassword('admin@123');
    user.userToken = Auth.generateUserToken();
    await dataSource.createEntityManager().save(user);
  }
}
