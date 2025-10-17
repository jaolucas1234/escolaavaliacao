-- CreateTable
CREATE TABLE `Professor` (
    `id_professor` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Professor_email_key`(`email`),
    PRIMARY KEY (`id_professor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Turma` (
    `id_turma` INTEGER NOT NULL AUTO_INCREMENT,
    `serie` VARCHAR(191) NOT NULL,
    `professorId` INTEGER NOT NULL,

    PRIMARY KEY (`id_turma`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Atividade` (
    `id_atividade` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(191) NOT NULL,
    `turmaId` INTEGER NOT NULL,

    PRIMARY KEY (`id_atividade`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Turma` ADD CONSTRAINT `Turma_professorId_fkey` FOREIGN KEY (`professorId`) REFERENCES `Professor`(`id_professor`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Atividade` ADD CONSTRAINT `Atividade_turmaId_fkey` FOREIGN KEY (`turmaId`) REFERENCES `Turma`(`id_turma`) ON DELETE RESTRICT ON UPDATE CASCADE;
