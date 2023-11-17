package net.davidesalerno.condoman.transaction.resource;

import io.quarkus.logging.Log;
import io.smallrye.mutiny.Uni;
import jakarta.inject.Inject;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import net.davidesalerno.condoman.commons.dto.Transaction;
import net.davidesalerno.condoman.transaction.service.TransactionService;
import org.jboss.resteasy.reactive.RestResponse;

import net.davidesalerno.condoman.commons.dto.Paginated;

import static org.jboss.resteasy.reactive.RestResponse.ResponseBuilder.ok;


@Path("/transaction")
public class TransactionResource {

    @Inject
    TransactionService transactionService;
    @POST
    public Uni<RestResponse<Transaction>> insertTransaction(Transaction transaction) {
        return transactionService.insert(transaction);
    }

    @GET
    @Path("/{id}")
    public Uni<RestResponse<Transaction>> get(Long id) {
        return transactionService.retrieveById(id).map(item -> ok(item).status(RestResponse.Status.FOUND).build()).onFailure().recoverWithItem(err -> { Log.error(err); return RestResponse.status(RestResponse.Status.INTERNAL_SERVER_ERROR);});
    }

    @DELETE
    @Path("/{id}")
    public Uni<RestResponse<Boolean>> delete(Long id) {
        return transactionService.deleteById(id).map(item -> ok(item).build()).onFailure().recoverWithItem(err -> { Log.error(err); return RestResponse.status(RestResponse.Status.INTERNAL_SERVER_ERROR);});
    }
    @GET
    @Path("byaccount/{accountId:\\d+}")
    public Uni<RestResponse<Paginated<Transaction>>> findByAccount(Long accountId) {
        return transactionService.retrieveByAccountId(accountId).map(item -> ok(item).status(RestResponse.Status.FOUND).build()).onFailure().recoverWithItem( err -> { Log.error(err); return RestResponse.status(RestResponse.Status.INTERNAL_SERVER_ERROR);});
    }
}