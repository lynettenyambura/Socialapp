const sql = require('mssql');

const config = {
  user: 'sa',
  password: '1234',
  server: 'localhost',
  database: 'social',
};

const UserSchema = {
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  profilePicture: {
    type: String,
    default: "",
  },
  coverPicture: {
    type: String,
    default: "",
  },
  followers: {
    type: Array,
    default: [],
  },
  followings: {
    type: Array,
    default: [],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  desc: {
    type: String,
    max: 50,
  },
  city: {
    type: String,
    max: 50,
  },
  from: {
    type: String,
    max: 50,
  },
  relationship: {
    type: Number,
    enum: [1, 2, 3],
  },
};
{  timestamp : true}
async function createUserTable() {
  try {
    const pool = await sql.connect(config);

    const UserTable = new sql.Table('User');
    UserTable.create = true; // Create the table if it doesn't exist

    Object.entries(UserSchema).forEach(([columnName, columnDefinition]) => {
      UserTable.columns.add(columnName, getColumnDataType(columnDefinition));
    });

    await pool.request().bulk(UserTable);
    console.log('User table created successfully!');
  } catch (error) {
    console.error('Error creating user table:', error);
  } finally {
    sql.close();
  }
}

function getColumnDataType(definition) {
  switch (definition.type) {
    case String:
      return sql.NVarChar(definition.max || sql.MAX);
    case Array:
      return sql.NVarChar(sql.MAX);
    case Boolean:
      return sql.Bit;
    default:
      throw new Error('Invalid column type');
  }
}

//createUserTable();
module.exports = UserSchema;