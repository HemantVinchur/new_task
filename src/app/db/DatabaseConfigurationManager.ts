import { DataSource } from "typeorm";
import configuration from '../../resources/config';

export class DatabaseConfigurationManager extends DataSource {
  constructor(
    private modelDirPath: string,
    databaseName: string,
    user: string,
    password: string,
    options: {} = {}
  ) {
    // calling base class constructor for providing database information to orm
    super({
      type: configuration.database.dialect,
      host: configuration.database.host,
      port: configuration.database.port,
      username: configuration.database.user,
      password: configuration.database.password,
      database: configuration.database.name,
      synchronize: false,
      logging: true,
      entities: [__dirname + "/entity/kiko/**/*.entity.{js,ts}"],
      migrations: [__dirname + "/entity/migrations/*.{ts,js}"],
      subscribers: [],
    });
  }

  // loading the database models
  async loadDatabaseModels(): Promise<{}> {
    // establishing the database connection
    await this.initialize()
      .then((db) => {
        console.log("Connection has been established successfully.");
        return db;
      })
      .catch((error) => {
        console.log(`Unable to connect to the database : ${error}`);
      });
    return this;
  }
}
