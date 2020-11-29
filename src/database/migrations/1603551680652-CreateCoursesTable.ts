import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableUnique } from 'typeorm';

export class CreateCoursesTable1603551680652 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'courses',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'collegeId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'shortName',
            type: 'varchar',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createUniqueConstraint(
      'courses',
      new TableUnique({
        name: 'unq_group_courses',
        columnNames: ['collegeId', 'name', 'shortName'],
      }),
    );

    await queryRunner.createForeignKey(
      'courses',
      new TableForeignKey({
        columnNames: ['collegeId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'colleges',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('courses');

    const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('collegeId') !== -1);
    const constraint = table.uniques.find(un => un.name === 'unq_group_courses');

    table.removeForeignKey(foreignKey);
    table.removeUniqueConstraint(constraint);

    await queryRunner.dropTable('courses');
  }
}
