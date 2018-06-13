"use strict";
var db = require("../../models");
var should = require("should");
var app = require("../../bin/www").server;
var request = require("supertest").agent(app);

jest.mock("../../lib/wx");
const Wx = require("../../lib/wx");

var sleep = function (time) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve("ok");
    }, time);
  });
}

afterAll(() => {
  console.log('finish');
  app.close() // 当所有测试都跑完了之后，关闭server
  // process.exit();
})

beforeEach(() => {
  // console.log('begin');
})

describe('test index', () => {
  it("should return the string 'test'", async () => {
    const response = await request
      .get('/api')
      .expect(200)
    should.exist(response.body);
    response.body.env.should.equal('test');
  })
});

describe('test getUserInfo', () => {
  it("should return development", async () => {

    Wx.getUserInfo.mockImplementation(params => {
      return {
        department: [{
          foo: 'bar'
        }]
      };
    });

    Wx.getDepartmentById.mockImplementation(params => {
      return {
        department: [{
          name: 'development'
        }]
      };
    });

    jest.spyOn(Date, 'now').mockImplementation(() => 1528739176000)
    const response = await request
      .get('/api/get-user-info')
      .expect(200)

    should.exist(response.body);

    response.body.department.should.equal('development');
  })
});

describe('test auth', () => {

  it("should return a hash", async () => {

    Wx.getUserInfo.mockImplementation(() => {
      return 'mock token'
    });

    Wx.getDepartmentById.mockImplementation(params => {
      return 'mock ticket'
    });
    const response = await request
      .post('/api/auth')
      .expect(200)

    should.exist(response.body);
    response.body.signature.should.equal('bdd93d6cfc90ec73793ea87b6413227f668ef705');
  });
});