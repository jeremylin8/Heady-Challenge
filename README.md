# How to run the code?

### 1. Add a default.json file in config folder with the following

```
{
  "mongoURI": "<your_mongoDB_Atlas_uri_with_credentials>"
}
```

### 2. Install dependencies

```
npm install
```

### 3. Run Node.js server

```
nodemon server
```

# Notes

- for routes that have private access, only authorized user can access but auth middleware is not implemented in this coding challenge.

- Seems like Free tier Mongo Atlas doesn't support $graphLookup and $lookup doesn't check for nested children, I wrote a customer function instead, performance might not be great.

- Let me know if you have any questions testing routes, I used Postman. If you want me to provide sample data, let me know.
