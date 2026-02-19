package br.tiagolopes.resource;

import br.tiagolopes.model.Product;
import br.tiagolopes.model.ProductComposition;
import br.tiagolopes.model.RawMaterial;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.notNullValue;

@QuarkusTest
public class RawMaterialResourceTest {
    @BeforeEach
    @Transactional
    public void cleanUp() {
        ProductComposition.deleteAll();
        Product.deleteAll();
        RawMaterial.deleteAll();
    }

    @Test
    public void testCreateRawMaterial_Success() {
        String jsonBody = """
            {
                "name": "Açúcar",
                "stockQuantity": 500,
                "unit": "KG"
            }
        """;

        given()
            .contentType(ContentType.JSON)
            .body(jsonBody)
            .when()
            .post("/raw-materials")
            .then()
            .statusCode(201)
            .body("id", notNullValue())
            .body("name", is("Açúcar"));
    }

    @Test
    public void testCreateRawMaterial_ValidationError() {
        String jsonBody = """
            {
                "name": "Açúcar"
            }
        """;

        given()
            .contentType(ContentType.JSON)
            .body(jsonBody)
            .when()
            .post("/raw-materials")
            .then()
            .body("type", is("VALIDATION"));
    }

    @Test
    public void testGetAllRawMaterials() {
        given()
            .when()
            .get("/raw-materials")
            .then()
            .statusCode(200)
            .body("size()", org.hamcrest.Matchers.greaterThanOrEqualTo(0));
    }

    @Test
    public void testDeleteRawMaterial_NotFound() {
        given()
            .when()
            .delete("/raw-materials/99999")
            .then()
            .statusCode(404);
    }
}
