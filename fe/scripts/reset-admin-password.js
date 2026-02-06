/**
 * Script để reset password cho admin
 * Chạy: node scripts/reset-admin-password.js
 */

const bcrypt = require('bcryptjs');
const sql = require('mssql');

// Database config
const config = {
  user: 'sa',
  password: '12345',
  server: 'localhost',
  database: 'IdentityDB',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

async function resetAdminPassword() {
  try {
    console.log('🔄 Connecting to database...');
    await sql.connect(config);
    console.log('✅ Connected to database');

    // Password mới
    const newPassword = 'Password123!';
    const email = 'admin@company.com';

    // Hash password
    console.log('🔐 Hashing password...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    console.log('✅ Password hashed:', hashedPassword);

    // Update database
    console.log('💾 Updating database...');
    const result = await sql.query`
      UPDATE users 
      SET password_hash = ${hashedPassword}
      WHERE LOWER(email) = ${email.toLowerCase()}
    `;

    console.log('✅ Updated rows:', result.rowsAffected[0]);

    // Verify
    console.log('🔍 Verifying...');
    const user = await sql.query`
      SELECT email, password_hash FROM users 
      WHERE LOWER(email) = ${email.toLowerCase()}
    `;

    if (user.recordset.length > 0) {
      const isValid = await bcrypt.compare(newPassword, user.recordset[0].password_hash);
      console.log('✅ Password verification:', isValid ? 'SUCCESS' : 'FAILED');
      
      if (isValid) {
        console.log('\n🎉 Password đã được reset thành công!');
        console.log('📧 Email:', email);
        console.log('🔑 Password:', newPassword);
      }
    }

    await sql.close();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

resetAdminPassword();
