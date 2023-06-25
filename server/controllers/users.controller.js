const UsersDAO = require('../dao/usersDAO');
const uploadFile = require('../upload');

class UserController {
    static async apiGetUsers(req, res, next) {
        try {
          const users = await UsersDAO.getUsers();
          if (!users) {
            res.status(404).json({ error: "Not found" });
            return;
          }
          res.json(users);
        } catch (error) {
          res.status(500).json({ error: error });
        }
      }
      static async apiRegister(req, res, next) {
        try {
          const user = req.body;
          const addUserResult = await UsersDAO.addUser(user);
          if (addUserResult.error) {
            res.status(400).json({ error: addUserResult.error });
            return;
          }
          res.json(addUserResult);
        } catch (error) {
          res.status(500).json({ error: error });
        }
      }
  
      static async apiLogin(req, res, next) {
        try {
          const { email, password } = req.body;
          const { error, token, ...user } = await UsersDAO.loginUser({ email, password });
    
          if (error) {
            res.status(400).json({ error });
            return;
          }
    
          res.json({ token, user });
        } catch (error) {
          res.status(500).json({ error: error });
        }
      }

      static async apiVerifyUser(req, res, next) {
        try {
          const userId = req.userId;
          const user = await UsersDAO.getUserById(userId);
          if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
          }
          delete user.password;
          res.json(user);
        } catch (e) {
          console.error(`Unable to verify user: ${e}`);
          res.status(500).json({ error: e });
        }
      }
      

      static async apiPostResult(req, res, next) {
        try {
          const userId = req.userId;
          const score = req.body.score; 
          const addResultResponse = await UsersDAO.addResult(userId, score);
      
          if (addResultResponse.error) {
            res.status(400).json({ error: addResultResponse.error });
            return;
          }
      
          res.json(addResultResponse);
        } catch (error) {
          res.status(500).json({ error: error });
        }
      }

      static async apiGetTopResults(req, res, next) {
        try {
          const topResults = await UsersDAO.getTopResults();
          if (!topResults) {
            res.status(404).json({ error: "Not found" });
            return;
          }
          res.json(topResults);
        } catch (error) {
          res.status(500).json({ error: error });
        }
      }
      
    
      static async apiGetProfile(req, res, next) {
        try {
          console.log(req.userId);
          const user = await UsersDAO.getUserById(req.userId);
          if (!user) {
            res.status(404).json({ error: "Not found" });
            return;
          }
          const { password, ...userWithoutPassword } = user;
          res.json(userWithoutPassword);
        } catch (error) {
          res.status(500).json({ error: error });
        }
      }

      static async apiUploadFile(req, res) {
        try {
          const userId = req.userId;
          const file = req.file;
      
          if (!file) {
            res.status(400).send({ message: 'Please upload a file!' });
            return;
          }
      
          // Update the user's avatar field with the new file ID
          const updateResult = await UsersDAO.updateUserImage(userId, { avatar: file.filename });
      
          if (updateResult.error) {
            res.status(400).json({ error: updateResult.error });
            return;
          }
      
          res.status(200).send({
            message: 'Uploaded the file successfully: ' + file.originalname,
            id: file.filename,
            name: file.originalname,
            size: file.size,
          });
        } catch (error) {
          console.log(error);
          res.status(500).send({
            message: 'Could not upload the file: ' + req.file.originalname,
          });
        }
      }

      static async apiUpdateProfile(req, res, next) {
        try {
            const userId = req.userId;
            const { email, nickname, oldPassword, newPassword} = req.body;
            const updateResponse = await UsersDAO.updateUser(userId, { email, nickname, oldPassword, newPassword });
    
            if (updateResponse.error) {
                res.status(400).json({ error: updateResponse.error });
            } else {
                res.json(updateResponse);
            }
        } catch (e) {
            console.error(`Unable to update user: ${e}`);
            res.status(500).json({ error: e });
        }
    }
    
    static async apiUpdateCharacter(req, res, next) {
      try {
        const userId = req.userId;
        const character = req.body.character;
        const updateResponse = await UsersDAO.updateCharacter(userId, character);
    
        if (updateResponse.error) {
          res.status(400).json({ error: updateResponse.error });
          return;
        }
    
        res.json("User character successfully updated");
      } catch (e) {
        console.error(`Unable to update user character: ${e}`);
        res.status(500).json({ error: e });
      }
    }
    
      
  
    static async apiDeleteUser(req, res, next) {
      try {
        const id = req.params.id;
        const deletedCount = await UsersDAO.deleteUser(id);
        if (deletedCount === 0) {
          res.status(404).json({ error: "Not found" });
          return;
        }
        res.json({ deletedCount });
      } catch (error) {
        res.status(500).json({ error: error });
      }
    }
  }
  
  module.exports = UserController;