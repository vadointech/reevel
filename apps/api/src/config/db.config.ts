import { ConfigService } from "@/config/config.service";
import { Provider } from "@nestjs/common";

const MASTER_CONNECTION_NAME = "MASTER_CONNECTION";

const masterConnectionProvider: Provider = {
    provide: MASTER_CONNECTION_NAME,
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.env("DB_HOST"),
        port: parseInt(configService.env("DB_PORT")),
        username: configService.env("DB_USER"),
        password: configService.env("DB_PASSWORD"),
        database: configService.env("DB_NAME"),
        entities: [__dirname + "../../**/*.entity.{js,ts}"],
        synchronize: false,
        logging: false,
        ssl: {
            rejectUnauthorized: false,
        },
    }),
};

export default {
    masterConnection: {
        name: MASTER_CONNECTION_NAME,
        provider: masterConnectionProvider,
    },
};