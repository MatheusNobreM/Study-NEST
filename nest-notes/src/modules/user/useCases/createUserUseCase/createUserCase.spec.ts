import { User } from "generated/prisma";
import { CreateUserUseCase } from "./createUserUseCase";
import { UserRepositoryMemory } from "../../repositories/UserRepositoryMemory";
import { compare } from "bcrypt";

let createUserUseCase: CreateUserUseCase;
let userRepositoryMemory: UserRepositoryMemory;

describe("Create User", () => {
   beforeEach(() => {
    userRepositoryMemory = new UserRepositoryMemory()

    createUserUseCase = new CreateUserUseCase(userRepositoryMemory)
   })

   it("Should be able to create a user", async() => {
   expect(userRepositoryMemory.users).toEqual([]);

   const user = await createUserUseCase.execute({
         email: "email@email.com",
         name: "Matheus",
         password: "123456",
   })

   expect(userRepositoryMemory.users).toEqual([user]);

   });

   it("Should be able to create a user with password encrypted", async() => {
      const userPasswordWithoutEncryption = "123456";

   const user = await createUserUseCase.execute({
         email: "email@email.com",
         name: "Matheus",
         password: "123456",
   })

   const userHashPassordEncrypted = await compare(userPasswordWithoutEncryption, user.password);

   expect(userHashPassordEncrypted).toBeTruthy();

   });
});