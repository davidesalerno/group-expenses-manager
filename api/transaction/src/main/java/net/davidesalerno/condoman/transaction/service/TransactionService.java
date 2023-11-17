package net.davidesalerno.condoman.transaction.service;

import io.quarkus.hibernate.reactive.panache.common.WithSession;
import io.quarkus.hibernate.reactive.panache.common.WithTransaction;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import net.davidesalerno.condoman.commons.dto.Paginated;
import net.davidesalerno.condoman.commons.dto.Transaction;
import net.davidesalerno.condoman.transaction.repository.TransactionRepository;
import net.davidesalerno.condoman.transaction.utils.TransactionMapper;
import org.jboss.resteasy.reactive.RestResponse;

import java.time.LocalDate;

import static org.jboss.resteasy.reactive.RestResponse.ResponseBuilder.ok;


@ApplicationScoped
public class TransactionService {

    @Inject
    TransactionRepository transactionRepository;

    @Inject
    TransactionMapper trasactionMapper;

    @WithSession
    public Uni<Paginated<Transaction>> retrieveByAccountId(Long accountId) {
        return transactionRepository.findByAccountAndAfterDate(accountId, LocalDate.now()).flatMap(found -> Uni.createFrom().item(new Paginated.PaginatedBuilder<Transaction>().items(found.stream().map(transaction -> trasactionMapper.toDTO(transaction)).toList()).page(0).build()));
    }

    @WithSession
    public Uni<Transaction> retrieveById(Long id) {
        return transactionRepository.findById(id).map(item -> trasactionMapper.toDTO(item));
    }

    @WithTransaction
    public Uni<RestResponse<Transaction>> insert(Transaction transaction) {
        return transactionRepository.persist(trasactionMapper.toDAO(transaction)).map(inserted -> ok(trasactionMapper.toDTO(inserted)).status(RestResponse.Status.CREATED).build());
    }

    @WithTransaction
    public Uni<Boolean> deleteById(Long id) {
        return transactionRepository.deleteById(id);
    }
}
