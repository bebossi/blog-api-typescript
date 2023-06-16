import { User } from "./../entities/User"; // Replace with your User entity

declare module "express" {
  interface Request {
    currentUser?: User;
  }
}
