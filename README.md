# Mozi vizsgaremek
## Csapat tagjai
Szászik Adrián - Asztali alkalmazás

Kardos Xavér Noel - Weboldal

## 📊 Adatbázis ER Diagram

```mermaid
erDiagram

    FILMEK {
        int film_id PK
        string title
        text description
        int duration_minutes
        int release_year
        string genre
        string poster_url
        boolean is_active
    }

    TEREM {
        int terem_id PK
        string name
        int total_rows
        int seats_per_row
        boolean has_3d
        boolean has_dolby_atmos
    }

    ULES {
        int ules_id PK
        int terem_id FK
        string row_number
        int seat_number
    }

    USERS {
        int user_id PK
        string email
        string password_hash
        string full_name
        string phone_number
        date date_of_birth
        datetime created_at
        boolean is_admin
    }

    VETITES {
        int vetites_id PK
        int film_id FK
        int terem_id FK
        datetime start_time
        datetime end_time
        decimal base_price
        boolean is_full
    }

    KONYVELES {
        int konyveles_id PK
        int vetites_id FK
        int user_id FK
        int ules_id FK
        datetime booking_time
        decimal final_price
        string status
        string payment_reference
    }

    FIZETES {
        int fizetes_id PK
        int konyveles_id FK
        decimal amount
        string method
        string status
        string transaction_id
        datetime paid_at
    }

    %% Kapcsolatok
    FILMEK ||--o{ VETITES : "has"
    TEREM ||--o{ VETITES : "hosts"

    TEREM ||--o{ ULES : "contains"

    USERS ||--o{ KONYVELES : "makes"
    VETITES ||--o{ KONYVELES : "has"
    ULES ||--o{ KONYVELES : "assigned"

    KONYVELES ||--o{ FIZETES : "paid_by"


