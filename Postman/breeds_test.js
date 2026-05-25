// Validación de status code
pm.test("Status code es 200", () => {
    pm.expect(pm.response.code).to.eql(200);
});

// Validación de tiempo de respuesta
pm.test("Tiempo de respuesta es menor a 2000ms", () => {
    pm.expect(pm.response.responseTime).to.be.below(2000);
});

// Validación de estructura general
pm.test("La respuesta tiene estructura de paginación", () => {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property("current_page");
    pm.expect(jsonData).to.have.property("data");
    pm.expect(jsonData).to.have.property("total");
    pm.expect(jsonData).to.have.property("per_page");
    pm.expect(jsonData).to.have.property("last_page");
});

// Validación de array
pm.test("El campo 'data' es un array", () => {
    const jsonData = pm.response.json();
    pm.expect(jsonData.data).to.be.an("array");
});

// Validación de longitud del array
pm.test("El array 'data' no está vacío", () => {
    const jsonData = pm.response.json();
    pm.expect(jsonData.data.length).to.be.above(0);
});

// Validación de longitud según per_page
pm.test("La cantidad de items coincide con per_page o es menor", () => {
    const jsonData = pm.response.json();
    pm.expect(jsonData.data.length).to.be.at.most(jsonData.per_page);
});

// Validación de campos en cada breed
pm.test("Cada raza tiene los campos requeridos con tipos correctos", () => {
    const jsonData = pm.response.json();
    jsonData.data.forEach(breed => {
        pm.expect(breed).to.have.property("breed");
        pm.expect(breed).to.have.property("country");
        pm.expect(breed).to.have.property("origin");
        pm.expect(breed).to.have.property("coat");
        pm.expect(breed).to.have.property("pattern");
        pm.expect(breed.breed).to.be.a("string");
        pm.expect(breed.country).to.be.a("string");
    });
});

// Estamos en la primera página
pm.test("La página actual es 1", () => {
    const jsonData = pm.response.json();
    pm.expect(jsonData.current_page).to.eql(1);
});

// Validación de status code
pm.test("Status code es 200", () => {
    pm.expect(pm.response.code).to.eql(200);
});

// Validación de tiempo de respuesta
pm.test("Tiempo de respuesta es menor a 2000ms", () => {
    pm.expect(pm.response.responseTime).to.be.below(2000);
});

// Validación clave de paginación
pm.test("La página actual es 2", () => {
    const jsonData = pm.response.json();
    pm.expect(jsonData.current_page).to.eql(2);
});

// Validación de campos de paginación
pm.test("Los campos de paginación tienen tipos correctos", () => {
    const jsonData = pm.response.json();
    pm.expect(jsonData.current_page).to.be.a("number");
    pm.expect(jsonData.total).to.be.a("number");
    pm.expect(jsonData.per_page).to.be.a("number");
    pm.expect(jsonData.last_page).to.be.a("number");
});

// Validación de URLs de navegación
pm.test("Las URLs de navegación contienen el parámetro page", () => {
    const jsonData = pm.response.json();
    pm.expect(jsonData.first_page_url).to.include("page=1");
    pm.expect(jsonData.next_page_url === null || jsonData.next_page_url.includes("page=3")).to.be.true;
    pm.expect(jsonData.prev_page_url).to.include("page=1");
});

// Validación del array data
pm.test("El array 'data' contiene razas válidas", () => {
    const jsonData = pm.response.json();
    pm.expect(jsonData.data).to.be.an("array");
    pm.expect(jsonData.data.length).to.be.above(0);
    
    jsonData.data.forEach(breed => {
        pm.expect(breed).to.have.property("breed");
        pm.expect(breed.breed).to.be.a("string");
        pm.expect(breed.breed.length).to.be.above(0);
    });
});

// Validación de rango (from y to)
pm.test("Los campos 'from' y 'to' son consistentes con per_page", () => {
    const jsonData = pm.response.json();
    pm.expect(jsonData.from).to.be.a("number");
    pm.expect(jsonData.to).to.be.a("number");
    pm.expect(jsonData.to).to.be.at.least(jsonData.from);
});