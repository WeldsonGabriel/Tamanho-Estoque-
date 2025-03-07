-- CreateTable
CREATE TABLE `Estoque` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_produto` VARCHAR(191) NOT NULL,
    `tamanho_pallet` DOUBLE NOT NULL,
    `largura` DOUBLE NOT NULL,
    `comprimento` DOUBLE NOT NULL,
    `altura` DOUBLE NOT NULL,
    `corredor` DOUBLE NOT NULL,
    `saida` DOUBLE NOT NULL,
    `piking` DOUBLE NOT NULL,
    `capacidade_pallet` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
