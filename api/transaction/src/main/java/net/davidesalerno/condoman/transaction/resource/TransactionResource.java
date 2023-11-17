package net.davidesalerno.condoman.transaction.resource;

import io.quarkus.logging.Log;
import io.smallrye.mutiny.Uni;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import net.davidesalerno.condoman.commons.dto.Transaction;
import net.davidesalerno.condoman.transaction.service.TransactionService;
import org.jboss.resteasy.reactive.RestResponse;

import net.davidesalerno.condoman.commons.dto.Paginated;

import java.time.LocalDate;

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
        return transactionService.retrieveById(id).map(item -> ok(item).build()).onFailure().recoverWithItem(err -> { Log.error(err); return RestResponse.status(RestResponse.Status.INTERNAL_SERVER_ERROR);});
    }

    @DELETE
    @Path("/{id}")
    public Uni<RestResponse<Boolean>> delete(Long id) {
        return transactionService.deleteById(id).map(item -> ok(item).build()).onFailure().recoverWithItem(err -> { Log.error(err); return RestResponse.status(RestResponse.Status.INTERNAL_SERVER_ERROR);});
    }
    @GET
    @Path("by_account/{accountId:\\d+}")
    public Uni<RestResponse<Paginated<Transaction>>> findByAccount(Long accountId, @QueryParam("page") @DefaultValue("0") int pageIndex, @QueryParam("size") @DefaultValue("12") int pageSize) {
        return transactionService.retrieveByAccountId(accountId,pageIndex,pageSize).map(item -> ok(item).build()).onFailure().recoverWithItem( err -> { Log.error(err); return RestResponse.status(RestResponse.Status.INTERNAL_SERVER_ERROR);});
    }

    @GET
    @Path("by_account/{accountId:\\d+}/after_date/{afterDate}")
    public Uni<RestResponse<Paginated<Transaction>>> findByAccountAndAfterDate(Long accountId, LocalDate afterDate, @QueryParam("page") @DefaultValue("0") int pageIndex, @QueryParam("size") @DefaultValue("12") int pageSize) {
        return transactionService.retrieveByAccountIdAfterDate(accountId,afterDate,pageIndex,pageSize).map(item -> ok(item).build()).onFailure().recoverWithItem( err -> { Log.error(err); return RestResponse.status(RestResponse.Status.INTERNAL_SERVER_ERROR);});
    }
    @GET
    @Path("all")
    public Uni<RestResponse<Paginated<Transaction>>> listAll( @QueryParam("page") @DefaultValue("0") int pageIndex, @QueryParam("size") @DefaultValue("20") int pageSize) {
        return transactionService.listAll(pageIndex,pageSize).map(item -> ok(item).build()).onFailure().recoverWithItem( err -> { Log.error(err); return RestResponse.status(RestResponse.Status.INTERNAL_SERVER_ERROR);});
    }
}