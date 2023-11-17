import io.quarkus.test.common.http.TestHTTPEndpoint;
import io.quarkus.test.junit.QuarkusTest;
import net.davidesalerno.condoman.parcel.resource.ParcelResource;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.is;

@QuarkusTest
@TestHTTPEndpoint(ParcelResource.class)
public class ParcelResourceTest {
    @Test
    void shouldTestTheHelloWorld() {
        given().when()
                .get("/")
                .then()
                .statusCode(200)
                .body( is("Hello World!"));
    }
}
