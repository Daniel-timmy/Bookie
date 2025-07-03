import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { IsEmail, Min } from "class-validator";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string;
    
    @Column({ type: "varchar", length: 100, unique: true })
    @IsEmail({}, { message: "Invalid email format" })
    email!: string;
    
    @Column({ type: "varchar", length: 100 })
    password!: string;
    
    @Column({ type: "varchar", length: 50, nullable: true })
    name!: string;

    // @Min(16, {message: "Age "})
    @Column({ type: "int", default: 0 })
    age: number = 0;
    
    @Column({ type: "enum", enum: ["individual", "business"], default: "individual" })
    accountType: "individual" | "business" = "individual";

    @Column({ type: "enum", enum: ['admin', 'user'], default: 'user' })
    role: 'admin' | 'user' = 'user';
    
    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date = new Date();
    
    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date = new Date();

    @Column({ type: "varchar", nullable: true })
    profilePicture?: string;

    @Column({type: "enum", enum: ["technology", "finance", "healthcare", "education", "retail", "other"], nullable: true})
    industry?: "technology" | "finance" | "healthcare" | "education" | "retail" | "other";

    @Column({ type: "text", nullable: true })
    description?: string;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}