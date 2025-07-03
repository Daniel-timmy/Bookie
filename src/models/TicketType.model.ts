import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Event } from "./Event.model";

@Entity('ticket_types')
export class TicketType {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar", length: 100 })
    name!: string;

    @Column({ type: "text" })
    description!: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    price!: number;

    @Column({ type: "int" })
    quantity!: number;

    @ManyToOne(() => Event, event => event.id)
    @JoinColumn()
    event!: Event;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date = new Date();

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date = new Date();

    constructor(partial: Partial<TicketType>) {
        Object.assign(this, partial);
    }
}