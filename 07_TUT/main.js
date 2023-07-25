// BCRYPT

  //* Provides password hashing and comparison functionalities using the bcrypt hashing algorithm. 
  //* It's commonly used to securely store passwords in databases, protecting user credentials from being-
  //  easily compromised in the event of a data breach.

  //* bcrypt uses a variant of the Blowfish encryption algorithm with a technique called-
  //  key stretching, which makes it computationally expensive and time-consuming to generate hashes.
  //* This is a desirable feature because it increases the difficulty for attackers attempting-
  //  to crack hashed passwords through brute-force or dictionary attacks.

  //* To hash a password with bcrypt, you typically follow these steps  :
      // 1- Generate a random salt  : A salt is a random value used to add additional entropy to the hashing process.
      //    It ensures that even users with the same passwords will have different hashes.

      // 2- Hash the password with the generated salt and a specified number of rounds  : bcrypt allows you to configure-
      //    the number of "salt rounds" or iterations used during the hashing process. 
      //    More rounds make the computation slower and increase the security.

      // 3- Store the generated hash and salt securely in your database.

  //* When verifying a password, bcrypt automatically extracts the salt from the stored hash and uses it to rehash-
  //  the provided password. If the newly generated hash matches the one stored in the database, the password is-
  //  considered valid.

// NOTE : bcrypt recommeds you to always use async functions.

// Here's a basic example of using bcrypt :
/*
const bcrypt = require('bcrypt');
const userPassw = 'mySecurePassword';

// Generating a salt and hashing the password
bcrypt.hash(userPassw, 10, function(err, hash) {
  if (err) {
    console.error('Error hashing password:', err);
  } else {
    // Store the 'hash' value securely in your database along with the salt
    console.log('Hashed password:', hash);
  }
});

// Verifying a password
const storedHash = '...'; // Retrieve the hashed password from your database
bcrypt.compare(userPassw, storedHash, function(err, isMatch) {
  if (err) {
    console.error('Error comparing passwords:', err);
  } else {
    if (isMatch) {
      console.log('Password is correct!');
    } else {
      console.log('Password is incorrect!');
    }
  }
});
*/
// NOTE :  Callback is optional.

// A Note on Rounds

  // rounds=8 : ~40 hashes/sec
  // rounds=9 : ~20 hashes/sec
  // rounds=10: ~10 hashes/sec
  // rounds=11: ~5  hashes/sec
  // rounds=12: 2-3 hashes/sec
  // rounds=13: ~1 sec/hash
  // rounds=14: ~1.5 sec/hash
  // rounds=15: ~3 sec/hash
  // rounds=25: ~1 hour/hash
  // rounds=31: 2-3 days/hash

// Exercise (Auth & Register over an RestAPI)

const express = require('express');
const app = express();
const register = require('./routes/register');
const auth = require('./routes/auth');

app.use('/register', register)
app.use('/auth', auth)

app.listen(3500, () => console.log('Server is running'));