import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (host = "db_rentx"): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();
    return createConnection(
        Object.assign(defaultOptions, {
            host,
            database: defaultOptions.database,
        })
    );
};
