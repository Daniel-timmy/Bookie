import { Repository } from "typeorm";
import { AppDataSource } from "../../database/db";
import { User } from "../../models/User.model";
import { Event } from "../../models/Event.model"
// import { IEUser } from "interfaces/interface.user";
import { IEvent } from "interfaces/event/event.interface";

export class EventService {
  private eventRepository: Repository<Event>;

  constructor() {
    this.eventRepository = AppDataSource.getRepository(Event);
  }

  async create(eventData: IEvent): Promise<Event> {
    const event = this.eventRepository.create(eventData);
    return await this.eventRepository.save(event);
  }
  
  async findAll(): Promise<Event[]> {
    return await this.eventRepository.find();
  }
  
  async findById(id: string): Promise<Event | null> {
    return await this.eventRepository.findOneBy({ id });
  }
  
  async update(id: string, updateData: Partial<IEvent>): Promise<Event | null> {
    await this.eventRepository.update(id, updateData);
    return this.findById(id);
  }
  
  async delete(id: string): Promise<boolean> {
    const result = await this.eventRepository.delete(id);
    return result.affected !== 0;
  }


  
}