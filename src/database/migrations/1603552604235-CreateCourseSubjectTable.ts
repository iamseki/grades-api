import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateCourseSubjectTable1603552604235 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: 'courses_subjects',
                    columns: [
                        {
                            name: 'subjectId',
                            type: 'uuid',
                            isPrimary: true
                        },
                        {
                            name: 'courseId',
                            type: 'uuid',
                            isPrimary: true
                        }
                    ]
                })
        )

        await queryRunner.createForeignKey('courses_subjects',
        new TableForeignKey({
            columnNames: ['subjectId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'subjects',
            onDelete: 'CASCADE'
        }))

        await queryRunner.createForeignKey('courses_subjects',
        new TableForeignKey({
            columnNames: ['courseId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'courses'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('courses_subjects');

        let foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('courseId') !== -1);
        table.removeForeignKey(foreignKey);

        foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('subjectId') !== -1);
        table.removeForeignKey(foreignKey);

        await queryRunner.dropTable('courses_subjects');
    }

}
