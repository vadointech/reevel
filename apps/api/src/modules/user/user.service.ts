import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { ProfileInterestsRepository } from "@/modules/profile/repositories/profile-interests.repository";
import { Session } from "@/types";
import { GetUploadedFileParamsDto } from "@/modules/uploads/dto/get-image.dto";
import { UploadsRepository } from "@/modules/uploads/repositories/uploads.repository";

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly profileInterestsRepository: ProfileInterestsRepository,
        private readonly uploadsRepository: UploadsRepository,
    ) {}

    getUserSession(userId: string) {
        return this.userRepository.getSession(userId);
    }

    getUserInterests(session: Session) {
        return this.profileInterestsRepository.findMany({
            where: { profile: { userId: session.user.id }},
            relations: {
                interest: true,
            },
        });
    }

    getUserUploads(session: Session, params: GetUploadedFileParamsDto) {
        return this.uploadsRepository.findManyBy({
            userId: session.user.id,
            collection: params.collection,
            fileType: params.fileType,
            isDeleted: false,
        });
    }
    async deleteUserUploadedFile(_: Session, fileId: string) {
        await this.uploadsRepository.update({ id: fileId }, { isDeleted: true });
        return true;
    }
}
