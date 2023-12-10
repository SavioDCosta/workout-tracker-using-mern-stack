import { Request, Response } from "express";

const errorHandler = (err: any, req: Request, res: Response) => {
  console.error(err);
  switch (err.name) {
    case "Unauthorized":
      return res.status(400).send({
        error: "You're currently not authorized to perform this function.",
      });
    case "WriteConflict":
      return res.status(400).send({
        error: "There was an error writing this document to the database.",
      });
    case "DuplicateKey":
      return res.status(400).send({
        error: "This document already exists.",
      });
    case "ValidationError":
      return res.status(400).send({
        error: "Please enter all the fields correctly.",
      });
    default:
      return res.status(400).send({ error: "Something went wrong" });
  }
};

export default errorHandler;
