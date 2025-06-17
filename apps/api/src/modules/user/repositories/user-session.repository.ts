import { DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";

import { Repository } from "@/modules/repository";
import { UserSessionEntity } from "@/modules/user/entities/user-session.entity";

@Injectable()export class UserSessionRepository extends Repository<UserSessionEntity> {
    constructor(dataSource: DataSource) {
        super(dataSource, UserSessionEntity);
    }

    async updateSessionToken(id: string, refreshTokenHash: string, expiresIn: number) {
        return this.update({ id }, {
            refreshTokenHash,
            expiresAt: new Date(Date.now() + expiresIn),
        });
    }
}