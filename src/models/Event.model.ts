import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./User.model";
import { EventCategory } from "./EventCategories.model";

@Entity('events')
export class Event{
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar", length: 100 })
    name!: string;

    @Column({ type: "text" })
    description!: string;

    @Column({ type: "timestamp" })
    date!: Date;

    @Column({ type: "varchar", length: 100 })
    location!: string;

    @Column({ type: "boolean", default: true })
    isActive!: boolean;

    @Column({ type: "int", nullable: true })
    capacity?: number;

    @ManyToOne(() => User)
    @JoinColumn()
    user!: User;

    @ManyToOne(() => EventCategory)
    @JoinColumn()
    category!: EventCategory;

    @Column({type: "enum", enum: [ "cancelled", "coming soon", "in progress"], default: 'in progress'})
    status: "cancelled" | "coming soon" | "in progress" = 'in progress'

    @Column({ type: "timestamp", nullable: true })
    startTime?: Date;

    @Column({ type: "timestamp", nullable: true })
    endTime?: Date;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date = new Date();

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date = new Date();

    constructor(partial: Partial<Event>) {
        Object.assign(this, partial);
        if (this.startTime && this.endTime && this.endTime <= this.startTime) {
            throw new Error("endTime must be greater than startTime");
        }
    }
}