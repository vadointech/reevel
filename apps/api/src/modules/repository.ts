import {
    DataSource,
    DeepPartial,
    EntityManager,
    EntityTarget,
    FindManyOptions,
    FindOneOptions,
    FindOptionsWhere,
    ObjectLiteral, SaveOptions, SelectQueryBuilder,
} from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export class Repository<Entity extends ObjectLiteral> {
    constructor(
        protected readonly dataSource: DataSource,
        private readonly entityTarget: EntityTarget<Entity>,
    ) {}

    protected currentRepository(entityManager?: EntityManager) {
        if(entityManager instanceof EntityManager) {
            return entityManager.getRepository(this.entityTarget);
        } else {
            return this.dataSource.getRepository(this.entityTarget);
        }
    }

    protected repository<T extends ObjectLiteral>(entityTarget: EntityTarget<T>, entityManager?: EntityManager) {
        if(entityManager instanceof EntityManager) {
            return entityManager.getRepository(entityTarget);
        } else {
            return this.dataSource.getRepository(entityTarget);
        }
    }

    async query(query: string, parameters?: any[], entityManager?: EntityManager): Promise<any> {
        const repository = this.currentRepository(entityManager);
        return repository.query(query, parameters);
    }

    queryBuilder(
        alias?: string,
        entityManager?: EntityManager,
    ): SelectQueryBuilder<Entity> {
        const repository = this.currentRepository(entityManager);
        return repository.createQueryBuilder(alias);
    }

    create(
        values: DeepPartial<Entity>,
    ): Entity {
        const repository = this.currentRepository();
        return repository.create(values);
    }
    async createAndSave(
        values: DeepPartial<Entity>,
        entityManager?: EntityManager,
    ): Promise<Entity> {
        const repository = this.currentRepository(entityManager);
        return repository.save(
            repository.create(values),
        );
    }
    async createAndSaveMany(
        values: DeepPartial<Entity>[],
        entityManager?: EntityManager,
    ): Promise<Entity[]> {
        const repository = this.currentRepository(entityManager);
        return repository.save(
            repository.create(values),
        );
    }

    async save(
        values: DeepPartial<Entity>,
        entityManager?: EntityManager,
    ): Promise<Entity> {
        const repository = this.currentRepository(entityManager);
        return repository.save(values);
    }
    async saveMany(
        values: DeepPartial<Entity>[],
        entityManager?: EntityManager,
        options?: SaveOptions,
    ): Promise<Entity[]> {
        const repository = this.currentRepository(entityManager);
        return repository.save(values, options);
    }

    async update(
        criteria: FindOptionsWhere<Entity>,
        values: QueryDeepPartialEntity<Entity>,
        entityManager?: EntityManager
    ): Promise<boolean>;
    async update(
        criteria: FindOptionsWhere<Entity>,
        values: QueryDeepPartialEntity<Entity>,
        returning?: boolean,
        entityManager?: EntityManager
    ): Promise<Entity>;
    async update(
        criteria: FindOptionsWhere<Entity>,
        values: QueryDeepPartialEntity<Entity>,
        arg3: boolean | EntityManager = false,
        arg4?: EntityManager,
    ): Promise<boolean | Entity> {
        if(arg3 === true) {
            const repository = this.currentRepository(arg4);
            const updateResult = await repository
                .createQueryBuilder()
                .update(this.entityTarget)
                .set(values)
                .where(criteria)
                .returning("*")
                .execute();

            return updateResult?.raw?.[0];
        } else {
            const repository = this.currentRepository(arg4);
            const updateResult = await repository.update(criteria, values);
            return updateResult.affected !== undefined && updateResult.affected > 0;
        }
    }

    async findMany(
        options?: FindManyOptions<Entity>,
        entityManager?: EntityManager,
    ): Promise<Entity[]> {
        const repository = this.currentRepository(entityManager);
        return repository.find(options);
    }

    async findManyBy(
        options: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[],
        entityManager?: EntityManager,
    ): Promise<Entity[]> {
        const repository = this.currentRepository(entityManager);
        return repository.findBy(options);
    }

    async findOne(
        options: FindOneOptions<Entity>,
        entityManager?: EntityManager,
    ): Promise<Entity | null> {
        const repository = this.currentRepository(entityManager);
        try {
            return repository.findOne(options);
        } catch {
            return null;
        }
    }

    async findOneBy(
        options: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[],
        entityManager?: EntityManager,
    ): Promise<Entity | null> {
        const repository = this.currentRepository(entityManager);
        try {
            return repository.findOneBy(options);
        } catch {
            return null;
        }
    }

    async delete(
        criteria: FindOptionsWhere<Entity>,
        entityManager?: EntityManager,
    ): Promise<boolean> {
        const repository = this.currentRepository(entityManager);
        await repository.delete(criteria);
        return true;
    }

    count(
        options?: FindManyOptions<Entity>,
        entityManager?: EntityManager,
    ): Promise<number> {
        const repository = this.currentRepository(entityManager);
        return repository.count(options);
    }

    countBy(
        options: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[],
        entityManager?: EntityManager,
    ): Promise<number> {
        const repository = this.currentRepository(entityManager);
        return repository.countBy(options);
    }

    exists(
        options?: FindManyOptions<Entity>,
        entityManager?: EntityManager,
    ): Promise<boolean> {
        const repository = this.currentRepository(entityManager);
        return repository.exists(options);
    }

    existsBy(
        options: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[],
        entityManager?: EntityManager,
    ): Promise<boolean> {
        const repository = this.currentRepository(entityManager);
        return repository.existsBy(options);
    }
}