package net.davidesalerno.condoman.transaction.repository;

import io.quarkus.hibernate.reactive.panache.PanacheRepository;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import net.davidesalerno.condoman.transaction.entity.Transaction;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ApplicationScoped
public class TransactionRepository implements PanacheRepository<Transaction> {
    public Uni<List<Transaction>> findByAccount(Long accountId, Integer pageIndex, Integer pageSize){
        return find("accountId", accountId).page(pageIndex, pageSize).list();
    }

    public Uni<List<Transaction>> findByAccountAndAfterDate(Long accountId, LocalDate afterDate, Integer pageIndex, Integer pageSize){
        Map<String, Object> params = new HashMap<>();
        params.put("afterDate", afterDate);
        params.put("accountId", accountId);
        return find("accountId = :accountId and date >= :afterDate", params).page(pageIndex, pageSize).list();
    }
}
