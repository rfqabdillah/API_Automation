import { expect } from "chai";
import assert from "assert";

describe("Positive Case Test API Reqres", () => {

  it("GET: should get user list on page 2", async () => {
    const startTime = Date.now();
    const response = await fetch("https://reqres.in/api/users?page=2");
    const duration = Date.now() - startTime;
    const data = await response.json();

    expect(response.status).to.equal(200); // Cek apakah status HTTP adalah 200 (OK)
    assert.strictEqual(data.page, 2); // Cek apakah nomor halaman pada body respons adalah 2  
    expect(data.data).to.be.an("array"); // Cek apakah data berbentuk array 
    expect(data.data[0]).to.have.property('email'); // Cek bahwa objek pengguna pertama memiliki properti 'email'
    assert.strictEqual(data.data[0].id, 7); // Cek bahwa ID pengguna pertama di halaman 2 adalah 7
    expect(duration).to.be.lessThan(1000); // Cek bahwa durasi permintaan kurang dari 1000ms
  });

  it("GET: should get user with id 2", async () => {
    const startTime = Date.now();
    const response = await fetch("https://reqres.in/api/users/2");  // Lakukan request GET ke endpoint untuk user ID 2
    const duration = Date.now() - startTime;
    const data = await response.json();

    expect(response.status).to.equal(200); // Cek apakah status HTTP adalah 200 (OK)
    expect(data.data).to.be.an("object"); // Cek bahwa properti 'data' adalah sebuah objek
    assert.strictEqual(data.data.id, 2); // Cek bahwa ID pengguna di dalam data adalah 2
    // Cek bahwa data pengguna memiliki properti yang diharapkan
    expect(data.data).to.have.property('email');
    expect(data.data).to.have.property('first_name');
    expect(data.data).to.have.property('last_name');
    expect(duration).to.be.lessThan(1000);  // Cek bahwa durasi permintaan kurang dari 1000ms
  });

  it("POST: should create a new user", async () => {
    const startTime = Date.now();

    const response = await fetch("https://reqres.in/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "reqres-free-v1"
      },
      body: JSON.stringify({
        name: "rifqi abdillah",
        job: "leader"
      })
    });
    const duration = Date.now() - startTime;
    const data = await response.json();

    expect(response.status).to.equal(201); // Cek status HTTP adalah 201 (created)
    expect(data).to.have.property("name", "rifqi abdillah");
    expect(data).to.have.property("job", "leader");
    expect(data).to.have.property("id"); // Pastikan ID ada di respons
    expect(duration).to.be.lessThan(1000); // Cek bahwa durasi permintaan kurang dari 1000ms
  });

  it("PATCH: should update user info", async () => {
    const startTime = Date.now();
    const response = await fetch("https://reqres.in/api/users/2", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "reqres-free-v1"
      },
      body: JSON.stringify({
        name: "rifqi abdillah",
        job: "developer"
      })
    });

    const duration = Date.now() - startTime;
    const data = await response.json();

    expect(response.status).to.equal(200);
    expect(data).to.have.property("name", "rifqi abdillah");
    expect(data).to.have.property("job", "developer");
    expect(duration).to.be.lessThan(1000);
  });

  it("DELETE: should delete user", async () => {
    const startTime = Date.now();
    const response = await fetch("https://reqres.in/api/users/2", {
      method: "DELETE",
      headers: {
        "x-api-key": "reqres-free-v1"
      }
    });

    const duration = Date.now() - startTime;
    expect(response.status).to.equal(204); // Cek status, harus 204 (No Content)
    expect(duration).to.be.lessThan(1000); // Cek bahwa durasi permintaan kurang dari 1000ms
  });

  it("POST: should register a user successfully", async () => {
    const startTime = Date.now();

    const response = await fetch("https://reqres.in/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "reqres-free-v1"
      },
      body: JSON.stringify({
        email: "eve.holt@reqres.in",
        password: "pistol"
      })
    });

    const duration = Date.now() - startTime;
    const data = await response.json();

    expect(response.status).to.equal(200); // Cek status, harus 200 (OK)
    // Cek bahwa respons memiliki properti 'id' dan 'token'
    expect(data).to.have.property("id");
    expect(data).to.have.property("token");
    expect(data.token).to.be.a('string'); // Pastikan tipe data token adalah string
    expect(duration).to.be.lessThan(1000); // Cek bahwa durasi permintaan kurang dari 1000ms
  });

  it("POST: should login a user successfully", async () => {
    const startTime = Date.now();

    const response = await fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "reqres-free-v1"
      },
      body: JSON.stringify({
        email: "eve.holt@reqres.in",
        password: "cityslicka"
      })
    });

    const duration = Date.now() - startTime;
    const data = await response.json();

    expect(response.status).to.equal(200); // Cek status, harus 200 (OK)
    expect(data).to.have.property("token"); // Cek bahwa respons memiliki properti 'token'
    expect(data.token).to.not.be.empty; // Pastikan token yang diterima tidak kosong
    expect(duration).to.be.lessThan(1000); // Cek bahwa durasi permintaan kurang dari 1000ms
  });

});

describe("Negative Case Test API Reqres", () => {
  it("GET: should fail to get user with non-existent id 26 (Not Found)", async () => {
    const startTime = Date.now();
    const response = await fetch("https://reqres.in/api/users/26",
      {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "reqres-free-v1"
      },
    });  // Lakukan request GET ke endpoint untuk user ID 2
    const duration = Date.now() - startTime;

    expect(response.status).to.equal(404); // Cek apakah status HTTP adalah 404 (Not Found)
    expect(duration).to.be.lessThan(1000);  // Cek bahwa durasi permintaan kurang dari 1000ms
  });

  
  it("POST: should fail to register without a password (Bad Request)", async () => {
    const startTime = Date.now();
    const response = await fetch("https://reqres.in/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "reqres-free-v1"
      },
      body: JSON.stringify({ email: "sydney@fife" }) // Hanya mengirim email
    });

    const duration = Date.now() - startTime;
    const data = await response.json();
    
    expect(response.status).to.equal(400); // Status harus 400 (Bad Request)
    expect(data).to.have.property("error", "Missing password"); // Respons body harus berisi pesan error yang sesuai
    expect(duration).to.be.lessThan(1000); // Cek bahwa durasi permintaan kurang dari 1000ms
  });

  it("POST: should fail to login without a password (Bad Request)", async () => {
    const startTime = Date.now();

    const response = await fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "reqres-free-v1"
      },
      body: JSON.stringify({ email: "peter@klaven" }) // Hanya mengirim email
    });

    const duration = Date.now() - startTime;
    const data = await response.json();

    expect(response.status).to.equal(400); // Status harus 400 (Bad Request)
    expect(data).to.have.property("error", "Missing password"); // Respons body harus berisi pesan error yang sesuai
    expect(duration).to.be.lessThan(1000); // Cek bahwa durasi permintaan kurang dari 1000ms
  });
});