import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddSemesterFieldToCourseSubjectTable1605539469554 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('courses_subjects', 
        new TableColumn({
            name: 'semester',
            type: 'integer',
            isNullable: false
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('courses_subjects', 'semester')
    }
}
