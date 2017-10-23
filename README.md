# Project Name

Timder App - Analysis

## Roadmap

View the project roadmap [here](https://drive.google.com/open?id=1kAPJHYxOglYTeN3WJslR1_gGNFUneNer6oveAjPyoFA)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

# Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)

## Usage

### API Usage

#### Database Schema

![Imgur](https://i.imgur.com/YDvpGiv.png "Database Schema")

#### Input

```javascript
Event Service: {
  event_id: INT,
  event_created_at: DATE,
  start_date: DATE,
  end_date: DATE
  user_id: INT,
  swipe(L/R): INT,
  matches: INT
}
User Service: {
  user_id: INT,
  gender: STRING,
  location: STRING,
  photo_count: INT
}
```

##### Example Weight Request Parameters

#### Output
```javascript
Match Weights: {
  user_id: INT
  photo_count_weight: {
    0: INT,
    1: INT,
    2: INT,
    3: INT
  }
}
```

##### Additional Information:
The calculated weights table is generated by joining Event Service, Swipes, and User Info tables. The photo_count_weight number will be calculated by measuring a specific user with X amount of photos to user matches for a given time range. Each photo count will have a weight attributed to it and based on how much weight is given, the Match service will prioritize and sort user cards accordingly.





## Requirements

-Node 6.9.x
-Postgresql 9.6.x
-express
-pg
-chai
-mocha
