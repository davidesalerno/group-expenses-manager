package net.davidesalerno.gem.transaction.utils;

import net.davidesalerno.gem.transaction.entity.Transaction;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(
        componentModel = "cdi",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface TransactionMapper {

    @Mapping(target = "id", ignore = true)
    Transaction toDAO(net.davidesalerno.gem.commons.dto.Transaction transactionDTO);

    net.davidesalerno.gem.commons.dto.Transaction toDTO(Transaction transactionDAO);
}
