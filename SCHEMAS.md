# Table Schemas

## public.recipes

| Column | Type | Primary? | Default value | Expected value | Nullable? |
|-|-|-|-|-|-|
| id | uuid | Yes | Random | | No |
| created_at | timestamptz | | Current time | Current time | No |
| title | varchar | | | The recipe's title | No |
| author | uuid | | | ID of author, fetch from auth.users table | No |
| ingredients | varchar[] | | | The ingredients of the recipe | No |
| instructions | varchar[] | | | The instructions of the recipe, in order | No |
| tags | varchar[] | | | The recipe's tags | No |
| deleted | bool | | FALSE | Whether the post is "deleted" and should be hidden | No |

## public.reviews

| Column | Type | Primary? | Default value | Expected value | Nullable? |
|-|-|-|-|-|-|
| id | uuid | Yes | Random | | No |
| created_at | timestamptz | | Current time | Current time | No |
| recipe_id | uuid | | | ID of recipe, fetch from public.recipes | No |
| reviewer_id | uuid | | | ID of reviewer, fetch from auth.users | No |
| content | varchar | | NULL | The review message | Yes |
| rating | int2 | | | The numerical rating of the recipe | No |