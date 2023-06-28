const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiJWT = require('chai-jwt');
const run = require('../index');
const UsersDAO = require('../dao/usersDAO');
const { ObjectId, MongoClient, GridFSBucket } = require('mongodb');
const fs = require('fs');
const path = require('path');


let app;
let insertedId;
let testUser;
let token;
let testImageFilename;

before(async function() {
    this.timeout(10000); // Test run time 10s max
    app = await run();
});

const expect = chai.expect;

chai.use(chaiHttp);
chai.use(chaiJWT);

// Test get top results

describe('GET /users/top-results-global', () => {
    it('should get top results', (done) => {
      chai.request(app)
        .get('/users/top-results-global')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.lengthOf.below(6);
          res.body.forEach(result => {
            expect(result).to.be.an('object');
            expect(result).to.have.property('nickname');
            expect(result).to.have.property('result');
            expect(result).to.have.property('date');
          });
          done();
        });
    });
  });
  
// Test registeration

describe('POST /users/register', () => {
  it('should register a new user', (done) => {
    const user = {
      email: 'test@example.com',
      nickname: 'testuser',
      password: 'testpassword'
    };

    chai.request(app)
      .post('/users/register')
      .send(user)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('email', user.email);
        expect(res.body).to.have.property('nickname', user.nickname);
        expect(res.body).to.have.property('id');
        insertedId = res.body.id;
        testUser = {
          email: user.email,
          password: user.password
        };
        done();
      });
  });

  it('should return an error if the user data is invalid', (done) => {

    chai.request(app)
      .post('/users/register')
      .send(testUser)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        done();
      });
  });
  });

  // Test login

  describe('POST /users/login', () => {
    it('should log in a registered user', (done) => {
      chai.request(app)
        .post('/users/login')
        .send(testUser)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('token');
          expect(res.body.token).to.be.a.jwt;
          expect(res.body.token).to.be.signedWith(process.env.JWT_SECRET);
          expect(res.body).to.have.property('user');
          expect(res.body.user).to.have.property('email', testUser.email);
          token = res.body.token;
          done();
        });
    });
  
    it('should return an error if the user data is invalid', (done) => {
      const user = {
        email: 'invalid email',
        password: 'short'
      };
  
      chai.request(app)
        .post('/users/login')
        .send(user)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          done();
        });
    });
  });

  // Test verify user

describe('GET /users/verify', () => {
  it('should return the user profile for a valid token', (done) => {
    chai.request(app)
      .get('/users/verify')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('email');
        expect(res.body).to.have.property('nickname');
        expect(res.body).to.have.property('results').that.is.an('array');
        expect(res.body).to.have.property('avatar');
        done();
      });
  });

  it('should return an error for an invalid token', (done) => {
    chai.request(app)
      .get('/users/verify')
      .set('Authorization', 'Bearer invalidtoken')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        done();
      });
  });

  it('should return an error if no token is provided', (done) => {
    chai.request(app)
      .get('/users/verify')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        done();
      });
  });
});


  // Test post new result

  describe('POST /users/result', () => {
    it('should post a result for a logged in user', (done) => {
      const result = { score: 100 };
  
      chai.request(app)
        .post('/users/result')
        .set('Authorization', `Bearer ${token}`)
        .send(result)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          console.log(res.body);
          expect(res.body).to.be.a('string');
          expect(res.body).to.be.equal('New result added');
          done();
        });
    });
  
    it('should return an error if no token is provided', (done) => {
      const result = { score: 100 };
  
      chai.request(app)
        .post('/users/result')
        .send(result)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          done();
        });
    });
  });

//Test get user profile

  describe('GET /users/profile', () => {
    it('should return the user profile', (done) => {
      chai.request(app)
        .get('/users/profile')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('email', testUser.email);
          expect(res.body).to.have.property('nickname');
          expect(res.body).to.have.property('results').that.is.an('array');
          expect(res.body).to.have.property('avatar');
          done();
        });
    });
  
    it('should return an error if the token is not provided', (done) => {
      chai.request(app)
        .get('/users/profile')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          done();
        });
    });
  });


