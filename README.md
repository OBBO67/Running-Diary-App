# Running-Diary-App

Personal project to develop a running diary application (hopefully come up with a better name) to track my progress leading up to my first marathon. The main aim of this app is to develop my web development skills.

## Initial Aims

The priority initially will be to set up the backend using node.js, express and mongodb. The backend will have the following capabilities:

- Registration (adding new users to the DB)
- Login (retrieving user profiles from the DB)
- Add training blocks (added to the user in DB)
- Add runs to DB (Workouts, Long runs, recovery runs, etc)
- Add user profile picture (held under user in the DB)
- Search profiles (Search the DB using approximate string matching method)

Registering will create a user in the DB. Once registered the user can create their profile. The profile will then be added to the DB and associated with that user. The user can then add traning blocks and runs to their profile.
