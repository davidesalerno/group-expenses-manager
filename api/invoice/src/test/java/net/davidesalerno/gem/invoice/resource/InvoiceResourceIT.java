package net.davidesalerno.gem.invoice.resource;
import io.quarkus.test.common.http.TestHTTPEndpoint;
import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.is;

@QuarkusTest
@TestHTTPEndpoint(InvoiceResource.class)
public class InvoiceResourceIT {
    @Test
    void shouldTestTheHelloWorld() {
        given().when()
                .get("/invoice")
                .then()
                .statusCode(200)
                .body( is("Hello World!"));
    }
}
