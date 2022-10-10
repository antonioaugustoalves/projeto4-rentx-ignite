import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateContacts1665412780210 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "contacts",
                columns: [
                    { name: "id", type: "uuid", isPrimary: true },
                    { name: "first_name", type: "varchar(100)" },
                    { name: "last_name", type: "varchar(100)" },
                    { name: "telephone", type: "varchar(100)", isUnique: true },
                    { name: "email", type: "varchar(255)", isUnique: true },
                    { name: "address", type: "varchar(100)" },
                    { name: "city", type: "varchar(50)" },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("contacts");
    }
}
