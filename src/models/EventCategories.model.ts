import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity('event_categories')
export class EventCategory {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar", length: 100 })
    name!: string;

    @Column({ type: "text" })
    description!: string;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date = new Date();

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date = new Date();

    constructor(partial: Partial<EventCategory>) {
        Object.assign(this, partial);
    }
}