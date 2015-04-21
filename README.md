
##Forum Specs
---

2. User will have to sign up by providing username. Autoincrement ID will be provided
 * So will have to create one table just for username list with auto ID

3. User will be able to create new topic/table for forum/database

4. User will be able to comment on the specific topic, so will have to create table just for comments and to give them specific comment_id number so they can be related to username table auto ID ,

5. User will be able to click on comments "comments" button (located on top of the comments column) and it will arrange comments column from the most to the least comments (Not completed)

6. We'll implement vote button too, so User can vote just by clicking on it. Vote button will be in same table as comments table (because it's global button and doesn't have to keep track of username who clicked on it. When User clicks on Vote button same process as number 4 will happen. (Half completed)

7. When user creates a topic, automatic user location from which they are written will be created


##Problems/Solutions

1. Can't set headers after they are sent.' error

2. Can't POST /topic//new
    * just add mustache in HTML template rout
    * credit goes to Kengil
3. Can't POST/GET /topics/:id/
    * my biggest problem/issue can be anywhere
    * always comment your codes!
    * whenever you make simple change test it right away

    http://45.55.138.6:3000/
