// The QR code contains the ticket id 
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { TicketType } from "./TicketType.model";
import { User } from "./User.model";
import { Event } from "./Event.model";
import { IsNotEmpty, IsString, IsNumber, IsInt, Min } from "class-validator";


@Entity('tickets')
export class Ticket {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar", length: 100 })
    name!: string;

    @Column({ type: "text" })
    description!: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    price!: number;

    @Column({ type: "int" })
    @Min(100, { message: "Quantity must be at least 100" })
    @IsInt({ message: "Quantity must be an integer" })
    quantity!: number;

    @ManyToOne(() => Event)
    @JoinColumn()
    event!: Event;

    @ManyToOne(() => TicketType)
    @JoinColumn()
    ticketType!: TicketType;

    @ManyToOne(() => User)
    @JoinColumn()
    user!: User;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date = new Date();

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date = new Date();

    constructor(partial: Partial<Ticket>) {
        Object.assign(this, partial);
    }
}