// Validación de status code
pm.test("Status code es 200", () => {
    pm.expect(pm.response.code).to.eql(200);
});

// Validación de tiempo de respuesta
pm.test("Tiempo de respuesta es menor a 2000ms", () => {
    pm.expect(pm.response.responseTime).to.be.below(2000);
});

// Validación de Content-Type
pm.test("Content-Type es application/json", () => {
    pm.expect(pm.response.headers.get("Content-Type")).to.include("application/json");
});

// Validación de campos obligatorios
pm.test("La respuesta contiene los campos 'fact' y 'length'", () => {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property("fact");
    pm.expect(jsonData).to.have.property("length");
});

// Validación de tipos de datos
pm.test("Los campos tienen los tipos de datos correctos", () => {
    const jsonData = pm.response.json();
    pm.expect(jsonData.fact).to.be.a("string");
    pm.expect(jsonData.length).to.be.a("number");
});

// Validación de contenido
pm.test("El fact no está vacío", () => {
    const jsonData = pm.response.json();
    pm.expect(jsonData.fact.trim().length).to.be.above(0);
});

// Validación de consistencia
pm.test("El campo 'length' coincide con la longitud real del fact", () => {
    const jsonData = pm.response.json();
    pm.expect(jsonData.length).to.eql(jsonData.fact.length);
});

// Validación de status code
pm.test("Status code es 200", () => {
    pm.expect(pm.response.code).to.eql(200);
});

// Validación de tiempo de respuesta
pm.test("Tiempo de respuesta es menor a 2000ms", () => {
    pm.expect(pm.response.responseTime).to.be.below(2000);
});

// Validación de campos obligatorios
pm.test("La respuesta contiene los campos 'fact' y 'length'", () => {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property("fact");
    pm.expect(jsonData).to.have.property("length");
});

// Validación de tipos de datos
pm.test("Los campos tienen los tipos de datos correctos", () => {
    const jsonData = pm.response.json();
    pm.expect(jsonData.fact).to.be.a("string");
    pm.expect(jsonData.length).to.be.a("number");
});

// Validación específica del parámetro max_length usando la variable
pm.test("La longitud del fact no excede el max_length configurado", () => {
    const maxLength = parseInt(pm.collectionVariables.get("maxLength"));
    const jsonData = pm.response.json();
    pm.expect(jsonData.fact.length).to.be.at.most(maxLength);
});

// Validación de formato
pm.test("El fact comienza con letra mayúscula", () => {
    const jsonData = pm.response.json();
    const firstChar = jsonData.fact.charAt(0);
    pm.expect(firstChar).to.match(/[A-Z]/);
});