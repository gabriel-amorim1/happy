import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BeforeInsert,
    BeforeUpdate,
} from 'typeorm';
import bcrypt from 'bcryptjs';

@Entity('users')
export default class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    password: string;

    @Column()
    password_hash: string;

    @BeforeInsert()
    @BeforeUpdate()
    private async savePasswordHash(): Promise<void> {
        if (this.password) {
            this.password_hash = await bcrypt.hash(this.password, 8);
        }
    }

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    checkPassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password_hash);
    }
}
