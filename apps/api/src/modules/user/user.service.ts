import { Injectable } from "@nestjs/common";
import { UserRepository } from "./repositories/user.repository";
import { ProfileInterestsRepository } from "@/modules/profile/repositories/profile-interests.repository";
import { Session } from "@/types";
import { GetUploadedFileParamsDto } from "@/modules/uploads/dto/get-image.dto";
import { UploadsRepository } from "@/modules/uploads/repositories/uploads.repository";
import { ProfileRepository } from "@/modules/profile/repositories/profile.repository";

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly profileRepository: ProfileRepository,
        private readonly profileInterestsRepository: ProfileInterestsRepository,
        private readonly uploadsRepository: UploadsRepository,
    ) {}

    async getUserSession(session: Session) {
        return this.userRepository.getSession(session.user.id);
    }

    getUserProfile(session: Session) {
        return this.profileRepository.findOne({
            where: { userId: session.user.id },
            relations: {
                interests: {
                    interest: true,
                },
            },
        });
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
        return this.uploadsRepository.update({ id: fileId }, { isDeleted: true });
    }
}
