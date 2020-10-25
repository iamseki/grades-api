import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateStatesTable1603549731346 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:  'states',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'countryId',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'abbreviation',
                        type: 'varchar',
                        length: '3',
                        isNullable: false
                    }
                ]
            })  
        )
        
        await queryRunner.createForeignKey('states',
            new TableForeignKey({
                columnNames: ['countryId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'countries',
                onDelete: 'CASCADE'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('states');

        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('countryId') !== -1);
        
        table.removeForeignKey(foreignKey);

        await queryRunner.dropTable('states');
    }
}
