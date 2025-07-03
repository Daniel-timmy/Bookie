import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { IsNotEmpty, IsString } from "class-validator";
import { Event } from "./Event.model";
import { User } from "./User.model";
import { Ticket } from "./Ticket.model";


@Entity('payments')
export class Payment {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar", length: 100 })
    @IsNotEmpty()
    @IsString()
    method!: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    amount!: number;

    @ManyToOne(() => User)
    @JoinColumn()
    user!: User;

    @ManyToOne(() => Event)
    @JoinColumn()
    event!: Event;

    @ManyToOne(() => Ticket)
    @JoinColumn()
    ticket!: Ticket;

    @Column({ type: "varchar", length: 100, nullable: true })
    @IsString()
    status: 'pending' | 'completed' | 'failed' = 'pending';

    @Column({ type: "int8", nullable: false })
    transactionId!: number;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date = new Date();

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date = new Date();

    constructor(partial: Partial<Payment>) {
        Object.assign(this, partial);
    }
}