# Mock-up

### [Visual plan](visual_plan.svg)

### [Component plan](component_plan.svg)

# Technologies used

## Front-end
- React.js
- Typescript
- Material UI

## Back-end
- Express.js
- Prisma
- PostgreSQL

# User Stories

## MVP

### 1. As a user, I want to rate Jyväskylä districts based on specific criteria.
**Acceptance Criteria**  
- Form with 4 rating criteria: safety, services, atmosphere, and cost of living (each 1–5 scale)  
- User must have a district selected before submitting  
- All criteria are required to be rated  
- Rating saved to database and associated with the correct user  
- Success and error states handled  

---

### 2. As a user, I want to see the rating criteria, so that I know what aspects I'm evaluating.
**Acceptance Criteria**
- Each criterion labeled on the form  
- A short description for each criterion  

---

### 3. As a user, I want to add a text comment to my rating, so I can explain my views better.
**Acceptance Criteria**  
- Text field inside the rating form (max 200 chars)  
- Optional field  
- Saved and displayed with the user’s rating  
- Validates that the text field doesn't exceed the limit  

---

### 4. As a user, I want to see a list of all Jyväskylä districts, so I can choose which one to rate.
**Acceptance Criteria**  
- List of all districts fetched from server  
- Each district item has buttons to rate and view ratings  

---

### 5. As a user, I want to register and log in, so my ratings are saved on my account.
**Acceptance Criteria**  
- Register/login forms with validation (email format, password length)  
- Password hashed and verified securely  
- JWT auth tokens issued on success  
- Error message shown on invalid credentials  

---

### 6. As a user, I want to view ratings for a specific district, so that I can see what other people think about the area.
**Acceptance Criteria**  
- Clicking on a district shows all ratings and comments for it  
- Average rating per criterion displayed  
- Success and error states handled  

---

### 7. As a user, I want to see a leaderboard of top-rated districts for each criterion, so that I can find the best area for that criterion.
**Acceptance Criteria**  
- Sortable list showing top districts per selected criterion  
- Success and error states handled  

---

### 8. As a user, I want to see an average rating for each district, so that I can compare areas easily.
**Acceptance Criteria**  
- Average rating shown next to each district  
- Total number of ratings displayed  

---

### 9. As a user, I want to see all my submitted ratings, so I can see what I've rated before.
**Acceptance Criteria**  
- Profile page listing the user’s ratings  
- Visual indication if the user has no reviews  

---

### 10. As a logged-in user, I want to update my ratings, so that I can correct or improve my previous rating.
**Acceptance Criteria**  
- Edit review option on profile page  
- Updated review saved to server  
- Validation same as during creation  
- Success and error states handled and shown  

---

### 11. As a logged-in user, I want to delete my ratings, so that I can remove feedback I no longer want visible.
**Acceptance Criteria**  
- Delete review button on profile page  
- Rating removed from server  
- Success and error states handled and shown  

---

### 12. As an admin, I want to delete user ratings, so that I can moderate inappropriate reviews.
**Acceptance Criteria**  
- Admin panel listing all ratings  
- Delete review button for each review  
- JWT must include the admin role  
- Review deleted from server  
- Success and error states handled and shown  

---

### 13. As an admin, I want to edit user rating comments, so that I can correct or moderate reviews.
**Acceptance Criteria**  
- Admin panel allows editing of review comments  
- Saved to server  
- Success and error states handled and shown  

---

## EXTRA

### 1. As a user, I want to see a map of the district I'm rating, so I can better identify its location and surroundings.
**Acceptance Criteria**  
- Map displayed to provide location context  
- Map displays correct district location  
- Map animates smoothly from current to selected district  

---

### 2. As a user, I want to search for a district by name, so that I can quickly find the area I want to rate or view.
**Acceptance Criteria**  
- Search bar for quickly finding a district  
- Search input filters list dynamically  
- Case-insensitive search allowed  

### 3. As a user, I want to register and login with my Google account, to have my account be more secure.  
**Acceptance Criteria**  
- A button to register/login with google account.
