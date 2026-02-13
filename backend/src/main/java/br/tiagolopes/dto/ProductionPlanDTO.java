package br.tiagolopes.dto;

import java.util.List;

public record ProductionPlanDTO(
    List<ProductionItemDTO> productionList,
    Double totalValue,
    Integer totalItems
) {}
