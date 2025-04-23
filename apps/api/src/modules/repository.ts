import { DataSource, EntityManager, ObjectLiteral, Repository as TRepository } from "typeorm";

export class BaseRepository {
    constructor(protected readonly dataSource: DataSource) {
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