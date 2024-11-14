# Table Schemas

## public.recipes

| Column | Type | Primary? | Default value |
|-|-|-|-|
| id | uuid | Yes | Random |
| created_at | timestamptz | | Current time |
| title | varchar | | NULL |
| author | uuid | | ID of author, fetch from auth.users table |
| ingredients | varchar[] | | NULL |
| instructions | varchar[] | | NULL |
| tags | varchar[] | | NULL |
| deleted | bool | | FALSE |

## public.reviews

| Column | Type | Primary? | Default value |
|-|-|-|-|
| id | uuid | Yes | Random |
| created_at | timestamptz | | Current time |
| recipe_id | uuid | | ID of recipe, fetch from public.recipes |
| reviewer_id | uuid | | ID of reviewer, fetch from auth.users |