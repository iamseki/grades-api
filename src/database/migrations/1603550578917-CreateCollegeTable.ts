import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateCollegeTable1603550578917 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'colleges',
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
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'shortName',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'gradesSystem',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'gradesAverage',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'colleges',
      new TableForeignKey({
        columnNames: ['countryId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'countries',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('colleges');

    const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('countryId') !== -1);

    table.removeForeignKey(foreignKey);

    await queryRunner.dropTable('colleges');
  }
}
