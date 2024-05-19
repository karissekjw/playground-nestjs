import { PrismaService } from "src/database/prisma.service";

const prisma = new PrismaService()
const modelMapping = {
  User: prisma.user
};

export default class BaseRepository<T, CreateInput, UpdateInput> {
  protected model;

  constructor(modelName: keyof typeof modelMapping) {
    this.model = modelMapping[modelName];
    this.findMany = this.findMany.bind(this);
    this.create = this.create.bind(this);
    this.findById = this.findById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async findMany(): Promise<T[]>  {
    return this.model.findMany();
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: CreateInput): Promise<T> {
    return this.model.create({ data });
  }

  async update(id: string, data: UpdateInput): Promise<T> {
    return this.model.update({
      where: { id },
      data: {
        ...data,
      },
    });
  }

  async delete(id: string): Promise<T> {
    return this.model.delete({
      where: { id },
    });
  }
}