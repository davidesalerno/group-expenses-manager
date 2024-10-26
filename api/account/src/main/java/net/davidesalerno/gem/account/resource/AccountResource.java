package net.davidesalerno.gem.account.resource;

import io.smallrye.mutiny.Uni;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import org.jboss.resteasy.reactive.RestResponse;

import static org.jboss.resteasy.reactive.RestResponse.ResponseBuilder.ok;

@Path("/account")
public class AccountResource {
    @GET
    public Uni<RestResponse<String>> get() {
        return Uni.createFrom().item(ok("Hello World!").build());
    }
}
