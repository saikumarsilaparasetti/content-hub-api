const {pool} = require("../config/db")




const userServices = {
  createUser : async (name, email, password) => {
    try {
      // const client = await pool.connect();
      // await client.query('BEGIN');

      const result = await pool.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`, [name, email, password]);
      // await client.query('COMMIT');

      return result.rows[0];
    } catch (error) {
      // console.log("🚀 ~ createUser: ~ error:", error)
      throw error
    }
  }
}
    
  module.exports = userServices