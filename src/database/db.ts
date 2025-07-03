import mongoose from 'mongoose';
import { DataSource } from "typeorm";
import { User } from "../models/User.model";
import { Ticket } from '../models/Ticket.model';
import { TicketType } from '../models/TicketType.model';
import { Payment } from '../models/Payment.model';
import { EventCategory } from '../models/EventCategories.model';
import { Event } from '../models/Event.model';

const NODE_ENV = process.env.NODE_ENV;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;


export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST || "localhost",
  port: parseInt(DB_PORT || "5432"),
  username: DB_USERNAME || "postgres",
  password: DB_PASSWORD || "postgres",
  database: DB_NAME || "bookie",
  synchronize: NODE_ENV !== "production", // Auto-create tables in dev
  logging: NODE_ENV !== "production",
  migrations: ["src/migrations/*.ts"],
  entities: [User, Ticket, TicketType, EventCategory, Event, Payment], 
});