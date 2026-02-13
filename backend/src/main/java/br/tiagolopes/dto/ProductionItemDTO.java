package br.tiagolopes.dto;

public record ProductionItemDTO(
    String productName,
    Integer quantityToProduce,
    Double unitPrice,
    Double subTotal
) {}
