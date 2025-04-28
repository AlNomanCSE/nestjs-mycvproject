import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Report } from 'src/reports/report.entity';
import { User } from 'src/users/user.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [User, Report],
  synchronize: true,
};
