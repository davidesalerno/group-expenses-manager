package net.davidesalerno.condoman.transaction.utils;

import net.davidesalerno.condoman.transaction.entity.Transaction;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(
        componentModel = "cdi",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface TransactionMapper {

    @Mapping(target = "id", ignore = true)
    Transaction toDAO(net.davidesalerno.condoman.commons.dto.Transaction transactionDTO);

    net.davidesalerno.condoman.commons.dto.Transaction toDTO( Transaction transactionDAO);
}
