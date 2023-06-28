const bcrypt = require('bcrypt');
const { userSchema, updateProfileSchema } = require('../dto/validate');
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');


let users;

class UsersDAO {
  static async injectDB(conn) {
    if (users) {
      console.log('Database connection already injected');
      return;
    }
    try {
      users = await conn.db(process.env.DB).collection('users');
      console.log('Database connection injected successfully');
    } catch (error) {
      console.error(`Unable to establish collection handles in usersDAO: ${error}`);
    }
  }

  static getUsersCollection() {
    return users;
  }

  static async getUsers() {
    let userData;
    try {
      userData = await users.find().toArray();
    } catch (error) {
      console.error(`Unable to get users: ${error}`);
      return null;
    }
    return userData;
  }

  static async getUserById(id) {
    try {
      return await users.findOne({ _id: new ObjectId(id) });
    } catch (error) {
      console.error(`Unable to get user by id: ${error}`);
      return null;
    }
  }
  

  static async addUser(user) {
    try {
      // Validate the user's information
      try {
        await userSchema.validate(user);
      } catch (error) {
        return { error: error.errors };
      }

      // Check if a user with the same email or nickname already exists
      const existingUser = await users.findOne({
        $or: [{ email: user.email }, { nickname: user.nickname }]
      });

      if (existingUser) {
        return { error: 'User already exists' };
      }

      // Hash the password before storing it in the database
      const hashedPassword = await bcrypt.hash(user.password, 10);

      // Add the user to the database
      const result = await users.insertOne({
        ...user,
        password: hashedPassword,
        results: [],
        avatar: '',
        character: {
          staticSrc: '',
          src: '',
        }
      });

      return {
        email: user.email,
        nickname: user.nickname,
        id: result.insertedId
      };
    } catch (error) {
      console.error(`Unable to add user: ${error}`);
      return { error: error };
    }
  }

static async updateUser(userId, update) {
  try {
    // Validate the user's information
    try {
      await updateProfileSchema.validate(update);
    } catch (error) {
      return { error: error.errors };
    }

    // Check if email or nickname already exists
    if (update.email) {
      const emailExists = await users.findOne({ email: update.email, _id: { $ne: new ObjectId(userId) } });
      if (emailExists) {
        return { error: 'Email already exists' };
      }
    }

    if (update.nickname) {
      const nicknameExists = await users.findOne({ nickname: update.nickname, _id: { $ne: new ObjectId(userId) } });
      if (nicknameExists) {
        return { error: 'Nickname already exists' };
      }
    }

    // Retrieve the user
    const user = await users.findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return { error: 'User not found' };
    }

    // Check if the provided password is correct
    const passwordMatch = await bcrypt.compare(update.oldPassword, user.password);
    if (!passwordMatch) {
      return { error: 'Incorrect password' };
    }

    // If a new password is provided, hash it
    if (update.newPassword) {
      const hashedPassword = await bcrypt.hash(update.newPassword, 10);
      update.password = hashedPassword;
      delete update.newPassword;
      delete update.oldPassword;
    } else {
      delete update.oldPassword;
      delete update.newPassword;
    }

    const result = await users.updateOne(
      { _id: new ObjectId(userId) },
      { $set: update }
    );

    if (result.modifiedCount === 0) {
      return { error: 'Could not update user' };
    }

    // Return the updated user
    const updatedUser = await users.findOne({ _id: new ObjectId(userId) });
    delete updatedUser.password;
    return updatedUser;
  } catch (error) {
    console.error(`Unable to update user: ${error}`);
    return { error: error };
  }
}


static async updateUserImage(userId, update) {
  try {
    const result = await users.updateOne(
      { _id: new ObjectId(userId) },
      { $set: update }
    );

    if (result.modifiedCount === 0) {
      return { error: 'Could not update user' };
    }

    return result;
  } catch (error) {
    console.error(`Unable to update user: ${error}`);
    return { error: error };
  }
}

  static async deleteUser(id) {
    try {
      const result = await users.deleteOne({ _id: ObjectId(id) });
      return result.deletedCount;
    } catch (error) {
      console.error(`Unable to delete user: ${error}`);
      return { error: error };
    }
  }

  static async loginUser({ email, password }) {
    try {
      const user = await users.findOne({ email });

      if (!user) {
        return { error: 'User does not exist' };
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return { error: 'Invalid password' };
      }

      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      return { token, email: user.email, nickname: user.nickname, id: user._id };
    } catch (error) {
      console.error(`Unable to login user: ${error}`);
      return { error: error };
    }
  }

  static async addResult(userId, score) {
    try {
      const user = await users.findOne({ _id: new ObjectId(userId) });
  
      if (!user) {
        return { error: 'User not found' };
      }
  
      // Create a new result object with the score and the current date
      const resultWithDate = {
        score: score,
        date: new Date()
      };
  
      user.results.push(resultWithDate);
      const updateResult = await users.updateOne(
        { _id: new ObjectId(userId) },
        { $set: { results: user.results } }
      );
  
      if (updateResult.modifiedCount === 0) {
        return { error: 'Could not update user' };
      }
  
      return "New result added";
    } catch (error) {
      console.error(`Unable to add result: ${error}`);
      return { error: error };
    }
  }

  static async updateCharacter(userId, character) {
    try {
      const result = await users.updateOne(
        { _id: new ObjectId(userId) },
        { $set: { character: character } }
      );
  
      if (result.modifiedCount === 0) {
        return { error: 'Could not update user character' };
      }
  
      return result;
    } catch (error) {
      console.error(`Unable to update user character: ${error}`);
      return { error: error };
    }
  }
  
  

  static async getTopResults(limit = 5) {
    try {
      const topResults = await users.aggregate([
        { $unwind: "$results" },
        { $sort: { "results.score": -1 } }, // Sort by the score field of the results array
        { $limit: limit },
        { $project: { _id: 0, nickname: "$nickname", result: "$results.score", date: "$results.date" } } // Project the score field and date
      ]).toArray();
  
      return topResults;
    } catch (error) {
      console.error(`Unable to get top results: ${error}`);
      return null;
    }
  }
  
  

}

module.exports = UsersDAO;
