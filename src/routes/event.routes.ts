import { Router } from "express";
import { EventController } from "controllers/event/event.controller";
import { EventService } from "services/event/event.service";
import { authentication, isOwner } from "middlewares/auth.middleware";

const eventRouter = Router();
const eventController = new EventController( new EventService());

eventRouter.post("/",authentication, async (req, res, next) => {
    await eventController.createEvent(req, res, next);
})

eventRouter.get(
    "/:id",
    async (req, res, next) => {
        await eventController.getEventById(req, res, next);
    }
)

eventRouter.get(
    "/",
    async (req, res, next) => {
        await eventController.getAllEvents(req, res, next);
    }
)

eventRouter.patch('/:id', authentication, isOwner, async(req, res, next)=>{
    await eventController.updateEvent(req, res, next)
})

eventRouter.delete('/:id', authentication, isOwner, async(req, res, next)=>{
    await eventController.deleteEvent(req, res, next)
})