import { Repository } from "typeorm";
import { AppDataSource } from "../database/db";
import { User } from "../models/User.model";
import { IUser } from "../interfaces/interface.user";

export class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async createUser(data: IUser): Promise<User> {
    const user = this.userRepository.create(data);
    return await this.userRepository.save(user);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email });
  }

  async findUserById(id: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }
    async updateUser(id: string, data: Partial<IUser>): Promise<User | null> {
        const user = await this.userRepository.update(id, data);
        return await this.userRepository.findOneBy({ id });
    }
  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }
    async deleteUser(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }
}