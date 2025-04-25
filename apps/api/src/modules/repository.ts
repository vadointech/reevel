import {
    DataSource,
    DeepPartial,
    EntityManager, EntityTarget, FindManyOptions, FindOneOptions,
    FindOptionsWhere,
    ObjectLiteral,
    Repository as TRepository,
} from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export class BaseRepository {

    protected queryRunner: QueryRunner;

    constructor(protected readonly dataSource: DataSource) {
        this.queryRunner = new QueryRunner(dataSource);
    }

    protected repository<T extends ObjectLiteral>(entity: new () => T): TRepository<T> {
        return this.dataSource.manager.getRepository(entity);
    }

    protected query<T extends ObjectLiteral, V>(
        entity: new () => T,
        func: (repository: TRepository<T>) => Promise<V>,
        entityManager?: EntityManager,
    ) {
        if (entityManager) {
            return func(entityManager.getRepository(entity));
        }
        return func(this.repository(entity));
    }
}

class QueryRunner {
    constructor(
        private readonly dataSource: DataSource,
    ) {}

    async create<Entity extends ObjectLiteral>(
        entity: EntityTarget<Entity>,
        values: DeepPartial<Entity>,
        entityManager?: EntityManager,
    ): Promise<Entity> {
        const repository = this.getRepository(entity, entityManager);
        return repository.save(
            repository.create(values),
        );
    }

    async update<Entity extends ObjectLiteral>(
        entity: new () => Entity,
        criteria: FindOptionsWhere<Entity>,
        values: QueryDeepPartialEntity<Entity>,
        entityManager?: EntityManager,
    ): Promise<Entity> {
        const repository = this.getRepository(entity, entityManager);

        const updatedData = await repository
            .createQueryBuilder()
            .update(entity, values)
            .where(criteria)
            .returning("*")
            .execute();

        return updatedData?.raw?.[0];
    }

    async get<Entity extends ObjectLiteral>(
        entity: new () => Entity,
        options?: FindManyOptions<Entity>,
        entityManager?: EntityManager,
    ): Promise<Entity[]> {
        const repository = this.getRepository(entity, entityManager);
        return repository.find(options);
    }

    async getOne<Entity extends ObjectLiteral>(
        entity: new () => Entity,
        options: FindOneOptions<Entity>,
        entityManager?: EntityManager,
    ): Promise<Entity | null> {
        const repository = this.getRepository(entity, entityManager);
        return repository.findOne(options);
    }

    async findOneBy<Entity extends ObjectLiteral>(
        entity: new () => Entity,
        options: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[],
        entityManager?: EntityManager,
    ): Promise<Entity | null> {
        const repository = this.getRepository(entity, entityManager);
        return repository.findOneBy(options);
    }

    async delete<Entity extends ObjectLiteral>(
        entity: new () => Entity,
        criteria: FindOptionsWhere<Entity>,
        entityManager?: EntityManager,
    ): Promise<boolean> {
        const repository = this.getRepository(entity, entityManager);
        await repository.delete(criteria);
        return true;
    }

    protected getRepository<Entity extends ObjectLiteral>(
        entity: EntityTarget<Entity>,
        entityManager?: EntityManager,
    ) {
        if(entityManager instanceof EntityManager) {
            return entityManager.getRepository(entity);
        } else {
            return this.dataSource.getRepository(entity);
        }
    }
}