import { expect } from "chai";
import assert from "assert";

describe("REQRES API Tests", () => {

  it("GET: should get list of users", async () => {
    const response = await fetch("https://reqres.in/api/users?page=2");
    const data = await response.json();

    expect(response.status).to.equal(200);
    assert.strictEqual(data.page, 2);
    expect(data.data).to.be.an("array");
  });

  it("POST: should create a new user", async () => {
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

    const data = await response.json();

    expect(response.status).to.equal(201);
    expect(data).to.have.property("name", "rifqi abdillah");
    expect(data).to.have.property("job", "leader");
    expect(data).to.have.property("id");
  });

  it("PATCH: should update user info", async () => {
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

    const data = await response.json();

    expect(response.status).to.equal(200);
    expect(data).to.have.property("name", "rifqi abdillah");
    expect(data).to.have.property("job", "developer");
  });

  it("DELETE: should delete user", async () => {
    const response = await fetch("https://reqres.in/api/users/2", {
      method: "DELETE",
      headers: {
        "x-api-key": "reqres-free-v1"
      }
    });

    expect(response.status).to.equal(204);
  });

});
