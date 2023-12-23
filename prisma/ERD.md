```mermaid
erDiagram

  "Post" {
    Int id "🗝️"
    String name 
    DateTime createdAt 
    DateTime updatedAt 
    String createdById 
    }
  

  "Account" {
    String id "🗝️"
    String userId 
    String type 
    String provider 
    String providerAccountId 
    String refresh_token "❓"
    String access_token "❓"
    Int expires_at "❓"
    String token_type "❓"
    String scope "❓"
    String id_token "❓"
    String session_state "❓"
    }
  

  "Session" {
    String id "🗝️"
    String sessionToken 
    String userId 
    DateTime expires 
    }
  

  "User" {
    String id "🗝️"
    String name "❓"
    String email "❓"
    DateTime emailVerified "❓"
    String image "❓"
    }
  

  "VerificationToken" {
    String identifier 
    String token 
    DateTime expires 
    }
  

  "OkrTerm" {
    Int id "🗝️"
    String name 
    String eomji "❓"
    String createdById 
    DateTime startDate 
    DateTime endDate 
    }
  

  "Objective" {
    Int id "🗝️"
    String name 
    String description 
    String createdById 
    Int okrTermId 
    }
  

  "KeyResult" {
    Int id "🗝️"
    String name 
    Int okrTermId 
    Int objectiveId 
    String createdById 
    Int targetValue 
    String unit 
    Int currentValue 
    }
  

  "Task" {
    Int id "🗝️"
    String name 
    Int keyResultId 
    Boolean isDone 
    DateTime startDate 
    DateTime endDate "❓"
    DateTime dueDate "❓"
    }
  
    "Post" o|--|| "User" : "createdBy"
    "Account" o|--|| "User" : "user"
    "Session" o|--|| "User" : "user"
    "User" o{--}o "Account" : "accounts"
    "User" o{--}o "Session" : "sessions"
    "User" o{--}o "Post" : "posts"
    "User" o{--}o "OkrTerm" : "createdOkrTerms"
    "User" o{--}o "Objective" : "createdObjectives"
    "User" o{--}o "KeyResult" : "createdKeyResults"
    "OkrTerm" o|--|| "User" : "createdBy"
    "OkrTerm" o{--}o "Objective" : "objectives"
    "OkrTerm" o{--}o "KeyResult" : "keyResults"
    "Objective" o|--|| "User" : "createdBy"
    "Objective" o|--|| "OkrTerm" : "okrTerm"
    "Objective" o{--}o "KeyResult" : "keyResults"
    "KeyResult" o|--|| "OkrTerm" : "okrTerm"
    "KeyResult" o|--|| "Objective" : "objective"
    "KeyResult" o|--|| "User" : "createdBy"
    "KeyResult" o{--}o "Task" : "tasks"
    "Task" o|--|| "KeyResult" : "keyResult"
```
