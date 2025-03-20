package net.davidesalerno.gem.account.resource;

import io.quarkus.test.common.http.TestHTTPEndpoint;
import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.is;

@QuarkusTest
@TestHTTPEndpoint(AccountResource.class)
public class AccountResourceTest {
    @Test
    void shouldTestTheHelloWorld() {
        given().when()
                .get("/")
                .then()
                .statusCode(200)
                .body( is("Hello World!"));
    }
}
