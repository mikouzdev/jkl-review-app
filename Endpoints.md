# API Endpoints

## User

### POST /register
- requires body with {username, email, password}
- sends register form details to allow user to register.

### POST /login
- requires body with {email, password}
- sends email and password so the user can login.
- returns a JWT for the user on success.

### GET /districts
- returns the list of all the districts, with the average rating and the amount of ratings for them, in a JSON-format.

### GET /districts?sort=criterion (overall, safety, atmosphere.. etc)
- returns a sorted list of the districts, the criterion average rating, and the amount of ratings for them. in a JSON-format.
- (sorted based on the average rating of the criterion)

### GET /districts/:id/reviews?limit=amount
- returns a speficic districts reviews, and the averege ratings for each of its criterion, in a JSON-format.
- amount of reviews returned limited by the query parameter.

### POST /districts/:id
- requires body with {ratings: {safety,services, atmosphere, cost_of_living}, comment?}, requires auth.
- submits the users review of a district (id), to the server.
- returns the submitted review on success.

### PUT /reviews/:id
- requires a body with {ratings: {}, comment?}, requires auth.
- requires the user to be the owner of the review. 
- updates a review based on its id.
- returns the updated review on success.

### DELETE /reviews/:id
- requires the user to be the owner of the review, or an admin.
- deletes a review based on its id.
- returns the deleted review on success.

### GET /me/reviews
- requires auth.
- returns the logged in users all submitted reviews.

## Admin

### GET /reviews?limit=amount
- requires auth, requires admin role in JWT.
- returns the list of all reviews in JSON-format, amount limited by the query parameter.

### PATCH /reviews/:id
- requires a body with the comment, requires auth and admin role in JWT.
- updates a reviews comment based on its id.
- returns the updated review on success.

