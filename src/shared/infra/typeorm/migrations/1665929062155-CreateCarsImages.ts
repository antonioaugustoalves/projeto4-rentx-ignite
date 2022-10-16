import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCarsImages1665929062155 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "car_images",
                columns: [
                    { name: "id", type: "uuid", isPrimary: true },
                    { name: "car_id", type: "uuid" },
                    { name: "image_name", type: "varchar" },
                    { name: "created_at", type: "timestamp", default: "now()" },
                ],
                foreignKeys: [
                    {
                        name: "fk_car_image",
                        referencedTableName: "cars",
                        referencedColumnNames: ["id"],
                        columnNames: ["car_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("car_images");
    }
}
