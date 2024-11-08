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
  },
  getUserByEmail: async(email)=>{
    try {
      const result =await pool.query('SELECT * FROM users where email=$1', [email])
      if(result && result.rows.length > 0){
        return result.rows[0]
      }
      else{
        throw new Error("User not found!")
      }
    } catch (error) {
        throw error
    }
  }
}
    
  module.exports = userServices