import {
    DataSource,
    DeepPartial,
    EntityManager,
    EntityTarget,
    FindManyOptions,
    FindOneOptions,
    FindOptionsWhere,
    ObjectLiteral, SelectQueryBuilder,
} from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export class Repository<Entity extends ObjectLiteral> {
    constructor(
        protected readonly dataSource: DataSource,
        private readonly entityTarget: EntityTarget<Entity>,
    ) {}

    protected getRepository(entityManager?: EntityManager) {
        if(entityManager instanceof EntityManager) {
            return entityManager.getRepository(this.entityTarget);
        } else {
            return this.dataSource.getRepository(this.entityTarget);
        }
    }

    async query(query: string, parameters?: any[], entityManager?: EntityManager): Promise<any> {
        const repository = this.getRepository(entityManager);
        return repository.query(query, parameters);
    }

    async queryBuilder(
        alias?: string,
        entityManager?: EntityManager,
    ): Promise<SelectQueryBuilder<Entity>> {
        const repository = this.getRepository(entityManager);
        return repository.createQueryBuilder(alias);
    }

    async create(
        values: DeepPartial<Entity>,
        entityManager?: EntityManager,
    ): Promise<Entity> {
        const repository = this.getRepository(entityManager);
        return repository.save(
            repository.create(values),
        );
    }

    async createMany(
        values: DeepPartial<Entity>[],
        entityManager?: EntityManager,
    ): Promise<Entity[]> {
        const repository = this.getRepository(entityManager);
        return repository.save(
            repository.create(values),
        );
    }

    async update(
        criteria: FindOptionsWhere<Entity>,
        values: QueryDeepPartialEntity<Entity>,
        entityManager?: EntityManager,
    ): Promise<Entity> {
        const repository = this.getRepository(entityManager);

        const updatedData = await repository
            .createQueryBuilder()
            .update(this.entityTarget, values)
            .where(criteria)
            .returning("*")
            .execute();

        return updatedData?.raw?.[0];
    }


    async findMany(
        options?: FindManyOptions<Entity>,
        entityManager?: EntityManager,
    ): Promise<Entity[]> {
        const repository = this.getRepository(entityManager);
        return repository.find(options);
    }

    async findManyBy(
        options: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[],
        entityManager?: EntityManager,
    ): Promise<Entity[]> {
        const repository = this.getRepository(entityManager);
        return repository.findBy(options);
    }

    async findOne(
        options: FindOneOptions<Entity>,
        entityManager?: EntityManager,
    ): Promise<Entity | null> {
        const repository = this.getRepository(entityManager);
        return repository.findOne(options);
    }

    async findOneBy(
        options: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[],
        entityManager?: EntityManager,
    ): Promise<Entity | null> {
        const repository = this.getRepository(entityManager);
        return repository.findOneBy(options);
    }

    async delete(
        criteria: FindOptionsWhere<Entity>,
        entityManager?: EntityManager,
    ): Promise<boolean> {
        const repository = this.getRepository(entityManager);
        await repository.delete(criteria);
        return true;
    }

    count(
        options?: FindManyOptions<Entity>,
        entityManager?: EntityManager,
    ): Promise<number> {
        const repository = this.getRepository(entityManager);
        return repository.count(options);
    }

    countBy(
        options: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[],
        entityManager?: EntityManager,
    ): Promise<number> {
        const repository = this.getRepository(entityManager);
        return repository.countBy(options);
    }

    exists(
        options?: FindManyOptions<Entity>,
        entityManager?: EntityManager,
    ): Promise<boolean> {
        const repository = this.getRepository(entityManager);
        return repository.exists(options);
    }

    existsBy(
        options: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[],
        entityManager?: EntityManager,
    ): Promise<boolean> {
        const repository = this.getRepository(entityManager);
        return repository.existsBy(options);
    }
}