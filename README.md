# Mozi vizsgaremek
## Csapat tagjai
Szászik Adrián - Asztali alkalmazás

Kardos Xavér Noel - Weboldal

## A projekt célja
Egy olyan weboldal és asztali alkalmazás ahol a felhasználó foglalhat egy általa tetszőleges helyet és vásárolhat jegyet egy filmvetítésre. A weboldal könnyen kezelhető és átlátható legyen a felhasználó számára

Az oldalon a felhasználó tudjon:
+ Fiókot létrehozni, szerkeszteni és törölni
+ A vetítések időpontját megnézheti és kiválaszthatja foglaláshoz
  - helyfoglalás
+ Online fizetést/tranzakciót végrehajtani

> [!NOTE]
> A készítés közben még változhatnak az elképzelések 

## 📊 Adatbázis ER Diagram

```mermaid
erDiagram

  FILMEK {
    int film_id PK
    varchar title
    text description
    int duration_minutes
    year release_year
    varchar genre
    boolean is_active
  }

  TEREM {
    int terem_id PK
    varchar name
    int total_rows
    int seats_per_row
  }

  ULES {
    int ules_id PK
    int terem_id FK
    char row_number
    int seat_number
  }

  USERS {
    int user_id PK
    varchar email
    varchar password_hash
    varchar full_name
    varchar phone_number
    boolean is_admin
  }

  VETITES {
    int vetites_id PK
    int film_id FK
    int terem_id FK
    datetime start_time
    datetime end_time
    decimal base_price
  }

  KONYVELES {
    int konyveles_id PK
    int vetites_id FK
    int user_id FK
    int ules_id FK
    timestamp booking_time
    decimal final_price
    string status
    varchar payment_reference
  }

  FIZETES {
    int fizetes_id PK
    int konyveles_id FK
    decimal amount
    string method
    string status
    varchar transaction_id
    timestamp paid_at
  }

  %% Kapcsolatok
  FILMEK ||--o{ VETITES : "vetitesek"
  TEREM  ||--o{ VETITES : "helyszin"
  TEREM  ||--o{ ULES   : "ulesek"

  USERS  ||--o{ KONYVELES : "foglal"
  VETITES||--o{ KONYVELES : "foglalasok"
  ULES   ||--o{ KONYVELES : "ulesre"

  KONYVELES ||--o{ FIZETES : "fizetes"
