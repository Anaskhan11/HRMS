const db = require("../config/DBConnection.js");
const {
  generateEmployeeTokens,
  generateAdminTokens,
  generateManagerTokens,
} = require("../../middleware/middleware.js");

const createUserService = (name, email, hashPassword, role) => {
  return new Promise((resolve, reject) => {
    db.beginTransaction((err) => {
      if (err) {
        reject(err);
        return;
      }

      const insertUserQuery =
        "INSERT INTO user_profiles (name, email, password, role) VALUES (?,?,?,?)";
      const userValues = [name, email, hashPassword, role];

      db.query(insertUserQuery, userValues, (err, userResult) => {
        if (err) {
          db.rollback(() => {
            reject(err);
          });

          return userResult;
        }

        const userId = userResult.insertId;

        let accessToken;

        switch (role) {
          case "employee":
            ({ accessToken } = generateEmployeeTokens({
              user_id: userId,
              email,
              role,
            }));
            break;
          case "manager":
            ({ accessToken } = generateManagerTokens({
              user_id: userId,
              email,
              role,
            }));
            break;
          case "admin":
            ({ accessToken } = generateAdminTokens({
              user_id: userId,
              email,
              role,
            }));
            break;
          default:
            break;
        }

        const insertTokenQuery =
          "INSERT INTO auth_token (user_id, token) VALUES (?, ?)";
        const tokenValues = [userId, accessToken];

        db.query(insertTokenQuery, tokenValues, (err, accessToken) => {
          if (err) {
            db.rollback(() => {
              reject(err);
            });
            return accessToken;
          }

          const userSetting =
            "INSERT INTO user_settings (user_id, theme, language) VALUES (?,?,?)";
          const settingValues = [userId, "light", "en"];
          db.query(userSetting, settingValues, (err, setting) => {
            if (err) {
              db.rollback(() => {
                reject(err);
              });
              return setting;
            }
          });

          db.commit((err) => {
            if (err) {
              db.rollback(() => {
                reject(err);
              });
            } else {
              const selectUserQuery =
                "SELECT user_id, name, email, role FROM user_profiles WHERE user_id = ?";
              db.query(selectUserQuery, [userId], (err, rows) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(rows[0]);
                }
              });
            }
          });
        });
      });
    });
  });
};

// update user token
const updateUserToken = (userId, token) => {
  return new Promise((resolve, reject) => {
    const updateTokenQuery =
      "UPDATE auth_token SET token = ? WHERE user_id = ?";
    db.query(updateTokenQuery, [token, userId], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const loginUser = (email) => {
  return new Promise((resolve, reject) => {
    const selectUserQuery = `
        SELECT user_profiles.user_id, user_profiles.name, user_profiles.email, user_profiles.password, user_profiles.role, user_profiles.image,auth_token.token, employee_details.employee_id
        FROM user_profiles
        LEFT JOIN auth_token ON user_profiles.user_id = auth_token.user_id
        LEFT JOIN hrms_employeeservices.employee_details ON user_profiles.user_id = employee_details.user_id
        WHERE user_profiles.email = ?`;
    db.query(selectUserQuery, [email], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows[0]);
      }
    });
  });
};

const updateUser = (userId, name, email, imagePath) => {
  console.log("model details:", userId, name, email, imagePath);
  return new Promise((resolve, reject) => {
    const updateUserQuery =
      "UPDATE user_profiles SET name = ?, email = ?, image=? WHERE user_id = ?";
    db.query(updateUserQuery, [name, email, imagePath, userId], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// get user image only
const getUserImage = (userId) => {
  return new Promise((resolve, reject) => {
    const selectUserQuery = "SELECT image FROM user_profiles WHERE user_id = ?";
    db.query(selectUserQuery, [userId], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows[0]);
      }
    });
  });
};

module.exports = {
  createUserService,
  loginUser,
  updateUserToken,
  updateUser,
  getUserImage,
};
