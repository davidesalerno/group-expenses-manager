<<<<<<<< HEAD:api/account/src/test/java/net/davidesalerno/gem/account/resource/AccountResourceTest.java
package net.davidesalerno.gem.account.resource;

========
package net.davidesalerno.gem.invoice.resource;
>>>>>>>> e6972d9 (fix: tests into invoice service):api/invoice/src/test/java/net/davidesalerno/gem/invoice/resource/InvoiceResourceIT.java
import io.quarkus.test.common.http.TestHTTPEndpoint;
import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.is;

@QuarkusTest
<<<<<<<< HEAD:api/account/src/test/java/net/davidesalerno/gem/account/resource/AccountResourceTest.java
@TestHTTPEndpoint(AccountResource.class)
public class AccountResourceTest {
========
@TestHTTPEndpoint(InvoiceResource.class)
public class InvoiceResourceIT {
>>>>>>>> e6972d9 (fix: tests into invoice service):api/invoice/src/test/java/net/davidesalerno/gem/invoice/resource/InvoiceResourceIT.java
    @Test
    void shouldTestTheHelloWorld() {
        given().when()
                .get("/invoice")
                .then()
                .statusCode(200)
                .body( is("Hello World!"));
    }
}