// Test upload image

describe('POST /users/upload', () => {
  it('should upload an image for a logged in user', (done) => {
    chai.request(app)
      .post('/users/upload')
      .set('Authorization', `Bearer ${token}`)
      .attach('file', fs.readFileSync(path.join(__dirname, './test_image.jpg')), 'test_image.jpg')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('name');
        testImageFilename = res.body.id;
        done();
      });
  });

  it('should return an error if no token is provided', (done) => {
    chai.request(app)
      .post('/users/upload')
      .attach('file', fs.readFileSync(path.join(__dirname, './test_image.jpg')), 'test_image.jpg')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        done();
      });
  });
});

// Test get uploaded image

describe('GET /images/:filename', () => {
  it('should get the uploaded image', (done) => {
    chai.request(app)
      .get(`/images/${testImageFilename}`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should return an error if the image does not exist', (done) => {
    chai.request(app)
      .get('/images/nonexistent.jpg')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        done();
      });
  });
});

// Test update profile

describe('PUT /users/profile', () => {
  it('should update the user profile', (done) => {
    const update = {
      email: 'updated@example.com',
      nickname: 'updateduser',
      oldPassword: 'testpassword',
      newPassword: 'newpassword'
    };

    chai.request(app)
      .put('/users/profile')
      .set('Authorization', `Bearer ${token}`)
      .send(update)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('email', update.email);
        expect(res.body).to.have.property('nickname', update.nickname);
        done();
      });
  });

  it('should return an error if the user data is invalid', (done) => {
    const update = {
      email: 'invalid email',
      nickname: 'u',
      oldPassword: 'testpassword',
      newPassword: 'newpassword'
    };

    chai.request(app)
      .put('/users/profile')
      .set('Authorization', `Bearer ${token}`)
      .send(update)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        done();
      });
  });

  it('should return an error if no token is provided', (done) => {
    const update = {
      email: 'updated@example.com',
      nickname: 'updateduser',
      oldPassword: 'testpassword',
      newPassword: 'newpassword'
    };

    chai.request(app)
      .put('/users/profile')
      .send(update)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        done();
      });
  });

  it('should return an error if the old password is incorrect', (done) => {
    const update = {
      email: 'updated@example.com',
      nickname: 'updateduser',
      oldPassword: 'wrongpassword',
      newPassword: 'newpassword'
    };

    chai.request(app)
      .put('/users/profile')
      .set('Authorization', `Bearer ${token}`)
      .send(update)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        done();
      });
  });

  it('should update the user profile without changing the password', (done) => {
    const update = {
      email: 'updated2@example.com',
      nickname: 'updateduser2',
      oldPassword: 'newpassword'
    };

    chai.request(app)
      .put('/users/profile')
      .set('Authorization', `Bearer ${token}`)
      .send(update)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('email', update.email);
        expect(res.body).to.have.property('nickname', update.nickname);
        done();
      });
  });
});



// Test update character

describe('PUT /users/update-character', () => {
  it('should update the character for a logged in user', (done) => {
    const character = {
      staticSrc: 'path/to/static/image',
      src: 'path/to/animated/image'
    };

    chai.request(app)
      .put('/users/update-character')
      .set('Authorization', `Bearer ${token}`)
      .send({ character })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('string');
        expect(res.body).to.be.equal('User character successfully updated');
        done();
      });
  });

  it('should return an error if no token is provided', (done) => {
    const character = {
      staticSrc: 'path/to/static/image',
      src: 'path/to/animated/image'
    };

    chai.request(app)
      .put('/users/update-character')
      .send({ character })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        done();
      });
  });
});




// Clear database

after(async function() {
  this.timeout(10000); // 10 seconds for clearing database
  if (insertedId) {
    //delete testUser
    const users = UsersDAO.getUsersCollection();
    await users.deleteOne({ _id: new ObjectId(insertedId) });


    //delete testImage
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    const bucket = new GridFSBucket(client.db());
    const file = await bucket.find({ filename: testImageFilename }).next();
    if (file) {
      await bucket.delete(file._id);
    }
    await client.close();
  }
});

