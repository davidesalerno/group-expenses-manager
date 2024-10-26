import io.quarkus.test.common.http.TestHTTPEndpoint;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import net.davidesalerno.gem.commons.dto.Transaction;
import net.davidesalerno.gem.transaction.resource.TransactionResource;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

@QuarkusTest
@TestHTTPEndpoint(TransactionResource.class)
class TransactionResourceTest {

    @Test
    void shouldCreateListAnDeleteTransactionSuccessfully() {
        //TODO Split this test
        given().when()
                .get("by_account/1")
                .then()
                .statusCode(200)
                .body("items.size()", is(0));

        Transaction transaction = new Transaction();
        transaction.setAccountId(1L);
        transaction.setAmount(new BigDecimal(100));
        transaction.setDescription("test");
        transaction.setType(Transaction.Type.EXPENSE);
        transaction.setDate(LocalDate.now());
        given()
                .contentType(ContentType.JSON)
                .body(transaction)
                .when()
                .post("")
                .then()
                .statusCode(201)
                .body(is("{\"id\":1,\"accountId\":1,\"amount\":100,\"description\":\"test\",\"type\":\"EXPENSE\",\"date\":\""+LocalDate.now()+"\"}"));
        transaction.setAmount(new BigDecimal(101));
        given()
                .contentType(ContentType.JSON)
                .body(transaction)
                .when()
                .post("")
                .then()
                .statusCode(201)
                .body(is("{\"id\":2,\"accountId\":1,\"amount\":101,\"description\":\"test\",\"type\":\"EXPENSE\",\"date\":\""+LocalDate.now()+"\"}"));

        given().when()
                .get("1")
                .then()
                .statusCode(200)
                .body("id", is(1))
                .body("accountId", is(1))
                .body("amount", is(100))
                .body("type", is("EXPENSE"))
                .body("date", is(LocalDate.now().toString()));

        given().when()
                .get("by_account/1")
                .then()
                .statusCode(200)
                .body("items.size()", is(2));

        given().when()
                .get("by_account/1/after_date/"+LocalDate.now())
                .then()
                .statusCode(200)
                .body("items.size()", is(2));

        given().when()
                .get("all")
                .then()
                .statusCode(200)
                .body("items.size()", is(2));


        given().when()
                .get("by_account/1/after_date/"+LocalDate.now().plusDays(1))
                .then()
                .statusCode(200)
                .body("items.size()", is(0));

        given().when()
                .delete("1")
                .then()
                .statusCode(200)
                .body(is("true"));

        given().when()
                .delete("2")
                .then()
                .statusCode(200)
                .body(is("true"));
    }
}