# DB Monitor Backend

Simple Node.js + Express + MongoDB backend that stores database connection configs (MySQL or MongoDB)
and lets you check if each DB is UP or DOWN.

## Quickstart

1) Extract and open this folder:
   ```bash
   cd db-monitor-backend
   ```

2) Install dependencies:
   ```bash
   npm install
   ```

3) Start the server (default port 4000):
   ```bash
   npm run start
   ```

4) Endpoints:
   - POST http://localhost:4000/api/databases/add
     Body example (MySQL):
     ```json
     {
       "type": "mysql",
       "host": "127.0.0.1",
       "port": 3306,
       "username": "root",
       "password": "root",
       "dbName": "testdb"
     }
     ```
     Body example (Mongo):
     ```json
     {
       "type": "mongo",
       "host": "127.0.0.1",
       "port": 27017,
       "username": "",
       "password": "",
       "dbName": "admin"
     }
     ```

   - GET http://localhost:4000/api/databases/
     (List all saved DBs)

   - GET http://localhost:4000/api/databases/check/<id>
     (Check UP/DOWN status of a specific DB)

## Notes
- The app uses MongoDB at mongodb://127.0.0.1:27017/dbmonitor by default.
  Override with env var MONGO_URI.
- For production, consider encrypting DB passwords-at-rest and using a secret manager.
