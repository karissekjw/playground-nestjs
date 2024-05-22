import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { DuplicateRecordError } from "./errors";
import { PrismaService } from "../database/prisma.service";

const prisma = new PrismaService()
const modelMapping = {
  User: prisma.user
};

export default class BaseRepository<T, CreateInput, UpdateInput> {
  protected model;
  private modelName: string;

  constructor(modelName: keyof typeof modelMapping) {
    this.modelName = modelName;
    this.model = modelMapping[modelName];
  }

  async findMany(): Promise<T[]>  {
    return await this.model.findMany();
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: CreateInput): Promise<T> {
    try {
      return await this.model.create({ data });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new DuplicateRecordError(`${this.modelName} already exists`);
        }
      }
    }
  }

  async update(id: string, data: UpdateInput): Promise<T> {
    return await this.model.update({
      where: { id },
      data: {
        ...data,
      },
    });
  }

  async delete(id: string): Promise<T> {
    return await this.model.delete({
      where: { id },
    });
  }
}