package net.davidesalerno.condoman.parcel.resource;

import io.smallrye.mutiny.Uni;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import org.jboss.resteasy.reactive.RestResponse;

import static org.jboss.resteasy.reactive.RestResponse.ResponseBuilder.ok;

@Path("/parcel")
public class ParcelResource {
    @GET
    public Uni<RestResponse<String>> get() {
        return Uni.createFrom().item(ok("Hello World!").build());
    }
}
