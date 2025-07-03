import { Request, Response, NextFunction } from "express";
import { EventService } from "../../services/event/event.service";
import { IEvent } from "interfaces/event/event.interface";
import { z } from 'zod';

const eventSchema = z.object({
  title: z.string().min(1),
  date: z.string().datetime(),
  // Add other fields as per IEvent
});
interface ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
}

export class EventController {
    constructor(private eventService: EventService){}

    async createEvent(req: Request, res: Response, next: NextFunction): Promise<void>{
        try {
            const eventData: IEvent = req.body
            const validatedData = eventSchema.parse(req.body);
            const event = await this.eventService.create(eventData);
            res.status(201).json({status: "success", data: event});
        } catch (error) {
            next(error);
        }
    }

    // use this for filter

    async getAllEvents(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const events = await this.eventService.findAll();
            res.status(200).json(events);
        } catch (error) {
            next(error);
        }
    }

    async getEventById(req: Request, res: Response, next: NextFunction): Promise<Response | null> {
        try {
            const event = await this.eventService.findById(req.params.id);
            if (!event) {
                return res.status(404).json({ message: 'Event not found' });
            }
            res.status(200).json(event);
        } catch (error) {
            next(error);
        }
        return null
    }

    async updateEvent(req: Request, res: Response, next: NextFunction) {
        try {
            const event = await this.eventService.update(req.params.id, req.body);
            if (!event) {
                return res.status(404).json({ message: 'Event not found' });
            }
            res.status(200).json(event);
        } catch (error) {
            next(error);
        }
    }

    async deleteEvent(req: Request, res: Response, next: NextFunction) {
        try {
            const success = await this.eventService.delete(req.params.id);
            if (!success) {
                return res.status(404).json({ message: 'Event not found' });
            }
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

// async createEvent(req: Request, res: Response<IEvent>, next: NextFunction) { ... }
// async getAllEvents(req: Request, res: Response<IEvents>, next: NextFunction) { ... }
// async getEventById(req: Request, res: Response<IEvent>, next: NextFunction) { ... }
// async updateEvent(req: Request, res: Response<IEvent>, next: NextFunction) { ... }
// async deleteEvent(req: Request, res: Response<void>, next: NextFunction) { ... }