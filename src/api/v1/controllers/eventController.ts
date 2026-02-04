import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as eventService from "../services/eventService";
import { Event } from "../services/eventService";

export const getAllEvents = (req: Request, res: Response): void => {
  const events: Event[] = eventService.getAllEvents();
  res.status(HTTP_STATUS.OK).json({ message: "Get all events", data: events });
};

export const getEventById = (req: Request, res: Response): void => {
  const { id } = req.params;
  const event: Event | undefined = eventService.getEventById(Number(id));

  if (!event) {
    res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Event not found" });
    return;
  }

  res.status(HTTP_STATUS.OK).json({ message: "Event found", data: event });
};

export const getEventPopularity = (req: Request, res: Response): void => {
  const { id } = req.params;
  const event: Event | undefined = eventService.getEventById(Number(id));

  if (!event) {
    res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Event not found" });
    return;
  }

  const popularityData = eventService.getPopularityResponse(event);
  res.status(HTTP_STATUS.OK).json({ message: "Event popularity found", data: popularityData });
};

export const createEvent = (req: Request, res: Response): void => {
  const { name, date, capacity } = req.body;

  if (!name || !date || capacity === undefined || capacity === null) {
    res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Missing required fields: name, date, and capacity are required" });
    return;
  }

  const createdEvent: Event = eventService.createEvent(name, date, capacity);
  res.status(HTTP_STATUS.CREATED).json({ message: "Event created", data: createdEvent });
};

export const updateEvent = (req: Request, res: Response): void => {
  const { id } = req.params;
  const updateData = req.body;

  if (isNaN(Number(id))) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Missing or invalid event id" });
    return;
  }

  const updatedEvent: Event | undefined = eventService.updateEvent(Number(id), updateData);

  if (!updatedEvent) {
    res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Event not found" });
    return;
  }

  res.status(HTTP_STATUS.OK).json({ message: "Event updated", data: updatedEvent });
};

export const deleteEvent = (req: Request, res: Response): void => {
  const { id } = req.params;
  const deleted: boolean = eventService.deleteEvent(Number(id));

  if (!deleted) {
    res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Event not found" });
    return;
  }

  res.status(HTTP_STATUS.OK).json({ message: "Event deleted" });
};